---
title: "자바스크립트로 배우는 디자인 패턴"
date: "2026-03-08"
description: "실제 코드에서 자주 사용되는 디자인 패턴들을 JavaScript/TypeScript 예제로 알아봅니다."
tags: ["design-pattern", "javascript", "architecture"]
category: "아키텍처"
---

# 자바스크립트로 배우는 디자인 패턴

## 싱글턴 패턴

```typescript
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: any;

  private constructor() {
    this.connection = /* DB 연결 */ null;
  }

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}
```

## 옵저버 패턴

```typescript
class EventEmitter {
  private listeners = new Map<string, Function[]>();

  on(event: string, listener: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  emit(event: string, ...args: any[]) {
    this.listeners.get(event)?.forEach(listener => listener(...args));
  }

  off(event: string, listener: Function) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      this.listeners.set(event, listeners.filter(l => l !== listener));
    }
  }
}
```

## 팩토리 패턴

```typescript
interface Button {
  render(): string;
  onClick(): void;
}

class WindowsButton implements Button {
  render() { return '<button class="windows">클릭</button>'; }
  onClick() { console.log('Windows 버튼 클릭'); }
}

class MacButton implements Button {
  render() { return '<button class="mac">클릭</button>'; }
  onClick() { console.log('Mac 버튼 클릭'); }
}

function createButton(os: 'windows' | 'mac'): Button {
  return os === 'windows' ? new WindowsButton() : new MacButton();
}
```

## 전략 패턴

```typescript
interface SortStrategy {
  sort(data: number[]): number[];
}

class QuickSort implements SortStrategy {
  sort(data: number[]) { /* ... */ return data.sort(); }
}

class BubbleSort implements SortStrategy {
  sort(data: number[]) { /* ... */ return data; }
}

class Sorter {
  constructor(private strategy: SortStrategy) {}
  
  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }
  
  sort(data: number[]) {
    return this.strategy.sort(data);
  }
}
```
