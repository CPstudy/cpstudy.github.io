---
title: "TypeScript 제네릭 마스터하기"
date: "2026-01-15"
description: "TypeScript 제네릭의 기본부터 고급 패턴까지, 타입 안전성을 높이는 방법을 알아봅니다."
tags: ["typescript", "generics", "type-safety"]
category: "TypeScript"
---

# TypeScript 제네릭 마스터하기

제네릭은 TypeScript의 강력한 기능 중 하나로, 타입을 변수처럼 다룰 수 있게 해줍니다.

## 기본 제네릭

```typescript
function identity<T>(arg: T): T {
  return arg;
}

identity<string>("hello"); // string 반환
identity<number>(42);      // number 반환
identity("world");         // 타입 추론으로 string
```

## 제네릭 인터페이스

```typescript
interface Repository<T> {
  findById(id: number): Promise<T>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}

class UserRepository implements Repository<User> {
  async findById(id: number): Promise<User> {
    // 구현...
  }
  // ...
}
```

## 제약 조건 (Constraints)

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");      // OK
logLength([1, 2, 3]);    // OK
logLength({ length: 5 }); // OK
logLength(42);           // 오류! number에는 length 없음
```

## 조건부 타입

```typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<string>;   // false

// Unwrap 유틸리티
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type C = Unwrap<Promise<string>>; // string
type D = Unwrap<number>;          // number
```

## 유틸리티 타입

TypeScript 내장 유틸리티 타입도 제네릭으로 구현되어 있습니다.

```typescript
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
```

제네릭을 잘 활용하면 재사용 가능하고 타입 안전한 코드를 작성할 수 있습니다.
