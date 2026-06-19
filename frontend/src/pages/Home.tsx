import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const techStack = [
  { icon: 'terminal', label: 'Python' },
  { icon: 'psychology', label: 'PyTorch' },
  { icon: 'auto_awesome', label: 'LangChain' },
  { icon: 'speed', label: 'vLLM' },
  { icon: 'api', label: 'FastAPI' },
  { icon: 'hub', label: 'Kubernetes' },
  { icon: 'cloud', label: 'AWS' },
  { icon: 'monitoring', label: 'MLflow' },
  { icon: 'storage', label: 'Qdrant' },
  { icon: 'bar_chart', label: 'Grafana' },
];

const metrics = [
  { value: '5년+', label: 'AI 엔지니어링 경력' },
  { value: '91%', label: 'RAG 검색 정확도 달성' },
  { value: '-67%', label: 'LLM 추론 지연 단축' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      <main className="pt-32 pb-stack-lg max-w-[1200px] mx-auto px-margin-desktop">
        {/* Hero Section */}
        <div className="grid grid-cols-12 gap-gutter mb-stack-lg">
          {/* Identity & Intro */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-center">
            <span
              className="text-on-secondary-container font-semibold uppercase tracking-widest mb-base"
              style={{ fontSize: '14px', letterSpacing: '0.05em' }}
            >
              AI Engineer · LLM / MLOps
            </span>
            <h1
              className="text-primary mb-stack-sm"
              style={{
                fontSize: '48px',
                lineHeight: '56px',
                letterSpacing: '-0.02em',
                fontWeight: 800,
              }}
            >
              김이삭
            </h1>
            <h2
              className="text-on-primary-container mb-stack-md"
              style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 600 }}
            >
              Isaac Kim · Senior AI Engineer
            </h2>
            <p
              className="text-on-surface-variant max-w-2xl mb-stack-md"
              style={{ fontSize: '18px', lineHeight: '28px' }}
            >
              5년 차 AI 엔지니어로, LLM 기반 서비스의 설계부터 운영까지 전 주기를 담당합니다.
              RAG 파이프라인 구축, 모델 파인튜닝, Kubernetes 기반 모델 서빙 인프라 운영에
              강점이 있으며, MLOps 자동화를 통해 안정적이고 재현 가능한 AI 시스템을 구축합니다.
            </p>
            <div className="flex flex-wrap gap-stack-sm">
              <button
                onClick={() => navigate('/projects')}
                className="bg-on-tertiary-fixed-variant text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 active:scale-95"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                View Projects
              </button>
              <button
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-surface-container-low active:scale-95"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                Download Resume
              </button>
            </div>
          </div>

          {/* Profile Visual */}
          <div className="col-span-12 lg:col-span-4 relative group">
            <div className="w-full aspect-square rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container">
              <img
                src="https://api.dicebear.com/9.x/lorelei/svg?seed=IsaacKim&backgroundColor=e8f0fe&radius=0"
                alt="김이삭 프로필"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary-container rounded-lg -z-10 opacity-50 blur-xl" />
          </div>
        </div>

        {/* Metric Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="tonal-card p-stack-md rounded-lg flex flex-col items-center text-center"
            >
              <span
                className="text-secondary mb-base"
                style={{ fontSize: '36px', lineHeight: '44px', fontWeight: 700 }}
              >
                {m.value}
              </span>
              <span
                className="text-on-surface-variant uppercase tracking-tighter font-semibold"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <section className="mb-stack-lg">
          <div className="flex items-center gap-base mb-stack-md">
            <div className="h-[2px] w-12 bg-primary" />
            <h3
              className="text-primary"
              style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}
            >
              Technical Ecosystem
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-stack-sm">
            {techStack.map(({ icon, label }) => (
              <div
                key={label}
                className="bg-surface-container p-base rounded-lg flex items-center gap-stack-sm border border-outline-variant/20 hover:border-primary transition-colors"
              >
                <span className="material-symbols-outlined text-primary">{icon}</span>
                <span
                  className="text-on-primary-fixed-variant font-semibold"
                  style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
