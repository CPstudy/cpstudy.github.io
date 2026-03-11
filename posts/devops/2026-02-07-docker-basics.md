---
title: "Docker 기초부터 실전까지"
date: "2026-02-07"
description: "컨테이너 기술의 핵심 개념을 이해하고 실제 프로젝트에 Docker를 적용해봅니다."
tags: ["docker", "devops", "container"]
category: "DevOps"
---

# Docker 기초부터 실전까지

## Docker란?

Docker는 애플리케이션을 컨테이너로 패키징하여 어디서든 동일하게 실행할 수 있게 해주는 플랫폼입니다.

## Dockerfile 작성

```dockerfile
# Node.js 앱 예시
FROM node:20-alpine

WORKDIR /app

# 의존성 먼저 복사 (캐싱 최적화)
COPY package*.json ./
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## 멀티 스테이지 빌드

```dockerfile
# 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 실행 스테이지
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password

volumes:
  postgres_data:
```

## 주요 명령어

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
docker compose up -d
docker compose logs -f app
docker exec -it container_name sh
```
