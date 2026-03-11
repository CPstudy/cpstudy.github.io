---
name: "design-system"
description: "앱 전체적인 디자인 시스템을 관리합니다."
---

# 디자인 시스템

UI 작업 시 반드시 이 스킬에 명시된 규칙을 따르도록 한다.

## 색상
One Light (라이트) / One Dark Pro Darker (다크) 기반 테마.

|항목|라이트 모드 (One Light)|다크 모드 (One Dark Pro Darker)|
|---|---|---|
|배경|#fafafa|#21252b|
|글자|#383a42|#abb2bf|
|카드|#f0f0f0|#1a1d23|
|보조|#e5e5e6|#282c34|
|약간 흐린 글자|#a0a1a7|#5c6370|
|테두리|#e5e5e6|#181a1f|
|에러|#e45649|#e06c75|
|프라이머리|#4078f2|#61afef|

## 버튼
- hover시 마우스는 hand 모양
- hover시 상태일 때 색상을 밝게 해야 함
- pressed 상태일 때 사이즈를 95%로 줄여야 함
- pressed 상태일 때 색상을 어둡게 해야 함
- disabled 상태일 때 투명도를 50%로 줄여야 함


### 크기
- small
  - 최소: 52px x 34px
  - 여백(VH): 8px 16px
  - 모서리(radius): 8px
  - 글씨: 12pt bold
- medium
  - 최소: 64px x 40px
  - 여백(VH): 8px 16px
  - 모서리(radius): 10px
  - 글씨: 14pt bold
- large
  - 최소: 80px x 48px
  - 여백(VH): 8px 16px
  - 모서리(radius): 12px
  - 글씨: 16pt bold
- xlarge
  - 최소: 96px x 56px
  - 여백(VH): 16px 24px
  - 모서리(radius): 16px
  - 글씨: 16pt bold

## 타이포그래피

폰트: Pretendard (sans), Geist Mono (code)

### 스케일

| 역할 | 태그 | 크기 | 굵기 | 행간 | 자간 |
|---|---|---|---|---|---|
| 페이지 제목 | h1 | 36px | bold 700 | 1.2 | -0.025em |
| 섹션 제목 | h2 | 24px | bold 700 | 1.375 | -0.015em |
| 소제목 | h3 | 20px | bold 700 | 1.375 | - |
| 항목 제목 | h4 | 18px | semibold 600 | 1.5 | - |
| 보조 제목 | h5/h6 | 16px | semibold 600 | 1.5 | - |
| 본문 | body/p | 14px | normal 400 | 1.625 | - |
| 보조 텍스트 | small | 12px | normal 400 | 1.5 | - |

### 규칙
- 기본 body font-size: **14px** (0.875rem)
- 기본 line-height: **1.625** (relaxed)
- 제목은 항상 `font-weight: bold(700)` 이상
- 코드 블록: Geist Mono, 13px
