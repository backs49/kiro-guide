---
sources:
  - https://kiro.dev/
  - https://kiro.dev/docs/
  - https://kiro.dev/docs/how-kiro-works/
  - https://kiro.dev/docs/upgrade-guides/migrating-from-q-developer/
---

# Kiro란

<span class="level">L0</span> 이 페이지를 읽고 나면 Kiro가 어떤 도구이고, 어떤 형태(IDE · CLI · Web)로 쓸 수 있는지 설명할 수 있습니다.

## 한 줄 정의

Kiro는 AWS가 만든 **에이전트형 개발 도구**입니다. 채팅으로 코드를 고치는 것에 그치지 않고, 요구사항 → 설계 → 작업 목록으로 이어지는 **스펙(Spec)** 을 먼저 만든 뒤 그에 맞춰 구현하도록 설계된 것이 가장 큰 특징입니다.

Kiro는 세 가지 형태로 제공됩니다.

| 형태 | 설명 | 주로 쓰는 상황 |
|------|------|----------------|
| **Kiro IDE** | VS Code(Code OSS) 기반 데스크톱 에디터 | 코드를 보면서 채팅·스펙·Hook을 함께 쓰고 싶을 때 |
| **Kiro CLI** (`kiro-cli`) | 터미널용 에이전트 | 서버·원격 환경 작업, 스크립트·CI 자동화 |
| **Kiro Web** | 브라우저에서 클라우드 샌드박스에 작업을 맡기는 형태 | 노트북을 닫아도 계속 돌아가야 하는 긴 작업 |

세 형태의 차이는 [IDE · CLI · Web 차이](./ide-cli-web.md)에서 자세히 비교합니다.

## Kiro로 할 수 있는 일

- **채팅으로 코드 작성·수정**: 파일, 폴더, Git 변경분, 터미널 출력 등을 컨텍스트로 붙여 질문하고 수정시킵니다.
- **스펙 주도 개발 (Specs)**: 기능 요구사항을 문서로 먼저 합의하고, 설계와 작업 목록을 만든 뒤 작업 단위로 구현합니다. → [Specs](/features/specs)
- **프로젝트 규칙 주입 (Steering)**: 팀 코딩 규칙, 기술 스택, 프로젝트 구조를 마크다운 파일로 남겨 두면 에이전트가 참고합니다. → [Steering](/features/steering)
- **자동화 (Hooks)**: 파일 저장, 스펙 작업 시작 같은 이벤트에 맞춰 명령이나 에이전트 지시를 실행합니다. → [Hooks](/features/hooks)
- **외부 도구 연결 (MCP)**: Model Context Protocol 서버를 붙여 문서 검색, 이슈 트래커, DB 조회 등을 에이전트 도구로 씁니다. → [MCP](/features/mcp)
- **역할별 에이전트 (Custom agents)**: 리뷰 전용, 문서 작성 전용처럼 도구 권한과 지시문을 묶은 에이전트를 만듭니다. → [Custom agents](/features/custom-agents)

## Amazon Q Developer와의 관계

Kiro CLI는 **Amazon Q Developer CLI의 후속 제품**입니다. 공식 이전 가이드는 Kiro CLI가 Q Developer CLI와 하위 호환되며, 기존 Amazon Q 규칙과 설정을 계속 쓸 수 있다고 설명합니다. 또한 AWS는 Amazon Q Developer IDE 플러그인 지원을 **2027년 4월 30일**에 종료한다고 공지했습니다.

Q Developer를 쓰고 있었다면 [부록: Q Developer에서 이전하기](/appendix/q-developer-migration)를 먼저 읽어 보세요.

## 다음 단계

1. [IDE · CLI · Web 차이](./ide-cli-web.md)로 어떤 형태부터 쓸지 정합니다.
2. [스펙 주도 개발](./spec-driven.md) 개념을 짧게 익힙니다.
3. [IDE 설치](/start/install-ide) 또는 [CLI 설치](/start/install-cli)로 넘어갑니다.
