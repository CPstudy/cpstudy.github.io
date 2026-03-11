---
title: "SQL 쿼리 최적화 실전 가이드"
date: "2026-02-11"
description: "느린 쿼리를 빠르게 만드는 인덱스, 실행 계획 분석, 쿼리 튜닝 기법을 다룹니다."
tags: ["sql", "database", "optimization", "performance"]
category: "백엔드"
---

# SQL 쿼리 최적화 실전 가이드

## 실행 계획 분석

```sql
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2025-01-01'
GROUP BY u.id, u.name
ORDER BY order_count DESC;
```

## 인덱스 전략

```sql
-- 단일 컬럼 인덱스
CREATE INDEX idx_users_created_at ON users(created_at);

-- 복합 인덱스 (순서 중요!)
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- 부분 인덱스
CREATE INDEX idx_active_users ON users(email) WHERE is_active = true;

-- 커버링 인덱스 (SELECT 컬럼 포함)
CREATE INDEX idx_users_cover ON users(created_at, id, name);
```

## N+1 문제 해결

```sql
-- 나쁜 예: 루프에서 개별 쿼리
SELECT * FROM users;
-- 각 user에 대해:
SELECT * FROM orders WHERE user_id = ?;

-- 좋은 예: JOIN으로 한 번에
SELECT u.*, json_agg(o.*) as orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;
```

## 페이지네이션 최적화

```sql
-- 느린 방법 (OFFSET)
SELECT * FROM posts ORDER BY id DESC LIMIT 20 OFFSET 10000;

-- 빠른 방법 (커서 기반)
SELECT * FROM posts 
WHERE id < :last_seen_id 
ORDER BY id DESC 
LIMIT 20;
```

## 집계 최적화

```sql
-- Materialized View 활용
CREATE MATERIALIZED VIEW daily_stats AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_orders,
  SUM(amount) as total_revenue
FROM orders
GROUP BY DATE(created_at);

-- 주기적 갱신
REFRESH MATERIALIZED VIEW CONCURRENTLY daily_stats;
```
