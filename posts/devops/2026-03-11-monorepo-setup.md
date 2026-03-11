---
title: "Turborepo로 모노레포 구성하기"
date: "2026-03-11"
description: "Turborepo를 활용한 모노레포 셋업과 패키지 공유, 빌드 캐싱 전략을 알아봅니다."
tags: ["monorepo", "turborepo", "devops", "architecture"]
category: "DevOps"
---

# Turborepo로 모노레포 구성하기

## 모노레포가 필요한 이유

- 코드 공유 (UI 컴포넌트, 유틸리티, 타입)
- 일관된 설정 (ESLint, TypeScript, 빌드 도구)
- 의존성 중앙 관리
- 캐싱으로 빌드 속도 향상

## 구조

```
my-monorepo/
├── apps/
│   ├── web/          # Next.js 앱
│   ├── mobile/       # React Native 앱
│   └── docs/         # 문서 사이트
├── packages/
│   ├── ui/           # 공유 UI 컴포넌트
│   ├── utils/        # 공유 유틸리티
│   ├── config/       # 공유 설정 (eslint, tsconfig)
│   └── types/        # 공유 타입
├── turbo.json
└── package.json
```

## turbo.json 설정

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

## 패키지 공유

```typescript
// packages/ui/src/button.tsx
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

// apps/web/package.json
{
  "dependencies": {
    "@my/ui": "*"
  }
}

// apps/web/src/page.tsx
import { Button } from '@my/ui';
```

## 실행 명령어

```bash
# 전체 빌드
turbo build

# 특정 앱만
turbo build --filter=web

# 병렬 개발 서버 실행
turbo dev

# 캐시 초기화
turbo clean
```
