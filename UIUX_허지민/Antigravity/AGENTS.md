# Repository Guidelines

## 프로젝트 구조 및 구성

이 저장소는 Codex 스킬과 홈페이지 리서치 자료로 구성된다.

- `.agents/skills/homepage-reference-analyzer/`: 프로젝트에서 자동 인식되는 스킬 폴더
- `SKILL.md`: 스킬 실행 조건, 작업 순서, 동작 범위
- `references/`: 입력, 분석, 출력 및 미확정 규칙
- `scripts/`: URL 수집·중복 정리 및 결과 검사 도구
- `agents/openai.yaml`: 사용자에게 표시되는 스킬 정보
- `리서치/`: 원본 리서치 자료. 파일명에 `[리서치 결과]`가 있으면 기본 자료로 사용
- `홈페이지_레퍼런스_분석_스킬_예상내용.txt`: 설계 메모. 확정된 동작과 내용이 일치하도록 관리

분석 과정에서 원본 리서치 파일을 수정하지 않는다. 생성한 목록과 보고서는 출력 폴더가 정해진 후 별도 위치에 저장한다.

## 개발 및 검사 명령어

별도의 빌드 시스템이나 패키지 설정은 없다. Python 3으로 직접 실행한다.

```powershell
python .agents\skills\homepage-reference-analyzer\scripts\collect_references.py .\리서치 --output .\reference-inventory.json
python .agents\skills\homepage-reference-analyzer\scripts\validate_results.py .\results\01_홈페이지별_분석_001-100.txt
python -m py_compile .agents\skills\homepage-reference-analyzer\scripts\*.py
```

스킬 구조는 시스템의 `quick_validate.py`로 검사한다. 이 명령은 현재 Python 환경에 PyYAML이 설치되어 있어야 한다.

## 작성 스타일 및 이름 규칙

Markdown, YAML, TXT, Python 파일은 UTF-8로 저장한다. Python은 공백 4칸 들여쓰기와 타입 힌트를 사용한다. 함수와 변수는 `snake_case`, 상수는 `UPPER_CASE`로 작성한다. 별도로 문서화하지 않은 외부 패키지는 추가하지 않는다.

스킬 폴더는 영문 소문자 kebab-case로 작성한다. `references/` 파일은 내용을 알 수 있는 영문 소문자 이름을 사용한다. `SKILL.md`에는 짧고 명령형인 핵심 절차만 두고, 상세 규칙과 예시는 직접 연결된 참조 파일로 분리한다.

## 시험 지침

현재 자동 시험 프레임워크와 커버리지 기준은 없다. 변경 전후로 Python 문법, `[리서치 결과]` 문자열 인식, 중복 URL, 잘못된 URL, 100개 초과 분할을 확인한다. 시험 결과는 임시 위치에 저장하고 원본 리서치 파일을 덮어쓰지 않는다.

4단계 분류 기준과 5단계 결과 양식은 아직 미확정이다. 두 기준이 정해지기 전에는 전체 분석이 완성됐다고 보고하지 않는다.

## 커밋 및 Pull Request 지침

현재 Git 기록이 없어 기존 커밋 규칙을 확인할 수 없다. 커밋은 `feat:`, `fix:`, `docs:`, `test:` 같은 접두사와 짧은 명령형 설명을 사용한다.

Pull Request에는 변경 목적, 수정한 경로, 대표 입력·출력 예시, 미확정 사항, 실행하지 않은 시험을 기록한다. 리서치 자료를 변경했다면 출처와 변경 이유도 명시한다.
