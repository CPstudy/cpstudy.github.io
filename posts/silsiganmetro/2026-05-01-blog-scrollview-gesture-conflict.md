---
title: "SwiftUI 스크롤뷰 안에서 LongPress + 스크롤 충돌 해결하기"
date: "2026-05-01"
description: "길게 눌러 타일 위치를 변경하게 했더니 스크롤뷰가 작동하지 않는다."
tags: ["실시간지하철", "iOS", "SwiftUI"]
category: "실시간지하철"
---

> 🤖 AI로 작성된 글 입니다.

# SwiftUI 스크롤뷰 안에서 LongPress + 스크롤 충돌 해결하기

iOS 홈 화면처럼 "타일을 길게 눌러 드래그할 수 있고, 그렇지 않을 때는 스크롤이 되는" UI를 SwiftUI로 만들다 보면 반드시 부딪히는 문제가 있다. **편집 모드에서 ScrollView가 스크롤되지 않는다.** 이번 글에서는 그 원인과 SwiftUI의 한계, 그리고 UIKit interop으로 해결하는 방법까지 정리한다.

## 1. 문제 상황

만들고 있던 화면은 다음과 같다.

- 4 × N 격자에 타일이 배치되는 홈 화면
- 격자가 화면보다 커서 **수직 스크롤**이 필요
- 편집 모드에서는 타일을 **길게 눌러 드래그**해 위치를 옮길 수 있어야 함
- 편집 모드 진입은 우측 상단 연필 버튼

처음 구현은 SwiftUI의 표준 패턴인 `LongPressGesture.sequenced(before: DragGesture)`로 했다.

```swift
private var moveGesture: some Gesture {
    LongPressGesture(minimumDuration: 0.15)
        .sequenced(before: DragGesture(minimumDistance: 0, coordinateSpace: .global))
        .onChanged { value in
            switch value {
            case .second(true, let drag?):
                isDragging = true
                dragOffset = drag.translation
                // ... 그리드 위치 계산
            default: break
            }
        }
        .onEnded { value in
            // ... 최종 위치 커밋
        }
}

// 타일에 부착
.gesture(moveGesture, isEnabled: isEditMode)
```

비편집 모드에서는 `gesture`가 `isEnabled: false`이므로 타일을 터치해도 스크롤이 잘 동작한다. 그런데 **편집 모드로 전환하는 순간 ScrollView가 스크롤되지 않는다.** 타일 사이의 빈 공간에서는 스크롤이 되지만, 타일 위에서 손가락을 위/아래로 끌면 ScrollView가 응답하지 않는다.

## 2. 왜 스크롤이 막히는가

UIKit의 `UIScrollView`에는 `delaysContentTouches`라는 속성이 있다. 기본값은 `true`로, 사용자가 콘텐츠 위를 터치하면 **약 150ms 동안 그 터치를 콘텐츠 뷰로 전달하지 않고 보류**한다. 그동안 사용자가 손가락을 충분히 움직이면 "이건 스크롤이다"라고 판단해 pan 제스처를 활성화하고, 움직임이 없으면 그제야 콘텐츠 뷰로 터치를 넘긴다.

UIKit의 `UIButton`이나 `UILongPressGestureRecognizer` 같은 표준 컴포넌트는 이 메커니즘과 자연스럽게 협응한다. 그래서 `UITableView` 셀에 버튼이 있어도 스크롤이 잘 된다.

**SwiftUI의 `.gesture()` modifier는 이 메커니즘 바깥에 있다.** SwiftUI의 제스처는 SwiftUI 자체 제스처 시스템에서 추적되는데, 이 시스템은 자식 뷰에 붙은 `LongPressGesture`를 ScrollView의 pan보다 우선시해 **터치를 즉시 점유**해 버린다. 0.15초 동안 LP가 터치를 들고 있는 사이 ScrollView는 pan을 시작할 기회를 얻지 못한다.

손가락을 빠르게 움직이면 LP의 `maximumDistance`(기본 10pt)를 초과해 LP가 `failed`로 빠지고 그제서야 ScrollView가 pan을 시작할 수 있을 텐데, 실측해보면 그 핸드오프가 깔끔하게 일어나지 않는다. 결과적으로 **타일 위에서는 사실상 스크롤이 되지 않는다.**

## 3. 시도해본 접근들 (그리고 왜 실패하는가)

