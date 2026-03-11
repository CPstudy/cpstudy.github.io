---
title: "동적 프로그래밍(DP) 문제 풀이 패턴"
date: "2026-02-18"
description: "DP의 핵심 개념과 자주 등장하는 패턴들을 예제와 함께 정리합니다."
tags: ["algorithm", "dynamic-programming", "cs"]
category: "알고리즘"
---

# 동적 프로그래밍(DP) 문제 풀이 패턴

DP는 큰 문제를 작은 부분 문제로 나누고, 중복 계산을 피하는 기법입니다.

## 피보나치로 이해하기

```python
# 메모이제이션 (Top-down)
def fib(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]

# 타뷸레이션 (Bottom-up)
def fib(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

## 0/1 배낭 문제

```python
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], 
                               dp[i-1][w-weights[i-1]] + values[i-1])
    
    return dp[n][capacity]
```

## 최장 공통 부분 수열 (LCS)

```python
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]
```

## DP 문제 접근법

1. 상태 정의: `dp[i]`가 무엇을 의미하는지 명확히
2. 점화식 도출: `dp[i]`를 이전 상태로 표현
3. 기저 조건 설정
4. 최적화 (공간 복잡도 줄이기)
