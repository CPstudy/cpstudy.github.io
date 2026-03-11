---
title: "Next.js App Router 완전 정복"
date: "2026-01-30"
description: "Next.js 13+의 App Router 아키텍처를 이해하고 서버/클라이언트 컴포넌트를 효과적으로 활용하는 방법"
tags: ["nextjs", "app-router", "react", "frontend"]
category: "React"
---

# Next.js App Router 완전 정복

Next.js 13부터 도입된 App Router는 React Server Components를 기반으로 한 새로운 라우팅 시스템입니다.

## 파일 시스템 라우팅

```
app/
├── layout.tsx          # 루트 레이아웃
├── page.tsx            # / 페이지
├── about/
│   └── page.tsx        # /about 페이지
├── blog/
│   ├── page.tsx        # /blog 페이지
│   └── [slug]/
│       └── page.tsx    # /blog/:slug 페이지
└── api/
    └── posts/
        └── route.ts    # API 라우트
```

## 서버 컴포넌트 vs 클라이언트 컴포넌트

```tsx
// 서버 컴포넌트 (기본값)
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}

// 클라이언트 컴포넌트
'use client';
function ClientComponent() {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(s => s + 1)}>{state}</button>;
}
```

## 데이터 페칭

```tsx
// 병렬 데이터 페칭
async function Page() {
  const [user, posts] = await Promise.all([
    getUser(),
    getPosts(),
  ]);
  
  return (
    <>
      <UserProfile user={user} />
      <PostList posts={posts} />
    </>
  );
}
```

## 캐싱 전략

```tsx
// 캐시 없음 (항상 새로 fetch)
fetch(url, { cache: 'no-store' });

// 캐시 유지 (기본값)
fetch(url, { cache: 'force-cache' });

// 주기적 재검증
fetch(url, { next: { revalidate: 60 } }); // 60초마다
```

App Router를 사용하면 서버에서 데이터를 가져오고 클라이언트에서 인터랙션을 처리하는 최적의 아키텍처를 구성할 수 있습니다.