### 시도 1 — `.simultaneousGesture`로 바꾸기

가장 먼저 떠오르는 변경이다.

```swift
.simultaneousGesture(moveGesture, isEnabled: isEditMode)
```

`.gesture()`는 normal priority를 사용하지만 `.simultaneousGesture()`는 부모/자식 제스처와 **동시에** 인식되도록 허용한다. 이론상 LP가 추적되는 동안에도 ScrollView의 pan이 같이 추적되어야 한다.

실제로는 잘 동작하지 않는다. 게다가 LP가 `began`까지 가서 드래그가 시작된 뒤에는, drag와 ScrollView pan이 **둘 다** 발화하면서 타일이 이동하는 동시에 뷰도 같이 스크롤되는 부작용이 생긴다.

### 시도 2 — 드래그 중에만 `.scrollDisabled` 적용

drag/resize가 시작될 때 부모로 콜백을 올려보내고, 부모는 그 상태에 맞춰 스크롤을 끈다.

```swift
@State private var activeDragTileId: String?

ScrollView { ... }
    .scrollDisabled(activeDragTileId != nil)

// 타일에서 드래그 시작/종료 시
onDragStateChange: { dragging in
    activeDragTileId = dragging ? item.id : nil
}
```

이건 "드래그 중에 scroll이 따라 움직이는 부작용"은 막아주지만, **LP 인식 대기 중(0~0.15s)에 스크롤이 막히는 본질적 문제는 그대로**다. 이미 스크롤이 가능한 상태가 아닌데 disable을 추가한들 의미가 없다.

### 시도 3 — `LongPressGesture`의 `maximumDistance`를 줄이기

```swift
LongPressGesture(minimumDuration: 0.15, maximumDistance: 5)
```

LP가 더 작은 움직임에서 실패하도록 만들면 핸드오프가 더 잘 될 것 같지만, 본질은 여전히 "SwiftUI 제스처가 터치를 점유한다"는 것이다. 핸드오프 타이밍은 여전히 어색하다.

### 시도 4 — `onLongPressGesture`로 상태를 만든 뒤 `DragGesture`를 따로 두기

```swift
@State private var isReadyToDrag = false

.onLongPressGesture(minimumDuration: 0.15) {
    isReadyToDrag = true
}
.simultaneousGesture(
    DragGesture(minimumDistance: 0)
        .onChanged { ... },
    isEnabled: isReadyToDrag
)
```

`DragGesture`는 view 생성 시점에 설정이 박히므로 상태로 토글해도 같은 터치 시퀀스를 매끄럽게 이어받지 못한다. 사용자가 손가락을 떼고 다시 눌러야 드래그가 시작되는 어색한 UX가 된다. 게다가 `onLongPressGesture` 자체도 내부적으로 `LongPressGesture`를 쓰기 때문에 같은 문제를 가진다.

## 4. 결론: SwiftUI 제스처의 한계

여기까지 오면 분명해진다.

> **SwiftUI의 커스텀 제스처에는 `delaysContentTouches` 같은 자연스러운 ScrollView 협응이 없다.**

SwiftUI ScrollView는 자기 내부 처리에는 이 동작을 그대로 쓰고 있지만(그래서 `Button`이나 `List` row는 잘 동작), 사용자가 `.gesture()`로 직접 붙이는 커스텀 제스처는 그 협응 바깥에 있다.

해결책은 두 가지다.

1. SwiftUI 안에서 어떻게든 우회한다 (위 시도들의 변주)
2. **UIKit의 `UIGestureRecognizer`를 `UIViewRepresentable`로 가져온다**

UIKit의 `UILongPressGestureRecognizer`는 같은 `UIScrollView` 계층 안의 자식에 붙으면 자동으로 ScrollView의 pan과 협응한다. iOS 홈 화면이 쓰는 정확히 그 메커니즘이다.

## 5. 해결: UIKit 제스처 인식기를 UIViewRepresentable로 감싸기

### 5-1. 핵심 아이디어

- 각 타일의 시각 콘텐츠는 `.allowsHitTesting(false)`로 두어 터치를 받지 않게 한다
- 그 위에 같은 크기의 투명 `UIView`를 덮고, 거기에 `UITapGestureRecognizer`와 `UILongPressGestureRecognizer`를 붙인다
- 편집 버튼(삭제/리사이즈)은 그 투명 뷰보다 더 위에 두어 자기 영역의 터치를 자기가 받는다

