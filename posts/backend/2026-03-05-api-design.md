---
title: "RESTful API 설계 원칙과 Best Practices"
date: "2026-03-05"
description: "좋은 REST API를 설계하는 원칙들과 실제 API 엔드포인트 예제를 살펴봅니다."
tags: ["api", "rest", "backend", "design"]
category: "백엔드"
---

# RESTful API 설계 원칙과 Best Practices

## 리소스 명명 규칙

```
# 좋은 예
GET    /users
GET    /users/{id}
POST   /users
PUT    /users/{id}
PATCH  /users/{id}
DELETE /users/{id}

GET    /users/{id}/orders
POST   /users/{id}/orders

# 나쁜 예
GET /getUsers
POST /createUser
GET /user/getById/123
```

## HTTP 상태 코드

```
200 OK          - 성공
201 Created     - 리소스 생성
204 No Content  - 성공, 반환값 없음
400 Bad Request - 잘못된 요청
401 Unauthorized - 인증 필요
403 Forbidden   - 권한 없음
404 Not Found   - 리소스 없음
422 Unprocessable - 유효성 검사 실패
429 Too Many Requests - 속도 제한
500 Internal Server Error
```

## 응답 형식 표준화

```json
{
  "data": {
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com"
  },
  "meta": {
    "timestamp": "2026-03-05T10:00:00Z",
    "version": "1.0"
  }
}

// 에러 응답
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "이메일 형식이 올바르지 않습니다",
    "details": [
      { "field": "email", "message": "유효한 이메일 주소를 입력해주세요" }
    ]
  }
}
```

## 페이지네이션

```json
// 커서 기반 (권장)
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTAwfQ==",
    "has_more": true
  }
}

// 오프셋 기반
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 500
  }
}
```

## 버전 관리

```
# URL 경로 (권장)
/api/v1/users
/api/v2/users

# 헤더
Accept: application/vnd.myapi.v1+json
```
