---
title: "Rust 소유권 시스템 이해하기"
date: "2026-02-25"
description: "Rust의 핵심 개념인 소유권, 빌림, 라이프타임을 예제로 쉽게 설명합니다."
tags: ["rust", "ownership", "systems-programming"]
category: "시스템 프로그래밍"
---

# Rust 소유권 시스템 이해하기

Rust의 소유권 시스템은 GC 없이 메모리 안전성을 보장하는 핵심 기능입니다.

## 소유권 규칙

1. 각 값은 소유자(owner)가 있다
2. 값의 소유자는 하나뿐이다
3. 소유자가 스코프를 벗어나면 값이 drop된다

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // 소유권 이동 (move)
    
    // println!("{}", s1); // 오류! s1은 더 이상 유효하지 않음
    println!("{}", s2); // OK
}
```

## 빌림 (Borrowing)

```rust
fn main() {
    let s = String::from("hello");
    
    let len = calculate_length(&s); // 빌림
    println!("'{}'의 길이: {}", s, len); // s는 여전히 유효
}

fn calculate_length(s: &String) -> usize {
    s.len()
} // s는 drop되지 않음 (소유권이 없으므로)
```

## 가변 참조

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(s: &mut String) {
    s.push_str(", world");
}

// 규칙: 동시에 가변 참조는 하나만!
let r1 = &mut s;
// let r2 = &mut s; // 오류!
```

## 라이프타임

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

소유권 시스템 덕분에 Rust는 컴파일 타임에 메모리 안전성을 보장합니다.
