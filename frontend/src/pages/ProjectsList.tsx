import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getProjects, type Project } from '../api/client';

// 백엔드 연결 전 사용할 목업 데이터
const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'OmniChannel Enterprise Dashboard',
    summary: 'Centralizing fragmented data silos into a unified real-time monitoring suite for Fortune 500 logistics.',
    results: '+34% Efficiency',
    tech_stack: 'React,GraphQL,Node.js',
    image_url: '',
    status: 'LIVE',
    detail_content: '',
    created_at: '',
    updated_at: '',
  },
  {
    id: 2,
    title: 'Cloud Infrastructure Migration',
    summary: 'Architecting a zero-downtime transition to serverless for a global fintech platform.',
    results: '-40% Cost',
    tech_stack: 'AWS,Terraform',
    image_url: '',
    status: 'LIVE',
    detail_content: '',
    created_at: '',
    updated_at: '',
  },
  {
    id: 3,
    title: 'NeoBank Mobile App',
    summary: 'Designing a friction-less onboarding experience for Gen-Z wealth management.',
    results: '4.9/5',
    tech_stack: 'Swift,Figma',
    image_url: '',
    status: 'LIVE',
    detail_content: '',
    created_at: '',
    updated_at: '',
  },
  {
    id: 4,
    title: 'Predictive Analytics Engine',
    summary: 'Custom ML model for predicting supply chain disruptions before they happen.',
    results: '+22% Sales',
    tech_stack: 'Python,PyTorch',
    image_url: '',
    status: 'LIVE',
    detail_content: '',
    created_at: '',
    updated_at: '',
  },
  {
    id: 5,
    title: 'Smart Workspace IoT',
    summary: 'Connecting physical office sensors to a central facility management API.',
    results: '15 min',
    tech_stack: 'MQTT,Go',
    image_url: '',
    status: 'LIVE',
    detail_content: '',
    created_at: '',
    updated_at: '',
  },
];

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const navigate = useNavigate();
  const tags = project.tech_stack.split(',').map((t) => t.trim());

  if (featured) {
    return (
      <article
        className="md:col-span-8 group relative bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row cursor-pointer"
        style={{ boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
        onClick={() => navigate(`/projects/${project.id}`)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.08)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = '';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.05)';
        }}
      >
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-tertiary-container text-on-tertiary-container rounded-full font-semibold text-xs">
            <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            Featured
          </div>
        </div>

        {/* Image placeholder */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-surface-variant flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '64px' }}>
            image
          </span>
        </div>

        <div className="w-full md:w-1/2 p-stack-md flex flex-col justify-between">
          <div>
            <h3
              className="text-primary mb-2"
              style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 600 }}
            >
              {project.title}
            </h3>
            <p className="text-on-surface-variant mb-6" style={{ fontSize: '16px', lineHeight: '24px' }}>
              {project.summary}
            </p>
            <div className="mb-6">
              <div className="text-secondary" style={{ fontSize: '36px', lineHeight: '44px', fontWeight: 700 }}>
                {project.results}
              </div>
              <div
                className="text-on-surface-variant uppercase tracking-wider font-semibold"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                Key Result
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((t) => (
                <span
                  key={t}
                  className="bg-surface-container-high px-3 py-1 rounded text-primary font-semibold"
                  style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <button
            className="flex items-center gap-2 text-on-tertiary-container font-semibold hover:underline decoration-2 underline-offset-4 w-fit"
            style={{ fontSize: '14px', letterSpacing: '0.05em' }}
          >
            View Case Study
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      className="md:col-span-4 group bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col cursor-pointer"
      style={{ boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
      onClick={() => navigate(`/projects/${project.id}`)}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.08)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.05)';
      }}
    >
      <div className="aspect-video relative overflow-hidden bg-surface-variant flex items-center justify-center">
        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '48px' }}>
          image
        </span>
      </div>
      <div className="p-stack-md flex-grow flex flex-col justify-between">
        <div>
          <h3
            className="text-primary mb-2"
            style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}
          >
            {project.title}
          </h3>
          <p className="text-on-surface-variant mb-4" style={{ fontSize: '16px', lineHeight: '24px' }}>
            {project.summary}
          </p>
          <div className="mb-4">
            <div className="text-secondary" style={{ fontSize: '36px', lineHeight: '44px', fontWeight: 700 }}>
              {project.results}
            </div>
            <div
              className="text-on-surface-variant uppercase tracking-wider font-semibold"
              style={{ fontSize: '14px', letterSpacing: '0.05em' }}
            >
              Key Result
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <div className="flex gap-2 flex-wrap">
            {tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-on-primary-fixed-variant font-semibold"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                {t}
              </span>
            ))}
          </div>
          <span className="material-symbols-outlined text-primary">arrow_forward</span>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => {
        setError('백엔드에 연결할 수 없어 목업 데이터를 표시합니다.');
        setProjects(MOCK_PROJECTS);
      })
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...rest] = projects;

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      <main className="pt-32 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto">
        {/* Hero */}
        <section className="mb-stack-lg">
          <div className="flex flex-col gap-base max-w-2xl">
            <span
              className="font-semibold text-on-secondary-container bg-secondary-container px-3 py-1 rounded-full w-fit"
              style={{ fontSize: '14px', letterSpacing: '0.05em' }}
            >
              SELECTED WORKS
            </span>
            <h1
              className="text-primary"
              style={{ fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: 800 }}
            >
              Strategic Engineering &amp; Design
            </h1>
            <p className="text-on-surface-variant" style={{ fontSize: '18px', lineHeight: '28px' }}>
              A collection of performance-driven solutions focused on scalability, user impact, and technical excellence.
            </p>
          </div>
        </section>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-secondary" style={{ fontSize: '48px' }}>
              progress_activity
            </span>
          </div>
        )}

        {error && (
          <div className="mb-stack-md px-4 py-3 bg-error-container text-error rounded-lg text-sm">
            {error}
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {featured && <ProjectCard project={featured} featured />}
            {rest.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}

        {/* CTA */}
        <section className="mt-stack-lg p-stack-lg bg-primary-container rounded-xl text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-stack-sm max-w-xl mx-auto">
            <h2
              className="text-surface-container-lowest"
              style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: 700 }}
            >
              Interested in collaborating?
            </h2>
            <p className="text-on-primary-container" style={{ fontSize: '18px', lineHeight: '28px' }}>
              Currently accepting select projects for Q4 2024. Let's discuss how technical precision can drive your
              next success metric.
            </p>
            <div className="flex gap-gutter mt-4">
              <button
                className="px-8 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-semibold hover:-translate-y-0.5 transition-transform shadow-lg"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                Start a Conversation
              </button>
              <button
                className="px-8 py-3 border border-outline-variant text-surface-container-lowest rounded-lg font-semibold hover:bg-surface-container-lowest/10 transition-colors"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                Download Resume
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
