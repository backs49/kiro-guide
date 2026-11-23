---
sources:
  - https://kiro.dev/changelog/ide/1-5/
  - https://kiro.dev/docs/ide/remote-development/ssh/
  - https://kiro.dev/docs/ide/remote-development/dev-containers/
  - https://kiro.dev/docs/ide/remote-development/cloud-sessions/
---

# 원격 개발 (SSH · Dev Containers · 클라우드 세션)

<span class="level">L2</span> IDE 1.5.11(2026-11-20)부터 Kiro IDE에서 **원격 Linux 서버, Dev Container, 클라우드 세션**에 직접 연결할 수 있습니다. 편집기 화면은 내 PC에 두고, 파일·터미널·에이전트는 원격에서 실행됩니다. 연결을 끊어도 원격의 에이전트는 계속 작업합니다.

| 방식 | 명령 | 실행 위치 |
|------|------|-----------|
| Remote SSH | 명령 팔레트 → **Kiro: Connect to Host…** | 내가 관리하는 Linux 서버 |
| Dev Containers | 명령 팔레트 → **Dev Containers: Reopen in Container** | 로컬 또는 SSH 호스트의 Docker 컨테이너 |
| 클라우드 세션 | Sessions 화면에서 세션의 **Open in IDE** | Kiro가 관리하는 클라우드 샌드박스 → [IDE · CLI · Web 차이](/intro/ide-cli-web) |

## Remote SSH

### 원격 호스트 요구사항

- **Linux x64 또는 ARM64, glibc 2.28 이상**
- 홈 디렉터리 파일 시스템에 **4 GiB 이상** 여유 공간, 다른 사용자가 쓸 수 없는 홈 디렉터리
- `/bin/sh`와 `stat`, `which`, `flock`, `tar`, `gzip`, `sha256sum`, `diff`, `find`, `id`, `sort`, `readlink`
- Kiro 다운로드·인증·서비스 엔드포인트로 나가는 HTTPS 접근
- 먼저 일반 `ssh` 접속이 되어야 합니다. Kiro가 원격 구성 요소를 직접 설치하므로 호스트에 Kiro CLI나 Node.js를 따로 설치할 필요는 없습니다.

### 연결하기

1. 명령 팔레트에서 **Kiro: Connect to Host…** 를 실행합니다.
2. 설정된 호스트를 고르거나 **Enter SSH Destination…** 에 `user@host`를 입력합니다. 자주 쓰는 호스트는 **Add New SSH Host…** 로 SSH config 파일에 저장합니다.
3. 호스트 지문을 확인하고 SSH 인증을 마칩니다.
4. 새 창에서 폴더를 열고 **워크스페이스 신뢰**를 승인한 뒤, 요청하면 로그인합니다.
5. 끝낼 때는 **Kiro: Close Remote Connection**. 다시 열 때는 Connect to Host 또는 File → Open Recent를 씁니다.

### 주의할 점

- 원격 창은 **로그인과 채팅 기록이 따로**입니다. 로컬 창의 채팅은 보이지 않습니다.
- 원격 작업은 호스트와 원격 에이전트가 살아 있는 동안 유지됩니다. 호스트를 끄면 진행 중인 작업이 끊길 수 있습니다.
- `ProxyJump`는 8단계까지 지원합니다. `ProxyJump` 뒤의 `ProxyCommand`, `Match exec`, `ProxyUseFdpass`는 지원하지 않습니다.
- 프록시가 필요한 회사 네트워크라면 `kiroRemote.httpProxy`, `kiroRemote.httpsProxy` 설정을 씁니다.

::: danger 운영 서버에 바로 붙이지 마세요
원격 창의 에이전트는 **그 서버에서 내 계정 권한으로** 명령을 실행합니다. 개발·스테이징 서버를 쓰고, [Permissions](/features/permissions)에서 위험한 명령을 `deny`로 막아 두세요.
:::

## Dev Containers

- 프로젝트에 `.devcontainer/devcontainer.json` 또는 `.devcontainer.json`이 있어야 합니다.
- 컨테이너는 Linux x64/ARM64(glibc)이고 `tar`가 있어야 합니다.
- **로컬**에서 열 때는 Docker 호환 엔진이 실행 중이어야 합니다. 사용할 CLI는 `kiroDevContainers.dockerPath`(기본 `docker`)로 바꿀 수 있습니다.
- **SSH 호스트**에서 열 때는 호스트에 Docker가 있고 원격 PATH에 `docker`가 있으면 됩니다. 내 PC에는 Docker가 필요 없습니다.
- 관련 명령: **Dev Containers: Rebuild Container**, **Show Container Log**, **Reopen Folder on the Remote Machine**.
- `initializeCommand`는 컨테이너 밖(내 PC 또는 SSH 호스트)에서 실행되며 신뢰 확인 화면에 표시됩니다. 받은 저장소라면 내용을 읽고 신뢰하세요.
- 포트는 기본적으로 `127.0.0.1`로 전달됩니다.

## 클라우드 세션을 IDE에서 열기

Sessions 화면에서 클라우드 세션의 **Open in IDE**를 누르면 새 Kiro 창이 열리고, 이미 실행 중인 에이전트에 채팅이 연결됩니다. IDE 1.4.215부터 유럽(프랑크푸르트) 리전 프로필도 IDE에서 클라우드 세션을 쓸 수 있습니다.
