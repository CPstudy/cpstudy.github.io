---
title: "GraphQL 입문: REST API와의 차이점"
date: "2026-02-28"
description: "GraphQL의 핵심 개념을 REST API와 비교하며 스키마 설계와 쿼리 작성법을 배웁니다."
tags: ["graphql", "api", "backend", "frontend"]
category: "백엔드"
---

# GraphQL 입문: REST API와의 차이점

## GraphQL vs REST

REST에서는 여러 엔드포인트에서 데이터를 가져옵니다:
```
GET /users/1
GET /users/1/posts
GET /posts/1/comments
```

GraphQL에서는 하나의 요청으로 필요한 데이터만 가져옵니다:
```graphql
query {
  user(id: 1) {
    name
    email
    posts {
      title
      comments {
        text
        author { name }
      }
    }
  }
}
```

## 스키마 정의

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  tags: [String!]!
}

type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  post(id: ID!): Post
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
  updatePost(id: ID!, input: UpdatePostInput!): Post!
}
```

## 리졸버 구현

```typescript
const resolvers = {
  Query: {
    user: async (_, { id }, { dataSources }) => {
      return dataSources.usersAPI.getUser(id);
    },
    users: async (_, { limit, offset }, { dataSources }) => {
      return dataSources.usersAPI.getUsers({ limit, offset });
    }
  },
  User: {
    posts: async (user, _, { dataSources }) => {
      return dataSources.postsAPI.getPostsByUser(user.id);
    }
  }
};
```

## DataLoader로 N+1 문제 해결

```typescript
const userLoader = new DataLoader(async (userIds) => {
  const users = await db.users.findMany({
    where: { id: { in: userIds } }
  });
  return userIds.map(id => users.find(u => u.id === id));
});
```
