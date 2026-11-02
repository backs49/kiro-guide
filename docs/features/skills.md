---
sources:
  - https://kiro.dev/docs/skills/
  - https://kiro.dev/docs/cli/skills
  - https://kiro.dev/docs/cli/v3/new-features/
---

# Skills

<span class="level">L3</span> Skill은 **재사용 가능한 작업 절차**를 폴더 단위로 묶어 두고, 요청이 맞을 때 에이전트가 불러 쓰게 하는 기능입니다. 항상 포함되는 Steering과 달리 **필요할 때만** 로드됩니다.

## 파일 위치 (CLI 3.0)

```text
.kiro/skills/
└── <스킬 이름>/
    └── SKILL.md
```

- 워크스페이스의 모든 에이전트가 자동으로 발견합니다.
- `SKILL.md`에는 **front matter가 있어야** 하며, `description` 필드가 Kiro가 이 스킬을 언제 활성화할지 판단하는 기준입니다.

## 예: Flyway 마이그레이션 작성 스킬

```markdown
---
description: DB 스키마 변경(테이블·컬럼·인덱스 추가)을 요청받았을 때 Flyway 마이그레이션 파일을 규칙에 맞게 작성한다.
---

# Flyway 마이그레이션 작성 절차

1. `src/main/resources/db/migration/` 의 마지막 버전 번호를 확인한다.
2. 파일 이름은 `V<다음 번호>__<설명>.sql` 형식으로 만든다.
3. 기존 마이그레이션 파일은 절대 수정하지 않는다.
4. 롤백이 필요한 변경이면 롤백 SQL을 PR 설명에 함께 적는다.
5. JPA 엔티티 변경이 필요하면 함께 수정하고 테스트를 실행한다.
```

::: warning TODO(확인 필요)
- `SKILL.md` front matter의 필수 필드 목록(`name` 필요 여부 등).
- CLI 2.x와 IDE에서의 Skills 지원 범위와 경로(외부 블로그에는 CLI 1.24에서 Skills가 추가되었다는 언급이 있음).
- 전역(사용자) 스킬 경로.
:::

## Steering · Skill · Custom agent 중 무엇을 쓸까

| 상황 | 추천 |
|------|------|
| 모든 작업에 항상 지켜야 하는 규칙 | Steering (`always`) |
| 특정 파일 종류에만 필요한 규칙 | Steering (`fileMatch`) |
| 가끔 필요한 **절차** (마이그레이션 작성, 릴리스 노트 작성) | **Skill** |
| 도구 권한까지 다른 **역할** (리뷰어, 문서 작성자) | Custom agent |
| 외부 도구 + 지시문 + Hook을 한 번에 배포 | [Powers](./powers.md) |
