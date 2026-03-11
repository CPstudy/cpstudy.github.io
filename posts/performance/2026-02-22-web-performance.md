---
title: "웹 성능 최적화 체크리스트"
date: "2026-02-22"
description: "Core Web Vitals를 중심으로 웹 성능을 개선하는 실용적인 방법들을 정리합니다."
tags: ["performance", "web", "optimization", "frontend"]
category: "성능 최적화"
---

# 웹 성능 최적화 체크리스트

## Core Web Vitals

- **LCP** (Largest Contentful Paint): 2.5초 이내
- **FID** (First Input Delay): 100ms 이내
- **CLS** (Cumulative Layout Shift): 0.1 이하

## 이미지 최적화

```html
<!-- 적절한 크기와 형식 -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="설명" width="800" height="600" loading="lazy">
</picture>
```

Next.js에서는 `next/image`를 사용하면 자동으로 최적화됩니다.

## 번들 크기 최적화

```javascript
// 동적 임포트로 코드 스플리팅
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
});

// 트리 쉐이킹이 잘 되도록 named export 사용
import { specific } from 'big-library';
// import * as lib from 'big-library'; // 피하기
```

## 폰트 최적화

```css
@font-face {
  font-family: 'MyFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* 로딩 중 시스템 폰트 사용 */
}
```

## 캐싱 전략

```javascript
// Service Worker 캐싱
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(response => {
        caches.open('v1').then(cache => cache.put(event.request, response));
        return response.clone();
      });
    })
  );
});
```

## 측정 도구

- Chrome DevTools Performance 탭
- Lighthouse
- WebPageTest
- `web-vitals` 라이브러리로 실제 사용자 데이터 수집
