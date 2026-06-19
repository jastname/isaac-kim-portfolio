# Portfolio.OS — 김이삭 AI Engineer Portfolio

> **🔗 라이브 데모**: [https://frontend-ah3pdakq0-just10.vercel.app](https://frontend-ah3pdakq0-just10.vercel.app)
>
> **🔗 백엔드 API**: [https://backend-production-3810.up.railway.app](https://backend-production-3810.up.railway.app)

---

## 프로젝트 소개

5년 차 AI 엔지니어 김이삭(Isaac Kim)의 포트폴리오 풀스택 웹앱입니다.  
LLM / RAG / MLOps 프로젝트 케이스 스터디와 경력 타임라인을 담고 있으며,  
관리자 페이지에서 프로젝트를 실시간으로 추가·수정·삭제할 수 있습니다.

### 주요 페이지

| 라우트 | 설명 |
|--------|------|
| `/` | Hero 섹션 · 성과 메트릭 · 기술스택 칩 |
| `/about` | 경력 타임라인 · 수상 이력 · 연락처 |
| `/projects` | Bento 그리드 프로젝트 목록 |
| `/projects/:id` | 케이스 스터디 상세 |
| `/admin/login` | 관리자 인증 |
| `/admin` | 프로젝트 CRUD 대시보드 |

---

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| 프론트엔드 | TypeScript · React 19 · Vite · Tailwind CSS |
| 백엔드 | Python 3.11 · FastAPI · SQLAlchemy 2.x |
| 인증 | JWT (python-jose, 24h 만료) |
| DB (개발) | SQLite3 |
| DB (프로덕션) | PostgreSQL (Railway 자동 주입) |
| 배포 | Vercel (프론트) · Railway (백엔드 + DB) |

---

## 로컬 실행

### 백엔드

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt

# 환경변수 설정 (선택 — 기본값으로도 동작)
cp .env.example .env   # 또는 아래 값을 직접 작성

uvicorn app.main:app --reload
# http://localhost:8000
```

`.env` 예시:
```env
DATABASE_URL=sqlite:///./dev.db
SECRET_KEY=your-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password-here
CORS_ORIGINS=http://localhost:5173
```

### 프론트엔드

```bash
cd frontend
npm install

# 환경변수 설정
echo "VITE_API_URL=http://localhost:8000" > .env.local

npm run dev
# http://localhost:5173
```

---

## 관리자 로그인

| 항목 | 기본값 |
|------|--------|
| Username | `admin` |
| Password | `admin123` (프로덕션에서는 환경변수로 변경) |

---

## 프로젝트 구조

```
.
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   └── vercel.json
├── backend/           # FastAPI
│   ├── app/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   └── db.py
│   ├── requirements.txt
│   └── railway.json
└── design/            # 디자인 목업 (읽기 전용)
```

---

## 배포

### Railway (백엔드)
- Root: `backend/`
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- 환경변수: `DATABASE_URL` (PostgreSQL 자동 주입), `SECRET_KEY`, `ADMIN_PASSWORD`, `CORS_ORIGINS`

### Vercel (프론트엔드)
- Root: `frontend/`
- Build: `npm run build`
- 환경변수: `VITE_API_URL` = Railway 백엔드 URL