```
ZStack {
    [시각 콘텐츠] .allowsHitTesting(false)
    [TileTouchHandler — 투명 UIView, UIKit 제스처]
    [삭제 버튼 / 리사이즈 핸들]   // 편집 모드에서만
}
```

이렇게 두면 타일 안의 터치는 모두 `TileTouchHandler`가 받고, 거기 붙은 UIKit 제스처 인식기가 부모 `UIScrollView`의 pan과 자연스럽게 협응한다.

### 5-2. `TileTouchHandler` 구현

```swift
private struct TileTouchHandler: UIViewRepresentable {
    let isEditMode: Bool
    let onTap: () -> Void
    let onLongPressChanged: (UIGestureRecognizer.State, CGPoint) -> Void

    func makeUIView(context: Context) -> UIView {
        let view = UIView()
        view.backgroundColor = .clear
        view.isUserInteractionEnabled = true

        let tap = UITapGestureRecognizer(
            target: context.coordinator,
            action: #selector(Coordinator.handleTap(_:))
        )
        view.addGestureRecognizer(tap)

        let longPress = UILongPressGestureRecognizer(
            target: context.coordinator,
            action: #selector(Coordinator.handleLongPress(_:))
        )
        longPress.minimumPressDuration = 0.2
        longPress.allowableMovement = 10
        view.addGestureRecognizer(longPress)

        context.coordinator.tap = tap
        context.coordinator.longPress = longPress
        return view
    }

    func updateUIView(_ uiView: UIView, context: Context) {
        context.coordinator.parent = self
        context.coordinator.tap?.isEnabled = !isEditMode
        context.coordinator.longPress?.isEnabled = isEditMode
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }

    final class Coordinator: NSObject {
        var parent: TileTouchHandler
        weak var tap: UITapGestureRecognizer?
        weak var longPress: UILongPressGestureRecognizer?

        init(parent: TileTouchHandler) { self.parent = parent }

        @objc func handleTap(_ gesture: UITapGestureRecognizer) {
            parent.onTap()
        }

        @objc func handleLongPress(_ gesture: UILongPressGestureRecognizer) {
            let location = gesture.location(in: nil) // window 좌표
            parent.onLongPressChanged(gesture.state, location)
        }
    }
}
```

핵심 포인트:

- **`location(in: nil)`**: window 기준 좌표를 사용한다. 드래그 중에 타일 자체가 움직이기 때문에 view-local 좌표는 출발점이 흔들려 버린다.
- **`isEnabled` 토글**: 편집 모드 토글에 따라 `tap`과 `longPress`를 서로 배타적으로 켜고 끈다. SwiftUI 측에서 두 모드를 분기할 필요가 없다.
- **`shouldRecognizeSimultaneouslyWith` delegate를 굳이 구현하지 않는다**: 기본 동작이 정확히 우리가 원하는 것이다 — pan이 먼저 인식되면 LP는 `failed`로 빠져 자연스럽게 스크롤이 된다.

### 5-3. 타일에서 사용

```swift
var body: some View {
    ZStack(alignment: .topLeading) {
        // 1) 시각 콘텐츠 — 터치 안 받음
        ZStack {
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .fill(tint.opacity(0.85))
            contentView
        }
        .frame(width: displayW, height: displayH)
        .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
        .allowsHitTesting(false)

        // 2) UIKit 제스처를 가진 투명 레이어
        TileTouchHandler(
            isEditMode: isEditMode,
            onTap: {
                if !isEditMode { onTap() }
            },
            onLongPressChanged: { state, location in
                handleLongPress(state: state, location: location)
            }
        )
        .frame(width: displayW, height: displayH)

        // 3) 편집 버튼들 — 자기 hit shape만 받음
        if isEditMode {
            deleteButton
            resizeHandle
        }
    }
    .frame(width: displayW, height: displayH)
    // ... scaleEffect, position 등
}
```

`handleLongPress`는 `UIGestureRecognizer.State`와 window 좌표를 받아 기존의 드래그 로직(프리뷰, 그리드 스냅, 커밋)을 그대로 처리한다.

