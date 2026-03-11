---
title: "비동기 JavaScript 완전 정리"
date: "2026-02-03"
description: "콜백, Promise, async/await의 차이점과 에러 처리 패턴을 알아봅니다."
tags: ["javascript", "async", "promise"]
category: "JavaScript"
---

# 비동기 JavaScript 완전 정리

## 콜백 지옥

```javascript
getUserData(userId, function(user) {
  getOrders(user.id, function(orders) {
    getOrderDetails(orders[0].id, function(details) {
      // 계속 중첩...
    });
  });
});
```

## Promise

```javascript
getUserData(userId)
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0].id))
  .then(details => console.log(details))
  .catch(error => console.error(error));
```

## async/await

```javascript
async function fetchUserDetails(userId) {
  try {
    const user = await getUserData(userId);
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0].id);
    return details;
  } catch (error) {
    console.error('데이터 로드 실패:', error);
    throw error;
  }
}
```

## 병렬 실행

```javascript
// 순차 실행 (느림)
const user = await getUser(id);
const posts = await getPosts(id);

// 병렬 실행 (빠름)
const [user, posts] = await Promise.all([
  getUser(id),
  getPosts(id)
]);

// 하나라도 완료되면
const result = await Promise.race([
  fetchFromServer1(),
  fetchFromServer2()
]);
```

## 에러 처리 패턴

```javascript
// Result 타입 패턴
async function safeAsync<T>(promise: Promise<T>): Promise<[T, null] | [null, Error]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

const [data, error] = await safeAsync(fetchData());
if (error) {
  console.error(error);
} else {
  console.log(data);
}
```
