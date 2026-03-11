---
title: "Python 데코레이터 완전 가이드"
date: "2026-03-01"
description: "함수형 프로그래밍의 핵심인 Python 데코레이터를 기초부터 실전 활용까지 알아봅니다."
tags: ["python", "decorator", "functional-programming"]
category: "Python"
---

# Python 데코레이터 완전 가이드

## 기본 데코레이터

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("함수 실행 전")
        result = func(*args, **kwargs)
        print("함수 실행 후")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    print(f"안녕하세요, {name}!")

say_hello("파이썬")
# 함수 실행 전
# 안녕하세요, 파이썬!
# 함수 실행 후
```

## functools.wraps 사용

```python
from functools import wraps

def my_decorator(func):
    @wraps(func)  # 원래 함수의 메타데이터 보존
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper
```

## 인자를 받는 데코레이터

```python
def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def greet():
    print("안녕!")
```

## 실전 예제: 캐싱

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

## 실전 예제: 타이머

```python
import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} 실행 시간: {end - start:.4f}초")
        return result
    return wrapper
```

## 클래스 데코레이터

```python
class Singleton:
    _instances = {}
    
    def __call__(self, cls):
        @wraps(cls)
        def get_instance(*args, **kwargs):
            if cls not in self._instances:
                self._instances[cls] = cls(*args, **kwargs)
            return self._instances[cls]
        return get_instance

@Singleton()
class DatabaseConnection:
    pass
```
