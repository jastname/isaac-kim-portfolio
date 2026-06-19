import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const experiences = [
  {
    title: 'AI Engineer (Senior)',
    company: '㈜뉴럴웍스 · AI 플랫폼팀',
    period: '2023.04 — 재직 중',
    current: true,
    bullets: [
      '사내 문서 30만 건 대상 RAG 파이프라인 설계 및 구축 (검색 정확도 78% → 91%)',
      'FastAPI + LangChain 기반 LLM 게이트웨이 구축 — 일 평균 12만 요청 처리',
      'vLLM 기반 모델 서빙 최적화로 추론 지연 시간(p95) 2.1s → 0.7s 단축',
      'Prometheus / Grafana 기반 LLM 응답 품질 및 비용 모니터링 대시보드 구축',
    ],
  },
  {
    title: 'Machine Learning Engineer',
    company: '데이터브릿지㈜ · ML 플랫폼팀',
    period: '2021.01 — 2023.03',
    current: false,
    bullets: [
      '이커머스 상품 추천 모델(CF + 딥러닝) 개발 및 A/B 테스트로 CTR 14% 향상',
      'MLflow 기반 모델 레지스트리 및 실험 추적 환경 구축 — 팀 재현성 확보',
      'Airflow를 활용한 일 단위 배치 학습 파이프라인 자동화',
      '모델 드리프트 탐지 로직 도입으로 성능 저하 사전 대응 체계 마련',
    ],
  },
  {
    title: 'AI Research Intern',
    company: '㈜코어AI랩',
    period: '2020.06 — 2020.12',
    current: false,
    bullets: [
      'NLP 텍스트 분류 모델(BERT 파인튜닝) 프로토타입 개발 및 성능 벤치마킹',
      '데이터 라벨링 가이드라인 작성 및 학습 데이터 전처리 파이프라인 구현',
    ],
  },
];

const awards = [
  { icon: 'emoji_events', color: 'text-secondary', title: '전국 AI 해커톤', sub: '대상 · 2022.11' },
  { icon: 'workspace_premium', color: 'text-on-tertiary-container', title: '사내 기술혁신상', sub: 'RAG 프로젝트 · 2024.02' },
  { icon: 'leaderboard', color: 'text-primary', title: 'Kaggle NLP', sub: '상위 3% · 2021.07' },
  { icon: 'verified', color: 'text-on-tertiary-container', title: 'AWS ML Specialty', sub: 'Certified · 2022.05' },
];

