---
title: "CSS Grid로 복잡한 레이아웃 만들기"
date: "2026-01-20"
description: "CSS Grid의 핵심 개념과 실전 레이아웃 패턴을 학습합니다."
tags: ["css", "grid", "layout", "frontend"]
category: "CSS"
---

# CSS Grid로 복잡한 레이아웃 만들기

CSS Grid는 2차원 레이아웃을 위한 강력한 도구입니다.

## 기본 개념

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}
```

## 그리드 영역 이름 지정

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## 반응형 그리드

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

`auto-fill`과 `minmax`를 조합하면 미디어 쿼리 없이도 반응형 그리드를 만들 수 있습니다.

## 아이템 배치

```css
.featured {
  grid-column: 1 / 3;  /* 1번째~3번째 열 차지 */
  grid-row: 1 / 3;     /* 1번째~3번째 행 차지 */
}
```

CSS Grid와 Flexbox를 적절히 조합하면 거의 모든 레이아웃을 구현할 수 있습니다.
