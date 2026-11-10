---
sources:
  - https://kiro.dev/docs/getting-started/first-project/
  - https://kiro.dev/docs/steering/
  - https://kiro.dev/docs/specs/
  - https://kiro.dev/docs/cli/setup/
---

# 첫 프로젝트 만들기

<span class="level">L0</span> 기존 Spring Boot 프로젝트를 Kiro로 열고, 프로젝트 규칙(Steering)을 만든 뒤 첫 질문과 첫 수정까지 해 봅니다.

## 준비물

- Kiro IDE 설치와 로그인 완료 → [IDE 설치](./install-ide.md), [로그인](./auth.md)
- 연습용 Spring Boot 프로젝트 (예: [start.spring.io](https://start.spring.io/)에서 `Spring Web`, `Spring Data JPA`, `Validation`을 넣어 생성한 `demo` 프로젝트)

::: tip 처음에는 연습용 프로젝트로
회사 실서비스 코드가 아니라 **연습용 프로젝트**로 시작하세요. 에이전트가 어떤 범위까지 파일을 수정하는지 감을 잡은 뒤 실제 프로젝트에 적용하는 것이 안전합니다.
:::

## 1. 프로젝트 폴더 열기

Kiro IDE에서 **File → Open Folder**로 프로젝트 루트(`build.gradle` 또는 `pom.xml`이 있는 폴더)를 엽니다.

Kiro는 프로젝트 루트의 `.kiro/` 폴더에 스펙, Steering, Hook 같은 설정을 저장합니다.

```text
demo/
├── .kiro/
│   ├── specs/       # 기능별 스펙 문서
│   ├── steering/    # 프로젝트 규칙 (마크다운)
│   ├── hooks/       # 자동화 Hook (JSON)
│   └── settings/
│       └── mcp.json # 워크스페이스 MCP 설정
├── src/
└── build.gradle
```

## 2. 기본 Steering 만들기

Kiro 패널의 **Steering** 영역에서 **Generate Steering Docs** 버튼을 누르거나, `+` 버튼 → **Foundation steering files**를 고르면 Kiro가 프로젝트를 분석해 `.kiro/steering/`에 다음 세 파일을 만듭니다.

| 파일 | 내용 |
|------|------|
| `product.md` | 제품의 목적, 대상 사용자, 주요 기능 |
| `tech.md` | 기술 스택, 프레임워크, 빌드 도구 |
| `structure.md` | 디렉터리 구조, 패키지 규칙, 아키텍처 |

생성된 내용을 열어 보고 틀린 부분(예: Java 버전, 패키지 규칙)을 직접 고치세요. 이 파일들은 **기본적으로 모든 대화에 포함**됩니다. 자세한 내용은 [Steering](/features/steering)을 보세요.

## 3. 첫 질문하기

채팅 패널에 다음과 같이 물어봅니다.

```text
#codebase 이 프로젝트의 패키지 구조와 주요 클래스를 설명해 줘.
```

`#codebase`는 Kiro가 프로젝트 전체에서 관련 파일을 찾아 참고하게 하는 컨텍스트 참조입니다. → [컨텍스트 참조](/ide/context)

## 4. 첫 수정 맡기기

작은 수정부터 맡겨 봅니다.

```text
(#file 로 DemoApplication.java 를 선택한 뒤)
GET /api/health 요청에 {"status":"UP"}을 반환하는 HealthController를 추가하고,
MockMvc 테스트도 함께 작성해 줘.
```

에이전트가 파일을 만들고 수정하면 변경 내용(diff)이 표시됩니다.

- **Autopilot 모드(기본)**: 에이전트가 수정을 바로 적용하고, 사용자는 결과를 검토해 되돌릴 수 있습니다.
- **Supervised 모드**: 파일 수정이 있는 턴마다 승인을 받습니다. 처음 쓸 때는 Supervised로 바꿔 두면 변경을 하나씩 확인하기 좋습니다. → [모델 · 에이전트 동작](/ide/models-and-modes)

## 5. 테스트로 확인

```bash
./gradlew test
# Maven이라면
./mvnw test
```

테스트가 실패하면 실패 로그를 붙여 다시 요청합니다.

```text
#terminal 테스트가 실패했어. 원인을 찾아서 고쳐 줘.
```

## 6. 다음은 스펙으로

작은 수정에 익숙해졌다면 다음 기능은 **스펙**으로 만들어 보세요.

- [Specs 사용법](/features/specs)
- [레시피: 기능 추가 스펙 작성](/recipes/feature-spec)

## CLI로 같은 흐름 해 보기

```bash
cd demo
kiro-cli
```

대화형 화면에서 질문하는 방식은 IDE와 같습니다. 명령과 단축키는 [대화형 TUI와 기본 명령](/cli/interactive)에서 다룹니다.