export default function About() {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      <main className="pt-24 pb-stack-lg max-w-[1200px] mx-auto px-margin-desktop">
        {/* Profile Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center mb-stack-lg">
          <div className="md:col-span-5 relative group">
            <div className="aspect-square rounded-xl overflow-hidden bg-surface-container flex items-center justify-center"
              style={{ boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}
            >
              <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '120px' }}>
                person
              </span>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-secondary-container text-on-secondary-container px-stack-md py-stack-sm rounded-lg font-semibold text-sm"
              style={{ boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}
            >
              Available for Projects
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-stack-sm">
            <span
              className="text-on-primary-container tracking-widest uppercase font-semibold"
              style={{ fontSize: '14px', letterSpacing: '0.05em' }}
            >
              AI Engineer · LLM / MLOps
            </span>
            <h1
              className="text-primary leading-none"
              style={{ fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: 800 }}
            >
              김이삭
            </h1>
            <div className="flex items-center gap-base text-on-surface-variant mt-base">
              <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
              <span style={{ fontSize: '16px', lineHeight: '24px' }}>서울특별시 강남구</span>
            </div>
            <div className="flex gap-stack-sm mt-stack-md flex-wrap">
              {['LLM / RAG', 'MLOps', 'FastAPI', 'Kubernetes'].map((tag) => (
                <div
                  key={tag}
                  className="bg-surface-container-high px-stack-md py-base rounded-full text-primary font-semibold"
                  style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-stack-lg max-w-3xl">
          <h2
            className="mb-stack-md text-primary"
            style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: 700 }}
          >
            About Me
          </h2>
          <div className="space-y-stack-md text-on-surface-variant" style={{ fontSize: '18px', lineHeight: '28px' }}>
            <p>
              5년 차 AI 엔지니어로, LLM 기반 서비스의 설계부터 운영까지 전 주기를 담당해 왔습니다.
              RAG 파이프라인 구축, 모델 파인튜닝, Kubernetes 기반 모델 서빙 인프라 운영에
              강점이 있으며, Python 백엔드(FastAPI) 개발과 MLOps 자동화(CI/CD, 모델 레지스트리, 모니터링)를
              통해 안정적이고 재현 가능한 AI 시스템을 구축하는 데 집중합니다.
            </p>
            <p>
              한빛대학교 대학원 인공지능학과 석사(GPA 4.1/4.5) 출신으로,
              AWS Certified ML – Specialty, 정보처리기사, SQLD 자격증을 보유하고 있습니다.
              전국 AI 해커톤 대상, Kaggle NLP 대회 상위 3% 등의 성과로 실전 역량을 검증받았습니다.
            </p>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-stack-lg">
          <h2
            className="mb-stack-md text-primary"
            style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: 700 }}
          >
            Experience
          </h2>
          <div className="relative pl-gutter flex flex-col gap-stack-lg" style={{ borderLeft: '2px solid #E2E8F0' }}>
            {experiences.map((exp, i) => (
              <div key={i} className="relative flex flex-col gap-base">
                {/* Timeline node */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 12,
                    height: 12,
                    left: -29,
                    top: 16,
                    background: i === 0 ? '#000000' : '#c6c6cd',
                    border: i === 0 ? '3px solid #ffffff' : 'none',
                    boxShadow: i === 0 ? '0 0 0 2px #000000' : 'none',
                  }}
                />
                <div
                  className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/20 transition-all duration-300"
                  style={{ boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}
                >
                  <div className="flex justify-between items-start mb-stack-sm">
                    <div>
                      <h3
                        className="text-primary"
                        style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}
                      >
                        {exp.title}
                      </h3>
                      <p
                        className="text-on-surface-variant font-semibold"
                        style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                      >
                        {exp.company} • {exp.period}
                      </p>
                    </div>
                    {exp.current && (
                      <span className="bg-secondary-container text-on-secondary-container px-base py-1 rounded-full text-xs font-bold">
                        Current
                      </span>
                    )}
                  </div>
                  <ul className="space-y-base text-on-surface-variant list-disc pl-stack-md" style={{ fontSize: '16px', lineHeight: '24px' }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="mb-stack-lg">
          <h2
            className="mb-stack-md text-primary"
            style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: 700 }}
          >
            Awards &amp; Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {awards.map((a) => (
              <div
                key={a.title}
                className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/10 text-center group cursor-default"
                style={{ boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}
              >
                <div className={`mb-stack-sm ${a.color} group-hover:scale-110 transition-transform`}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '48px', fontVariationSettings: "'FILL' 1" }}
                  >
                    {a.icon}
                  </span>
                </div>
                <h4
                  className="text-primary mb-base"
                  style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}
                >
                  {a.title}
                </h4>
                <p
                  className="text-on-surface-variant font-semibold"
                  style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                >
                  {a.sub}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-primary text-on-primary rounded-xl p-stack-lg mb-stack-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-gutter">
            <div>
              <h2
                className="mb-stack-sm"
                style={{ fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: 800 }}
              >
                Let's connect.
              </h2>
              <p className="opacity-80 max-w-md" style={{ fontSize: '18px', lineHeight: '28px' }}>
                Open to high-impact collaborations and technical leadership roles.
              </p>
            </div>
            <div className="flex flex-col gap-stack-sm w-full md:w-auto">
              <a
                href="mailto:isaac.kim.ai@gmail.com"
                className="flex items-center gap-stack-sm bg-on-primary text-primary px-stack-md py-stack-sm rounded-lg hover:bg-surface-container-lowest transition-all group"
              >
                <span className="material-symbols-outlined">mail</span>
                <span className="font-semibold" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
                  isaac.kim.ai@gmail.com
                </span>
                <span className="material-symbols-outlined ml-auto md:ml-stack-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_outward
                </span>
              </a>
              <a
                href="https://github.com/isaac-kim-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-stack-sm border border-on-primary/30 text-on-primary px-stack-md py-stack-sm rounded-lg hover:bg-on-primary/10 transition-all group"
              >
                <span className="material-symbols-outlined">link</span>
                <span className="font-semibold" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
                  github.com/isaac-kim-ai
                </span>
                <span className="material-symbols-outlined ml-auto md:ml-stack-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_outward
                </span>
              </a>
            </div>
          </div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-on-tertiary-container/20 rounded-full blur-3xl" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
