---
sources:
  - https://kiro.dev/docs/ide/chat/
  - https://kiro.dev/docs/ide/editor/source-control/
  - https://kiro.dev/docs/steering/
---

# 컨텍스트 참조 (`#`)

<span class="level">L1</span> 채팅 입력창에 `#`을 입력하면 컨텍스트 제공자 목록이 나타납니다. 필요한 정보만 정확히 붙이는 것이 응답 품질과 크레딧 절약 모두에 가장 효과적입니다.

## 주요 컨텍스트 제공자

| 참조 | 붙는 내용 | 예시 요청 |
|------|-----------|-----------|
| `#codebase` | 프로젝트 전체에서 Kiro가 관련 파일을 자동으로 찾아 참고 | `#codebase 인증 흐름을 설명해 줘` |
| `#file` | 지정한 파일 | `#file`로 `OrderService.java`를 고른 뒤 "트랜잭션 경계를 검토해 줘" |
| `#folder` | 지정한 폴더와 그 안의 파일 | `#folder`로 `order` 패키지를 고른 뒤 "책임이 겹치는 클래스를 찾아 줘" |
| `#git diff` | 현재 Git 변경분 (staged + unstaged) | `#git diff 커밋 전에 리뷰해 줘` |
| `#terminal` | 활성 터미널의 최근 출력과 명령 기록 | `#terminal 빌드 실패 원인을 찾아 줘` |
| `#problems` | 현재 파일의 문제(컴파일 오류·경고) 목록 | `#problems 경고를 정리해 줘` |
| `#spec` | 특정 스펙의 모든 파일(requirements, design, tasks) | `#spec:user-authentication 설계에 비밀번호 재설정 흐름을 추가해 줘` |
| `#<steering 파일 이름>` | manual 모드 Steering 파일을 필요할 때만 포함 | `#security-rules 이 컨트롤러를 점검해 줘` |

여러 참조를 한 요청에 함께 쓸 수 있습니다.

```text
#git diff #team-conventions 팀 코딩 규칙에 어긋나는 부분이 있는지 리뷰해 줘.
```

공식 문서에는 이 밖에 `#docs` 같은 제공자도 있습니다. 전체 목록은 [Chat 문서](https://kiro.dev/docs/ide/chat/)를 보세요.

::: warning TODO(확인 필요)
`#file`, `#folder`를 입력창에 직접 타이핑할 때의 경로 표기 형식(예: `#file:경로`)은 공식 문서에서 확인하지 못했습니다. 이 가이드에서는 `#`을 입력한 뒤 **목록에서 파일·폴더를 고르는 방식**으로 설명합니다.
:::

## 상황별 추천 조합

| 상황 | 추천 |
|------|------|
| 처음 보는 레거시 코드 파악 | `#codebase` 로 큰 그림 → `#folder` 로 범위 좁히기 |
| 빌드/테스트 실패 | `#terminal` + 실패한 테스트 파일 `#file` |
| 커밋 전 셀프 리뷰 | `#git diff` (+ 팀 규칙 Steering) |
| 스펙 작업 이어 하기 | `#spec:<기능 이름>` |
| 컴파일 경고 정리 | `#problems` |

## 주의할 점

- `#codebase`는 편하지만 범위가 넓어 엉뚱한 파일을 참고할 수 있습니다. 대상이 명확하면 `#file`/`#folder`가 낫습니다.
- `.env`, 인증서, 운영 DB 접속 정보 같은 **비밀 정보 파일은 채팅에 붙이지 마세요.**
- 항상 필요한 규칙은 매번 붙이지 말고 [Steering](/features/steering)으로 등록해 두세요.
