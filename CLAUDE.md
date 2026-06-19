# CLAUDE.md

## 프로젝트 개요

**Portfolio.OS** — 1인 포트폴리오 풀스택 웹앱.
`design/` 폴더의 구글 스티치 목업(HTML + Tailwind)을 픽셀 단위 기준으로 삼아 구현한다.

## 기술 스택

| 레이어 | 기술 | 배포 |
|--------|------|------|
| 프론트엔드 | TypeScript + React 19 + Vite | Vercel |
| 백엔드 | Python 3.11 + FastAPI | Railway |
| DB 개발 / 배포 | SQLite3 / PostgreSQL | 로컬 / Railway |
| ORM | SQLAlchemy 2.x (`DATABASE_URL` 환경변수 하나로 전환) | — |

## 페이지 구조 (design/ 폴더명 → 라우트)

```
home_hero_*          /               Hero + 메트릭 카드 + 기술스택 칩
about_*              /about          경력 타임라인 + 스킬
projects_list_*      /projects       Bento 그리드 프로젝트 목록
project_detail_*     /projects/:id   케이스 스터디 상세
admin_login_*        /admin/login    관리자 인증 폼
admin_dashboard_*    /admin          프로젝트 CRUD 대시보드
```

## 디자인 토큰 요약 (DESIGN.md 기준)

- **폰트**: Inter 전용, headline-xl(48px/800) ~ label-md(14px/600)
- **Primary** `#000000` · **Secondary** `#006c49` (에메랄드) · **CTA** `#3980f4` (블루)
- **컨테이너**: max-width 1200px, 8px 베이스 그리드, 데스크탑 마진 48px
- **카드**: white + `shadow 0 4px 20px rgba(15,23,42,0.05)` + 호버 translateY(-2px) 300ms

## 디렉토리 구조

```
frontend/  src/{components, pages, api}   vite.config.ts
backend/   app/{models, schemas, routers, db.py}   tests/
design/    (읽기 전용 — 절대 수정 금지)
```

## 핵심 규칙

- **모든 답변은 한국어**
- **라이브러리 문법** → 구현 전 context7 MCP로 공식 문서 확인 후 사용
- **화면 점검** → playwright MCP로 실제 브라우저 렌더링 검증
- **기능 구현** → TDD: 테스트 먼저 작성 → 구현 → 검증 루프

## Karpathy 4원칙

1. **가정 명시** — 불확실하면 가정을 선언하고 진행, 나중에 검증
2. **단순함** — 필요한 것만 구현, 추상화 남발 금지
3. **외과적 수정** — 요청 범위 밖 코드는 건드리지 않음
4. **검증 루프** — 수정 후 테스트·브라우저로 반드시 확인

## 환경변수

```
# backend/.env
DATABASE_URL=sqlite:///./dev.db        # Railway에서 postgresql://... 자동 주입
CORS_ORIGINS=http://localhost:5173

# frontend/.env.local
VITE_API_URL=http://localhost:8000
```

## 배포 체크리스트

- [ ] Vercel: Root=`frontend/`, Build=`npm run build`
- [ ] Railway: Root=`backend/`, Start=`uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- [ ] Railway PostgreSQL 추가 → `DATABASE_URL` 자동 주입 확인
- [ ] Vercel `VITE_API_URL` = Railway 배포 URL
- [ ] `alembic upgrade head` 배포 전 실행
