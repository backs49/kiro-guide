---
sources:
  - https://kiro.dev/docs/workflows/
  - https://kiro.dev/docs/workflows/manage/
  - https://kiro.dev/docs/workflows/authoring/
  - https://kiro.dev/blog/introducing-workflows/
  - https://kiro.dev/changelog/ide/1-4-86/
  - https://kiro.dev/changelog/ide/1-4-121/
  - https://kiro.dev/changelog/cli/3-1/
---

# Workflows

<span class="level">L3</span> Workflow는 여러 에이전트 단계를 **순차·병렬·반복**으로 엮어 백그라운드에서 실행하는 **다단계 작업 계획**입니다. 같은 Workflow 런타임이 IDE, CLI, Web에서 공통으로 동작합니다.

## 언제 쓰나

| 상황 | 추천 |
|------|------|
| 한 기능을 요구사항부터 합의하며 만들기 | [Specs](./specs.md) |
| 정해진 절차를 여러 단계로 자동 실행 (예: 모듈별 테스트 보강을 병렬로) | **Workflow** |
| 단계 없이 한 번에 끝나는 절차 | [Skill](./skills.md) |

## 동작 방식

- Kiro가 작업에 맞는 Workflow 초안을 만들 수 있습니다.
- 검토한 정의를 재사용하고 싶으면 **`.kiro/workflows/`** 에 저장합니다. 저장한 레시피 파일은 IDE·CLI·Web에서 같은 파일을 씁니다.
- 클라이언트마다 켜는 방법과 제어 화면은 다릅니다.

## IDE에서

1. 먼저 **설정에서 Workflow를 켭니다.**
2. Kiro가 단계를 제안하면 실행 전에 **검토**를 요청합니다(저장된 권한 결정이 있으면 생략).
3. 부모 채팅에서 저장된 레시피를 실행해 달라고 요청한 뒤, **Workflows 패널**에서 단계를 따라갑니다.

최근 IDE 변경:

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.4.26 | 2026-10-22 | 채팅에서 Kiro가 Workflow를 시작하는 빈도 조절 |
| 1.4.86 | 2026-11-02 | Workflow 실행을 **별도 탭**으로 열어 단계 트리와 선택한 단계의 대화 기록을 나란히 표시 |
| 1.4.121 | 2026-11-05 | Workflow Runs 화면에 **검색** 추가, 실행 카드 간소화 |

## CLI에서

```text
/workflow run <작업 설명>   # Workflow 실행
/workflow list              # 실행 목록
/workflow history           # 실행 기록
```

- CLI 2.33.1 이상에서는 Workflow 기능을 켜도 저절로 실행되지 않고, **요청할 때만** 실행됩니다.
- 3.1.0부터 Workflow 단계 행에 사용한 크레딧이 표시됩니다.
- V3 하네스에서는 워크스페이스를 신뢰하기 전까지 그 폴더의 Workflow 파일을 로드하지 않습니다.

## 비용

Workflow도 다른 에이전트 작업과 같은 크레딧을 씁니다. 단계가 많거나 병렬 가지가 많을수록 크레딧을 더 씁니다. 처음에는 작은 범위로 실행해 단계당 사용량을 확인하세요. → [요금과 크레딧](/pricing/)

::: warning TODO(확인 필요)
- `.kiro/workflows/` 레시피 파일의 형식(파일 확장자, 단계·병렬·반복 정의 문법).
- IDE에서 Workflow를 켜는 설정 이름.

[Author workflows 문서](https://kiro.dev/docs/workflows/authoring/)를 확인한 뒤 예시를 추가할 예정입니다.
:::
