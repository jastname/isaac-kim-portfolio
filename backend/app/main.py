import os
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

from app.db import Base, SessionLocal, engine
from app.models.project import Project
from app.routers import auth, projects


def _seed_data(db) -> None:
    """DB가 비어있으면 샘플 프로젝트 3개를 삽입한다."""
    if db.query(Project).count() > 0:
        return

    samples = [
        Project(
            title="사내 LLM 지식 검색 플랫폼",
            summary="사내 문서 30만 건 대상 RAG 파이프라인 설계 및 구축. LLM 기반 의미 검색으로 검색 정확도를 대폭 향상시킨 엔터프라이즈 AI 서비스.",
            results="검색 정확도 +13%p (78%→91%)",
            tech_stack="Python,FastAPI,LangChain,Qdrant,Kubernetes",
            status="LIVE",
            image_url="",
            detail_content=(
                "뉴럴웍스 AI 플랫폼팀에서 주도한 사내 지식 검색 서비스입니다. "
                "30만 건의 사내 문서를 Qdrant 벡터 DB에 임베딩하고, "
                "LangChain 기반 RAG 파이프라인으로 LLM 응답의 근거를 문서에서 직접 추출합니다. "
                "FastAPI로 LLM 게이트웨이를 구축해 일 평균 12만 요청을 안정적으로 처리하며, "
                "Kubernetes에서 수평 확장 가능한 구조로 운영합니다. "
                "검색 정확도가 78%에서 91%로 13%p 향상되었고, "
                "Prometheus / Grafana 기반 응답 품질 및 비용 모니터링 대시보드도 함께 구축했습니다."
            ),
        ),
        Project(
            title="vLLM 서빙 최적화 & 모니터링",
            summary="vLLM 기반 모델 서빙 인프라 최적화로 추론 지연 시간(p95)을 2.1s에서 0.7s로 단축. Prometheus / Grafana 기반 LLM 비용 모니터링 대시보드 구축.",
            results="p95 추론 지연 -67% (2.1s→0.7s)",
            tech_stack="vLLM,FastAPI,Prometheus,Grafana,Kubernetes",
            status="LIVE",
            image_url="",
            detail_content=(
                "뉴럴웍스에서 운영 중인 LLM 서빙 인프라의 성능 병목을 해결한 프로젝트입니다. "
                "vLLM의 PagedAttention 및 연속 배치(Continuous Batching) 기능을 활용해 "
                "GPU 메모리 효율을 최대화하고, 동시 처리 성능을 크게 향상시켰습니다. "
                "p95 추론 지연 시간이 2.1초에서 0.7초로 67% 단축되었으며, "
                "Prometheus 메트릭 수집과 Grafana 대시보드를 통해 "
                "토큰 처리량, 응답 품질(BLEU/ROUGE), API 호출 비용을 실시간 모니터링합니다. "
                "Kubernetes HPA(수평 Pod 자동 확장)를 연동해 트래픽 급증 시 자동 대응합니다."
            ),
        ),
        Project(
            title="이커머스 상품 추천 엔진",
            summary="협업 필터링 + 딥러닝 하이브리드 추천 모델 개발 및 A/B 테스트로 클릭률(CTR) 14% 향상. MLflow 기반 실험 추적 및 Airflow 배치 파이프라인 자동화.",
            results="CTR +14%",
            tech_stack="PyTorch,MLflow,Airflow,Docker,AWS SageMaker",
            status="LIVE",
            image_url="",
            detail_content=(
                "데이터브릿지 ML 플랫폼팀에서 진행한 이커머스 상품 추천 시스템 개선 프로젝트입니다. "
                "기존 규칙 기반 추천을 협업 필터링(CF)과 PyTorch 딥러닝 모델의 하이브리드 방식으로 전환했습니다. "
                "A/B 테스트를 통해 클릭률(CTR)이 14% 향상됨을 검증했으며, "
                "MLflow로 모델 버전 관리 및 실험 추적 체계를 구축해 팀 재현성을 확보했습니다. "
                "Airflow DAG으로 일 단위 배치 학습 파이프라인을 자동화하고, "
                "모델 드리프트 탐지 로직을 도입해 성능 저하를 사전에 감지하는 체계를 마련했습니다. "
                "AWS SageMaker로 모델 훈련 및 배포를 관리합니다."
            ),
        ),
    ]

    db.add_all(samples)
    db.commit()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    # 시작: 테이블 생성 및 시드 데이터 삽입
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        _seed_data(db)
    finally:
        db.close()
    yield
    # 종료: 특별한 정리 작업 없음


app = FastAPI(
    title="Portfolio.OS API",
    description="1인 포트폴리오 풀스택 웹앱 백엔드 API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS 설정
cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:5173")
cors_origins = [origin.strip() for origin in cors_origins_env.split(",")]
# 개발 편의를 위해 localhost:3000 및 와일드카드 추가
extra_origins = ["http://localhost:5173", "http://localhost:3000"]
all_origins = list(set(cors_origins + extra_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 단계에서는 전체 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(auth.router)
app.include_router(projects.router)


@app.get("/", tags=["health"])
def root() -> dict:
    return {"message": "Portfolio.OS API is running", "docs": "/docs"}


@app.get("/health", tags=["health"])
def health_check() -> dict:
    return {"status": "ok"}
