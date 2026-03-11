---
title: "Tailwind CSS 실전 팁 모음"
date: "2026-02-15"
description: "Tailwind CSS를 더 효율적으로 사용하는 팁과 패턴들을 소개합니다."
tags: ["tailwind", "css", "frontend", "tips"]
category: "CSS"
---

# Tailwind CSS 실전 팁 모음

## 반응형 디자인

```html
<!-- 모바일 우선, 큰 화면에서 레이아웃 변경 -->
<div class="flex flex-col md:flex-row gap-4">
  <aside class="w-full md:w-64">사이드바</aside>
  <main class="flex-1">메인 콘텐츠</main>
</div>
```

## 다크모드

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  콘텐츠
</div>
```

## group과 peer 활용

```html
<!-- group: 부모 호버 시 자식 스타일 변경 -->
<div class="group">
  <img class="group-hover:scale-105 transition-transform" />
  <p class="group-hover:text-blue-500">설명</p>
</div>

<!-- peer: 형제 요소 상태에 따른 스타일 -->
<input class="peer" type="checkbox" />
<label class="peer-checked:text-blue-500">체크되면 파란색</label>
```

## 커스텀 유틸리티 (Tailwind v4)

```css
@import "tailwindcss";

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scrollbar-hide {
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
```

## clsx/cn 패턴

```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 사용
<button className={cn(
  "px-4 py-2 rounded",
  isPrimary && "bg-blue-500 text-white",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>
  버튼
</button>
```
