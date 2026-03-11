---
title: "자바스크립트 클로저 완벽 이해"
date: "2026-01-05"
description: "클로저가 무엇인지, 어떻게 동작하는지, 실제로 어떻게 활용하는지 알아봅니다."
tags: ["javascript", "closure", "fundamentals"]
category: "JavaScript"
---

# 자바스크립트 클로저 완벽 이해

클로저(Closure)는 자바스크립트에서 가장 중요한 개념 중 하나입니다. 많은 개발자들이 클로저를 어렵게 생각하지만, 핵심 원리를 이해하면 매우 강력한 도구가 됩니다.

## 클로저란?

클로저는 **함수와 그 함수가 선언된 렉시컬 환경의 조합**입니다. 즉, 내부 함수가 외부 함수의 변수에 접근할 수 있는 것을 말합니다.

```javascript
function outer() {
  const message = "Hello, World!";
  
  function inner() {
    console.log(message); // 외부 함수의 변수에 접근
  }
  
  return inner;
}

const greet = outer();
greet(); // "Hello, World!" 출력
```

## 클로저의 활용

### 1. 데이터 은닉

```javascript
function createCounter() {
  let count = 0; // 외부에서 직접 접근 불가
  
  return {
    increment() { count++; },
    decrement() { count--; },
    getCount() { return count; }
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
```

### 2. 부분 적용 함수

```javascript
function multiply(x) {
  return function(y) {
    return x * y;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## 주의사항

클로저를 사용할 때 메모리 누수에 주의해야 합니다. 클로저가 더 이상 필요하지 않을 때 참조를 해제해야 합니다.

```javascript
let myFunc = (function() {
  const largeData = new Array(1000000);
  return function() {
    return largeData.length;
  };
})();

// 더 이상 필요 없으면
myFunc = null; // 가비지 컬렉션 가능
```

클로저를 잘 활용하면 모듈 패턴, 메모이제이션, 커링 등 다양한 패턴을 구현할 수 있습니다.
