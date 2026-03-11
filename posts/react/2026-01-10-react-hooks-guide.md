---
title: "React Hooks 실전 가이드"
date: "2026-01-10"
description: "useState, useEffect, useCallback, useMemo 등 주요 훅을 실전 예제로 배웁니다."
tags: ["react", "hooks", "frontend"]
category: "React"
---

# React Hooks 실전 가이드

React 16.8에서 도입된 Hooks는 함수형 컴포넌트에서도 상태와 생명주기를 다룰 수 있게 해줍니다.

## useState

가장 기본적인 상태 관리 훅입니다.

```tsx
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
```

## useEffect

사이드 이펙트를 처리합니다.

```tsx
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe(); // cleanup
  };
}, [props.source]);
```

## useCallback과 useMemo

성능 최적화를 위한 훅들입니다.

```tsx
// 함수 메모이제이션
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []); // 의존성 배열이 비어있으면 최초 한 번만 생성

// 값 메모이제이션
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

## 커스텀 훅

반복되는 로직을 커스텀 훅으로 추출할 수 있습니다.

```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
```

훅은 컴포넌트 최상위에서만 호출해야 하며, 조건문이나 반복문 안에서 호출하면 안 됩니다.
