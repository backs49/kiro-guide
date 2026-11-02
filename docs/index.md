---
layout: home
pageMeta: false

hero:
  name: Kiro 가이드
  text: Kiro IDE · Kiro CLI 한국어 사용자 가이드
  tagline: 설치부터 스펙 작성, 팀 규칙 적용까지 따라 하며 익히는 비공식 가이드
  actions:
    - theme: brand
      text: 시작하기
      link: /intro/what-is-kiro
    - theme: alt
      text: 설치 바로가기
      link: /start/install-ide
    - theme: alt
      text: Claude Code와 비교
      link: /reference/claude-code-mapping

features:
  - title: 1. 소개 · 시작하기
    details: Kiro가 무엇인지, IDE·CLI·Web이 어떻게 다른지 알아보고 OS별 설치와 로그인, 첫 프로젝트까지 진행합니다.
    link: /intro/what-is-kiro
  - title: 2. IDE · CLI 사용법
    details: 채팅과 컨텍스트 참조, 모델 선택, Autopilot/Supervised, CLI 대화형 TUI와 Headless 모드(CI 연동)를 다룹니다.
    link: /ide/chat
  - title: 3. 핵심 기능 심화
    details: Specs, Steering, Hooks, MCP, Permissions, Custom agents, Skills, Powers를 설정 파일 경로와 함께 정리했습니다.
    link: /features/specs
  - title: 4. 실무 레시피
    details: Spring Boot 프로젝트 기준으로 기능 추가 스펙, 버그 수정 스펙, 리뷰 Hook, 팀 컨벤션 Steering을 만들어 봅니다.
    link: /recipes/feature-spec
---

## 이 가이드를 읽는 방법

이 사이트는 **AI 코딩 도구를 업무에 처음 들이려는 개발자**를 위한 문서입니다. Java/Spring Boot, Oracle 같은 엔터프라이즈 스택 경험은 있지만 Kiro는 처음이라고 가정합니다.

| 단계 | 읽을 곳 | 목표 |
|------|---------|------|
| <span class="level">L0</span> 입문 | [소개](/intro/what-is-kiro) → [설치](/start/install-ide) → [첫 프로젝트](/start/first-project) | Kiro를 설치하고 첫 대화를 해 본다 |
| <span class="level">L1</span> 기본 | [IDE 사용법](/ide/chat), [CLI 사용법](/cli/interactive), [요금](/pricing/) | 매일 쓰는 조작과 비용 구조를 익힌다 |
| <span class="level">L2</span> 실무 | [Specs](/features/specs), [Steering](/features/steering), [레시피](/recipes/feature-spec) | 팀 프로젝트에 스펙과 규칙을 적용한다 |
| <span class="level">L3</span> 확장 | [Hooks](/features/hooks), [MCP](/features/mcp), [Custom agents](/features/custom-agents), [Headless](/cli/headless) | 자동화와 외부 도구 연동을 구성한다 |

::: tip 표기 규칙
- 본문은 한국어로 쓰고, **명령어·파일 경로·설정 키는 원문 그대로** 적습니다.
- 각 페이지 하단에 **출처 URL, 확인 날짜, 기준 버전(IDE / CLI)** 을 적었습니다.
- 공식 문서에서 확인하지 못한 내용은 본문에 쓰지 않고 `TODO(확인 필요)`로 남겼습니다.
- `<YOUR_ORG>`, `<API_KEY>` 처럼 꺾쇠로 감싼 값은 직접 바꿔 넣는 자리입니다.
:::

::: warning 비공식 가이드
비공식 사용자 가이드이며 Amazon Web Services 및 Kiro 팀과 무관합니다. Kiro는 업데이트가 잦으므로 최신 정보는 [공식 문서](https://kiro.dev/docs/)와 [변경 로그](https://kiro.dev/changelog/)를 확인하세요.
:::
