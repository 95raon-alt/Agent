# A:FIT 로고 디자인 및 핀터레스트 레퍼런스 수집 가이드

## 1. 브랜드 기본 정보
- **로고 텍스트**: A:FIT
- **심볼 등장 요소**: 없음 (워드마크 / 텍스트 중심 로고)
- **브랜드 컨셉**: 2030 식비·시간을 아끼는 1:1 맞춤 영양 & 라벨 각인 이중제형 구독
- **비주얼 톤앤매너**: 미니멀, 모던, 세련됨, 신뢰감, 클린

## 2. 디자인 제약 조건 (Strict Constraints)
- **배경색**: 순수 흰색 (`#FFFFFF` / Clean White)
- **로고색**: 단색 검정 (`#000000` / Monochrome Black)
- **제형**: 2D 플랫 벡터 (Flat Vector Graphics)
- **단일 로고 원칙**: 작도선/그리드가 전혀 없는 순수 단일 로고 심볼(Clean Standalone Logo)만 수집 및 프롬프트화

### ⛔ 금지 사항 (Exclusions)
1. **그리드/작도선 포함 금지**: 모눈종이, 가이드라인, 원형 그리드, 휠선이 포함된 이미지 및 프롬프트 제외
2. **컬러 적용 금지**: 무채색(검정/흰색) 외 모든 색상이 포함된 디자인 제외
3. **목업(Mockup) 표현 금지**: 3D 용기/입체 목업, 질감 배경, 종이/명함/패브릭 질감 합성 디자인 제외
4. **독립 심볼/아이콘 금지**: 텍스트와 분리된 별도 심볼/마스코트/엠블럼 제외

## 3. 핀터레스트 추천 검색 쿼리 (4가지 다변화 컨셉)

### 3.1 웰니스 워드마크 & 액체 모노그램
- `modern wellness beverage wordmark logo black white`
- `clean health drink typography logo`
- `fluid organic monogram logo flat vector`
- `minimalist liquid supplement logo`

### 3.2 볼드 기하학 & 럭셔리 타이포그래피
- `bold geometric logo design flat vector`
- `minimalist angular logo black white`
- `luxury minimalist supplement logo design`
- `high-end clean brand identity vector`

## 4. 핀터레스트 레퍼런스 수집 검증 수칙 (Validation Checklist)
- [ ] 텍스트(A:FIT) 기반 워드마크 또는 정제된 단일 모노그램 형태인가?
- [ ] 배경이 깨끗한 흰색이며 로고가 검정 단색인가?
- [ ] 그리드선/작도선/가이드라인이 완전히 없는 깨끗한 단일 로고인가?
- [ ] 3D 입체 목업이나 실제 제품 합성이 아닌 순수 2D 플랫 그래픽인가?

## 5. 자동 레퍼런스 수집 파이프라인 수칙 (Automation Rules)
- **트리거 문구**: `"레퍼런스 수집 시작해"`
- **수집 절차**: 4가지 다변화 컨셉으로 그리드 없는 단일 로고 수집 및 `로고/output/` 폴더에 `.jpg` 저정을 완료합니다.

## 6. Flow 이미지 생성 프롬프트 작성 수칙 (Flow Prompt Generation Rules)
- **저장 위치**: `로고/output/flow.md`
- **수칙**: 100% 영문 작성 및 그리드 차단 부정 프롬프트(`no grid lines, no construction lines, no guides`) 적용
