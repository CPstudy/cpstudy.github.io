---
title: "개발자가 알아야 할 Linux 명령어 모음"
date: "2026-03-03"
description: "실무에서 자주 쓰이는 Linux 명령어와 쉘 스크립트 패턴을 정리합니다."
tags: ["linux", "cli", "devops", "bash"]
category: "DevOps"
---

# 개발자가 알아야 할 Linux 명령어 모음

## 파일/디렉토리 작업

```bash
# 파일 찾기
find /var/log -name "*.log" -mtime -7  # 7일 이내 수정된 .log 파일
find . -type f -size +100M             # 100MB 이상 파일

# 내용 검색
grep -rn "TODO" --include="*.ts" .     # 재귀 검색
grep -E "error|warn" app.log           # 정규식 검색

# 파일 조작
awk '{print $1, $3}' data.txt          # 1, 3번째 컬럼 출력
sed 's/old/new/g' file.txt             # 치환
sort -k2 -n data.txt | uniq -c        # 정렬 후 중복 제거
```

## 프로세스 관리

```bash
# 프로세스 확인
ps aux | grep node
top -p $(pgrep -d, node)
htop

# 포트 사용 중인 프로세스
lsof -i :3000
ss -tlnp | grep :3000

# 백그라운드 실행
nohup ./script.sh > output.log 2>&1 &
```

## 네트워크

```bash
# HTTP 요청
curl -X POST https://api.example.com/data \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"key": "value"}'

# 포트 연결 확인
nc -zv hostname 443
telnet hostname 80
```

## 유용한 조합

```bash
# 실시간 로그 모니터링
tail -f app.log | grep --line-buffered "ERROR"

# 디스크 사용량 확인
du -sh /* 2>/dev/null | sort -h
df -h

# 여러 서버에 동시 실행
for host in server1 server2 server3; do
  ssh $host "systemctl status app" &
done
wait
```
