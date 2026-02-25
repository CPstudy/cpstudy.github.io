---
title: "첫 번째 블로그 포스트"
date: "2026-02-25"
description: "블로그를 시작하며 쓰는 첫 번째 글입니다."
tags: ["블로그", "Next.js", "시작"]
---

## 블로그를 시작하며

드디어 개발 블로그를 만들었습니다. Next.js와 Markdown을 이용해 정적 블로그를 구축했습니다.

## 기술 스택

- **Next.js 16** — React 기반 풀스택 프레임워크
- **Tailwind CSS v4** — 유틸리티 우선 CSS 프레임워크
- **gray-matter** — Markdown frontmatter 파싱
- **react-markdown** — Markdown 렌더링

## 포스트 작성 방법

`posts/` 폴더에 `.md` 파일을 추가하면 자동으로 블로그에 등록됩니다.

frontmatter 형식은 다음과 같습니다:

```yaml
---
title: "포스트 제목"
date: "2026-01-01"
description: "포스트 요약"
tags: ["태그1", "태그2"]
---
```

## 코드 예시

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

## 마치며

앞으로 개발하며 배운 것들을 꾸준히 기록해 나가겠습니다.
