import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getProject, type Project } from '../api/client';

const MOCK_PROJECT: Project = {
  id: 1,
  title: 'Neural Engine Interface',
  summary: 'A React-based WebGL dashboard that translates abstract tensor operations into intuitive 3D spatial maps.',
  results: '40% faster debugging cycles',
  tech_stack: 'TypeScript,React,Three.js,GLSL,Tailwind CSS,WebWorkers',
  image_url: '',
  status: 'LIVE',
  detail_content: `The core of the Neural Engine Interface was built using a custom rendering pipeline. By leveraging Three.js and raw GLSL shaders, we managed to render millions of data points at 60fps directly in the browser.

The state management utilizes a hybrid approach between Redux for global configuration and localized context for high-frequency coordinate updates. This ensured that the UI remained snappy even under intense computational load.`,
  created_at: '',
  updated_at: '',
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getProject(Number(id))
      .then(setProject)
      .catch(() => {
        setError('백엔드에 연결할 수 없어 목업 데이터를 표시합니다.');
        setProject(MOCK_PROJECT);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const tags = project?.tech_stack.split(',').map((t) => t.trim()) ?? [];

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar />

      <main className="pt-24 pb-stack-lg max-w-[1200px] mx-auto px-margin-desktop">
        {/* Back */}
        <div className="mb-stack-md">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all group"
          >
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform" style={{ fontSize: '18px' }}>
              arrow_back
            </span>
            <span className="font-semibold" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
              Back to Projects
            </span>
          </button>
        </div>

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

        {!loading && project && (
          <>
            {/* Header */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-stack-lg items-end">
              <div className="md:col-span-7">
                <div className="flex flex-wrap gap-stack-sm mb-base">
                  <span
                    className="font-semibold text-secondary border border-secondary/20 px-3 py-1 rounded-full bg-secondary-container/10"
                    style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                  >
                    Case Study
                  </span>
                  <span
                    className={`font-bold px-2 py-1 rounded text-xs ${
                      project.status === 'LIVE'
                        ? 'bg-secondary-container/30 text-on-secondary-container'
                        : 'bg-outline-variant/30 text-on-surface-variant'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <h1
                  className="mb-stack-sm"
                  style={{ fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: 800 }}
                >
                  {project.title}
                </h1>
              </div>
              <div className="md:col-span-5 flex md:justify-end gap-stack-sm">
                <a
                  href="#"
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-surface-container-low transition-all"
                  style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                >
                  <span className="material-symbols-outlined">code</span> GitHub
                </a>
                <a
                  href="#"
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-on-tertiary-fixed-variant text-on-primary rounded-lg font-semibold hover:opacity-90 transition-all"
                  style={{ fontSize: '14px', letterSpacing: '0.05em', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}
                >
                  <span className="material-symbols-outlined">rocket_launch</span> Live Demo
                </a>
              </div>
            </section>

            {/* Hero Image */}
            <div
              className="w-full h-64 md:h-[400px] rounded-xl overflow-hidden mb-stack-lg border border-outline-variant/30 bg-surface-variant flex items-center justify-center"
              style={{ boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}
            >
              <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '96px' }}>
                image
              </span>
            </div>

            {/* Problem / Solution / Results */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
              {[
                {
                  icon: 'crisis_alert',
                  iconClass: 'bg-error-container/20 text-error',
                  title: 'The Problem',
                  body: 'Data scientists were struggling with opaque neural network training processes. Visualizing high-dimensional loss functions in real-time remained a significant bottleneck in experimental velocity.',
                },
                {
                  icon: 'lightbulb',
                  iconClass: 'bg-secondary-container/20 text-on-secondary-container',
                  title: 'The Solution',
                  body: project.summary,
                },
                {
                  icon: 'analytics',
                  iconClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
                  title: 'The Results',
                  body: project.results,
                },
              ].map(({ icon, iconClass, title, body }) => (
                <div
                  key={title}
                  className="p-stack-md bg-surface-container-lowest rounded-xl border border-outline-variant/20 flex flex-col gap-stack-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={{ boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${iconClass}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                      {icon}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>{title}</h3>
                  <p className="text-on-surface-variant" style={{ fontSize: '16px', lineHeight: '24px' }}>
                    {body}
                  </p>
                </div>
              ))}
            </section>

            {/* Metrics */}
            <section className="flex flex-wrap gap-stack-lg mb-stack-lg p-stack-md border-y border-outline-variant/30 justify-center md:justify-start">
              {[
                { val: '40%', label: 'Faster Debugging' },
                { val: '1.2s', label: 'Avg. Latency' },
                { val: '15k', label: 'Daily Events' },
              ].map(({ val, label }, i) => (
                <div key={label} className="flex items-center gap-stack-lg">
                  {i > 0 && <div className="hidden md:block w-[1px] h-12 bg-outline-variant self-center" />}
                  <div className="flex flex-col">
                    <span className="text-secondary" style={{ fontSize: '36px', lineHeight: '44px', fontWeight: 700 }}>
                      {val}
                    </span>
                    <span
                      className="text-on-surface-variant font-semibold uppercase"
                      style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </section>

            {/* Detail Content + Sidebar */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              <div className="md:col-span-8 flex flex-col gap-stack-md">
                <h2 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 600 }}>
                  Implementation Depth
                </h2>
                {project.detail_content ? (
                  <div className="text-on-surface-variant leading-relaxed whitespace-pre-line" style={{ fontSize: '18px', lineHeight: '28px' }}>
                    {project.detail_content}
                  </div>
                ) : (
                  <p className="text-on-surface-variant leading-relaxed" style={{ fontSize: '18px', lineHeight: '28px' }}>
                    {project.summary}
                  </p>
                )}
                <div
                  className="w-full aspect-video rounded-lg overflow-hidden border border-outline-variant/20 bg-surface-container flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '64px' }}>
                    image
                  </span>
                </div>
              </div>

              <aside className="md:col-span-4">
                <div className="sticky top-24 p-stack-md bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col gap-stack-md">
                  <div>
                    <h4
                      className="text-primary uppercase mb-stack-sm font-semibold"
                      style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                    >
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-md border border-outline-variant/20 font-semibold"
                          style={{ fontSize: '12px' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-stack-sm border-t border-outline-variant/20">
                    <h4
                      className="text-primary uppercase mb-stack-sm font-semibold"
                      style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                    >
                      Project Links
                    </h4>
                    <div className="flex flex-col gap-stack-sm">
                      {[
                        { icon: 'terminal', label: 'Repository' },
                        { icon: 'visibility', label: 'Production View' },
                      ].map(({ icon, label }) => (
                        <a
                          key={label}
                          href="#"
                          className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/30 hover:border-primary transition-all group"
                        >
                          <span className="flex items-center gap-2 font-semibold" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
                            <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
                            {label}
                          </span>
                          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontSize: '18px' }}>
                            open_in_new
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </section>

            {/* Final CTA */}
            <section className="mt-stack-lg pt-stack-lg border-t border-outline-variant/30 text-center">
              <h3 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 600 }} className="mb-stack-sm">
                Interested in this project?
              </h3>
              <p
                className="text-on-surface-variant mb-stack-md max-w-xl mx-auto"
                style={{ fontSize: '16px', lineHeight: '24px' }}
              >
                I'm currently looking for new opportunities to build high-performance data visualizations and
                professional technical interfaces.
              </p>
              <div className="flex flex-wrap justify-center gap-stack-sm">
                <Link
                  to="/about"
                  className="px-8 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-80 transition-all active:scale-95"
                  style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                >
                  Get In Touch
                </Link>
                <Link
                  to="/projects"
                  className="px-8 py-3 border border-outline-variant text-on-surface-variant rounded-lg font-semibold hover:bg-surface-container-low transition-all active:scale-95"
                  style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                >
                  All Projects
                </Link>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
