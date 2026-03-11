---
title: "효율적인 Git 워크플로우"
date: "2026-01-25"
description: "팀 협업을 위한 Git 브랜치 전략과 커밋 메시지 컨벤션을 소개합니다."
tags: ["git", "workflow", "collaboration"]
category: "DevOps"
---

# 효율적인 Git 워크플로우

## Git Flow 전략

```
main ──────────────────────────────────────►
      \                              /
       dev ──────────────────────►
            \          /   \    /
             feature  /   release
```

주요 브랜치:
- `main`: 프로덕션 코드
- `develop`: 개발 통합 브랜치
- `feature/*`: 기능 개발
- `release/*`: 릴리즈 준비
- `hotfix/*`: 긴급 수정

## 커밋 메시지 컨벤션

Conventional Commits 형식을 따릅니다:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

타입 목록:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 (로직 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드, 설정 변경

## 유용한 Git 명령어

```bash
# 인터랙티브 리베이스로 커밋 정리
git rebase -i HEAD~3

# 특정 커밋만 가져오기
git cherry-pick abc1234

# 변경사항 임시 저장
git stash push -m "작업 중인 기능"
git stash pop

# 브랜치 삭제 (로컬 + 원격)
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

## PR 체크리스트

- [ ] 테스트 추가/수정 완료
- [ ] 자기 코드 리뷰 완료
- [ ] 관련 문서 업데이트
- [ ] 브레이킹 체인지 여부 확인
