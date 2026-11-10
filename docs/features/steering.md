---
sources:
  - https://kiro.dev/docs/steering/
  - https://kiro.dev/docs/cli/steering/
  - https://kiro.dev/docs/cli/v3/new-features/
  - https://kiro.dev/docs/ide/chat/slash-commands/
---

# Steering

<span class="level">L2</span> Steering은 프로젝트 규칙과 배경지식을 **마크다운 파일**로 남겨 에이전트가 참고하게 하는 기능입니다. Claude Code의 `CLAUDE.md`와 비슷한 역할입니다. → [대응표](/reference/claude-code-mapping)

## 파일 위치

| 범위 | 경로 | 적용 대상 |
|------|------|-----------|
| 워크스페이스 | `.kiro/steering/*.md` | 해당 프로젝트 |
| 전역(사용자) | `~/.kiro/steering/*.md` | 모든 워크스페이스 |
| `AGENTS.md` | 프로젝트 내 `AGENTS.md` | Kiro도 읽음. 포함 모드를 지원하지 않으며 **항상 포함** |

## 기본(foundation) 파일

IDE에서 **Generate Steering Docs**를 실행하면 Kiro가 프로젝트를 분석해 다음 세 파일을 만듭니다. 이 파일들은 기본적으로 모든 대화에 포함됩니다.

| 파일 | 내용 |
|------|------|
| `product.md` | 제품 목적, 대상 사용자, 비즈니스 목표 |
| `tech.md` | 프레임워크, 라이브러리, 도구, 제약 |
| `structure.md` | 파일 구성, 이름 규칙 |

## 포함 모드 (front matter)

파일 맨 앞에 YAML front matter를 두어 언제 포함될지 정합니다. **front matter는 파일의 첫 내용이어야 하며, 앞에 빈 줄이 있으면 안 됩니다.**

| 모드 | 동작 |
|------|------|
| `always` (기본값) | 모든 상호작용에 자동 포함 |
| `fileMatch` | 작업 중인 파일이 패턴과 맞을 때 포함 (`fileMatchPattern`, 목록도 가능) |
| `manual` | 필요할 때만 수동 포함. 채팅에서 `#파일이름`으로 참조하거나 `/` 슬래시 메뉴에서 선택 |
| `auto` | 요청이 파일의 `description`과 맞으면 자동 활성화. `/` 메뉴에도 나타남 |

### 예: `always`

```markdown
---
inclusion: always
---

# 공통 규칙
- 모든 응답과 주석은 한국어로 작성한다.
```

### 예: `fileMatch` (테스트 파일 규칙)

```markdown
---
inclusion: fileMatch
fileMatchPattern: "src/test/**/*.java"
---

# 테스트 작성 규칙
- JUnit 5와 AssertJ를 사용한다.
- 테스트 메서드 이름은 `given_when_then` 형식으로 쓴다.
```

### 예: `manual` (필요할 때만 부르는 보안 점검)

```markdown
---
inclusion: manual
---

# 보안 점검 체크리스트
- SQL은 바인딩 변수만 사용하는가 (문자열 연결 금지)
- 로그에 개인정보·토큰이 남지 않는가
```

이 파일이 `.kiro/steering/security-review.md`라면 채팅에서 `#security-review`로 참조하거나 `/` 메뉴에서 골라 실행합니다.

### `auto` 모드 주의

::: warning TODO(확인 필요)
`auto` 모드를 front matter에 어떻게 쓰는지(필드 이름, `description` 위치)는 문서 간 설명이 엇갈립니다. Steering 문서는 "skills처럼 description으로 판단"한다고 설명하지만, CLI V3 문서는 "auto는 하네스가 컨텍스트로 판단하며 front matter로 직접 설정하지 않는다"고 적고 있습니다. 사용 전에 최신 [Steering 문서](https://kiro.dev/docs/steering/)를 확인하세요.
:::

## 버전별 지원

| 환경 | 지원 포함 모드 |
|------|----------------|
| Kiro IDE | always, fileMatch, manual, auto |
| CLI 3.0 | always, fileMatch, manual, auto |
| CLI 2.x(V1/V2 엔진) | `always`만 자동 로딩. `fileMatch`·`manual` 파일은 자동 로딩에서 제외 |

## 좋은 Steering 작성 요령

1. **짧고 단정하게**: "~하면 좋다"보다 "~한다 / ~하지 않는다".
2. **이유를 한 줄 덧붙이기**: 에이전트가 예외 상황에서 판단할 근거가 됩니다.
3. **always는 최소한으로**: 모든 대화에 들어가므로 길면 비용과 응답 품질에 영향을 줍니다. 특정 파일에만 필요한 규칙은 `fileMatch`로 분리하세요.
4. **비밀 정보 금지**: 접속 정보, 토큰, 내부 URL은 넣지 마세요. 필요한 자리는 `<DB_URL>` 같은 플레이스홀더로 둡니다.
5. **팀 공유**: `.kiro/steering/`은 Git에 커밋해 팀이 같은 규칙을 쓰게 합니다.

::: info 알려진 이슈
전역(`~/.kiro/steering/`)에 둔 `fileMatch` 파일이 동작하지 않는다는 사용자 보고(GitHub 이슈)가 있습니다. 공식 문서 내용은 아니며 이미 고쳐졌을 수 있습니다. 전역 규칙이 적용되지 않으면 워크스페이스로 옮겨 확인해 보세요.
:::

실전 예시는 [레시피: 팀 컨벤션 Steering](/recipes/team-steering)을 보세요.