```swift
@State private var longPressStart: CGPoint = .zero

private func handleLongPress(state: UIGestureRecognizer.State, location: CGPoint) {
    switch state {
    case .began:
        longPressStart = location
        isDragging = true
        onDragStateChange(true)
        dragOffset = .zero

    case .changed:
        let translation = CGSize(
            width: location.x - longPressStart.x,
            height: location.y - longPressStart.y
        )
        dragOffset = translation
        // 그리드 좌표로 환산해 프리뷰 갱신
        let rawX = Int(round((baseX + translation.width - 3) / cellSize))
        let rawY = Int(round((baseY + translation.height - 3) / cellSize))
        let clamped = HomeGridLayout.clampPosition(
            x: rawX, y: rawY, width: item.width, height: item.height
        )
        let grid = GridPoint(x: clamped.x, y: clamped.y)
        if lastPreviewMove != grid {
            lastPreviewMove = grid
            onPreviewChange(grid.x, grid.y, item.width, item.height)
        }

    case .ended:
        let translation = CGSize(
            width: location.x - longPressStart.x,
            height: location.y - longPressStart.y
        )
        isDragging = false
        onDragStateChange(false)
        let newX = Int(round((baseX + translation.width - 3) / cellSize))
        let newY = Int(round((baseY + translation.height - 3) / cellSize))
        withAnimation(.spring(response: 0.35, dampingFraction: 0.75)) {
            dragOffset = .zero
            onPreviewClear()
            onMove(newX, newY)
        }

    case .cancelled, .failed:
        isDragging = false
        onDragStateChange(false)
        withAnimation(.spring(response: 0.35, dampingFraction: 0.75)) {
            dragOffset = .zero
            onPreviewClear()
        }

    default:
        break
    }
}
```

### 5-4. 안전망: 드래그 중에는 `.scrollDisabled`

UIKit 제스처가 ScrollView pan과 협응하기는 하지만, LP가 `began`된 뒤 사용자가 큰 폭으로 움직이면 pan이 뒤늦게 활성화될 가능성이 0은 아니다. 안전을 위해 드래그 시작/종료 시에 콜백을 통해 부모로 상태를 올리고, ScrollView를 비활성화한다.

```swift
@State private var activeDragTileId: String?

ScrollView(.vertical) {
    // ... 그리드 콘텐츠
}
.scrollDisabled(activeDragTileId != nil)

// 타일 콜백
onDragStateChange: { dragging in
    if dragging {
        activeDragTileId = item.id
    } else if activeDragTileId == item.id {
        activeDragTileId = nil
    }
}
```

## 6. 결과

- **편집 모드 진입 후 타일 위에서 위/아래로 빠르게 스와이프 → 정상 스크롤** ✓
- **타일을 0.2초 이상 가만히 누르면 → 드래그 모드 진입** ✓
- **드래그 중에는 ScrollView가 막혀 있어 우발적 스크롤 충돌 없음** ✓
- **비편집 모드에서 짧은 탭 → 디테일 화면 이동** ✓

`UIScrollView`의 `delaysContentTouches`와 UIKit 제스처 인식기 간 협응을 그대로 활용한 결과, 결국 사용자에게는 "iOS 홈 화면처럼 동작하는" 느낌을 줄 수 있게 됐다.

## 7. 정리

- SwiftUI의 `.gesture()`/`.simultaneousGesture()`는 ScrollView pan과 자연스럽게 협응하지 않는다. 자식 제스처가 터치를 즉시 점유해버려 스크롤이 막힌다.
- 표면적인 해결(`.simultaneousGesture`, `maximumDistance` 조정, `scrollDisabled`)은 본질을 비껴간다.
- 가장 신뢰할 수 있는 해법은 **`UIViewRepresentable`로 UIKit 제스처 인식기를 가져오는 것**이다. UIKit의 `delaysContentTouches`/제스처 협응 메커니즘을 그대로 받아쓸 수 있다.
- 추가로 드래그 상태를 부모로 올려 `.scrollDisabled`까지 걸어두면, 엣지 케이스에서의 충돌까지 깔끔하게 막을 수 있다.

SwiftUI는 분명 편하지만, 스크롤뷰와 커스텀 제스처가 얽히는 순간엔 UIKit으로 한 발 내려가는 것이 가장 빠른 길이다. "SwiftUI로만 해결하는 우아한 방법은 없는가" 하는 갈증은 남지만, 적어도 사용자 경험이 망가지는 것보단 낫다.
