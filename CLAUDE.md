# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# 서버 실행
./gradlew bootRun

# 빌드
./gradlew build

# 테스트 전체
./gradlew test

# 단일 테스트 클래스
./gradlew test --tests "org.example.domain.user.service.UserServiceTest"

# 빌드 캐시 초기화
./gradlew clean
```

## Project Structure

- **Spring Boot 3.4.1**, Java 17, Gradle 9.0.0, group `org.example`
- 메인 클래스: `src/main/java/org/example/AiWritingApplication.java`
- 도메인 패키지: `src/main/java/org/example/domain/`
- 공통 패키지: `src/main/java/org/example/global/` (config, exception, security, common)
- 리소스: `src/main/resources/application.yml` + `application-local.yml` / `application-prod.yml`

## Architecture

AI 글쓰기 플랫폼 백엔드. 도메인 중심 패키지 구조(domain/user, domain/document, domain/ai)를 사용하며, 공통 관심사는 global 패키지에서 관리한다.

- **인증**: Spring Security + JWT (jjwt 0.12.6)
- **DB**: MySQL + Spring Data JPA (local: ddl-auto=update, prod: validate)
- **문서화**: springdoc-openapi (`/swagger-ui.html`)
- **DB 자동설정**: 엔티티 작업 전까지 `application.yml`의 `autoconfigure.exclude`로 비활성화 중

## Response Rules

- 모든 답변은 한국어로 작성한다.
- 코드 주석도 한국어로 작성한다.
- 설명은 초급 백엔드 개발자가 이해할 수 있도록 작성한다.
- 설계 이유를 함께 설명한다.
- 코드 생성 전 설계 내용을 먼저 설명한다.
