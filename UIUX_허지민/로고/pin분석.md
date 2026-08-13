# 🔍 A:FIT 레퍼런스 분석 및 Flow 프롬프트 생성 가이드라인 (pin분석.md)

## 1. 레퍼런스 분석 개요
- **대상**: `로고/output/` 폴더에 수집 완료된 레퍼런스 이미지 (`.jpg`)
- **목적**: 수집된 레퍼런스 이미지의 조형, 구도, 그래픽 요소를 분석하여 AI 이미지 생성 도구(Flow)용 고품질 단일 로고 영문 프롬프트 도출

## 2. Flow 프롬프트 작성 규칙
1. **단일 로고 전용 표현**: 프롬프트 작성 시 그리드/작도선 관련 키워드(`grid`, `construction lines`, `guides`, `blueprint`)를 완전히 제외하고, 단일 독립 로고(`standalone minimalist logo icon`, `isolated clean symbol`)로 작성
2. **부정 프롬프트(Negative Prompt) 적용**: 그리드 생성을 차단하기 위해 `no grid lines, no construction lines, no guides, no background lines, no 3D rendering` 수칙 명시
3. **영문 작성 원칙**: 모든 프롬프트는 100% 영문(English)으로 작성
4. **중복 실행 방지**: 이미 분석 및 처리가 완료된 이미지는 사용자가 **"재실행"** 명령을 입력하기 전까지 다시 작성하거나 재처리하지 않음

## 3. 출력 파일 및 작성 양식
- **저장 위치**: `로고/output/flow.md`
- **작성 포맷**: 레퍼런스 이미지 파일명(예: `# 유사_로고_1.jpg`)을 대제목(`#`)으로 작성하고, 하단에 그리드 없는 순수 단일 로고 영문 프롬프트 기술

#### 작성 예시 (`로고/output/flow.md`)
```markdown
# 유사_로고_1.jpg

A standalone minimalist geometric monogram logo design of capital letter 'A' with a clean curved loop. Pure flat 2D vector style, solid monochrome black graphic icon isolated on a pure white background (#FFFFFF), modern sleek aesthetics, no grid lines, no construction lines, no background patterns, no 3D rendering.
```
