---
title: "웹 보안 기초: XSS, CSRF, SQL Injection"
date: "2026-03-07"
description: "웹 개발자라면 반드시 알아야 할 주요 보안 취약점과 방어 방법을 정리합니다."
tags: ["security", "web", "xss", "csrf"]
category: "보안"
---

# 웹 보안 기초: XSS, CSRF, SQL Injection

## XSS (Cross-Site Scripting)

공격자가 악의적인 스크립트를 웹 페이지에 삽입하는 공격입니다.

```javascript
// 취약한 코드
document.getElementById('output').innerHTML = userInput;

// 안전한 코드
document.getElementById('output').textContent = userInput;

// DOMPurify로 sanitize
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

CSP(Content Security Policy) 헤더 설정:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-xxx'
```

## CSRF (Cross-Site Request Forgery)

사용자의 권한을 이용해 의도치 않은 요청을 보내는 공격입니다.

```javascript
// CSRF 토큰 사용
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ amount: 1000, to: 'account123' })
});
```

SameSite 쿠키 설정:
```
Set-Cookie: session=xxx; SameSite=Strict; Secure; HttpOnly
```

## SQL Injection

```javascript
// 취약한 코드
const query = `SELECT * FROM users WHERE email = '${email}'`;

// 안전한 코드 (파라미터화 쿼리)
const query = 'SELECT * FROM users WHERE email = $1';
const result = await db.query(query, [email]);

// ORM 사용 (Prisma)
const user = await prisma.user.findUnique({
  where: { email: email }
});
```

## 보안 헤더

```javascript
// Next.js headers 설정
const headers = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=()' }
];
```
