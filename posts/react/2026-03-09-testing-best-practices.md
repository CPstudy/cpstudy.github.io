---
title: "프론트엔드 테스팅 완전 가이드"
date: "2026-03-09"
description: "Jest, Testing Library, Playwright로 신뢰할 수 있는 테스트 코드 작성법을 알아봅니다."
tags: ["testing", "jest", "react", "playwright"]
category: "React"
---

# 프론트엔드 테스팅 완전 가이드

## 테스트의 종류

- **단위 테스트**: 개별 함수/컴포넌트
- **통합 테스트**: 여러 컴포넌트 상호작용
- **E2E 테스트**: 사용자 시나리오 전체

## Jest + Testing Library

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter 컴포넌트', () => {
  it('초기값이 0으로 렌더링된다', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('버튼 클릭 시 카운트가 증가한다', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    await user.click(screen.getByRole('button', { name: '증가' }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
```

## 비동기 테스트

```tsx
it('데이터를 성공적으로 불러온다', async () => {
  server.use(
    http.get('/api/users', () => {
      return HttpResponse.json([{ id: 1, name: '홍길동' }]);
    })
  );

  render(<UserList />);
  
  expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText('홍길동')).toBeInTheDocument();
  });
});
```

## Playwright E2E

```typescript
import { test, expect } from '@playwright/test';

test('로그인 플로우', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('환영합니다')).toBeVisible();
});
```

## 테스트 원칙

- **AAA 패턴**: Arrange(준비) → Act(실행) → Assert(검증)
- 구현이 아닌 동작을 테스트
- 테스트는 독립적으로 실행 가능해야 함
- 커버리지보다 중요한 것은 테스트 품질
