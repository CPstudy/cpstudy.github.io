---
title: "Zustand로 간결한 상태 관리하기"
date: "2026-03-10"
description: "Redux의 복잡함 없이 Zustand로 React 앱의 전역 상태를 효율적으로 관리하는 방법"
tags: ["zustand", "state-management", "react", "frontend"]
category: "React"
---

# Zustand로 간결한 상태 관리하기

## 기본 스토어 생성

```typescript
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

## 컴포넌트에서 사용

```tsx
function Counter() {
  const { count, increment, decrement } = useCounterStore();
  
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

## 선택적 구독으로 최적화

```tsx
// count만 변경될 때만 리렌더링
const count = useCounterStore(state => state.count);

// 여러 값 선택 (얕은 비교)
import { useShallow } from 'zustand/react/shallow';

const { count, increment } = useCounterStore(
  useShallow(state => ({ count: state.count, increment: state.increment }))
);
```

## persist 미들웨어

```typescript
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

## 비동기 액션

```typescript
interface UserStore {
  user: User | null;
  loading: boolean;
  fetchUser: (id: number) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  fetchUser: async (id) => {
    set({ loading: true });
    try {
      const user = await api.getUser(id);
      set({ user, loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));
```

Zustand는 Redux에 비해 보일러플레이트가 훨씬 적고, Context API보다 성능이 좋습니다.
