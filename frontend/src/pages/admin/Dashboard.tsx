import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  type Project,
} from '../../api/client';

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Quantum Ledger v2',
    summary: 'Decentralized finance visualization engine.',
    results: '+15% Speed',
    tech_stack: 'React,WebGL',
    image_url: '',
    status: 'LIVE',
    detail_content: '',
    created_at: '',
    updated_at: '',
  },
  {
    id: 2,
    title: 'Aura CRM Dashboard',
    summary: 'Enterprise-level customer relationship management.',
    results: 'Scale Ready',
    tech_stack: 'Vue,Node.js',
    image_url: '',
    status: 'DRAFT',
    detail_content: '',
    created_at: '',
    updated_at: '',
  },
  {
    id: 3,
    title: 'SteelBeam Optimizer',
    summary: 'AI-driven structural integrity calculation tool.',
    results: '-40% Latency',
    tech_stack: 'Python,TensorFlow',
    image_url: '',
    status: 'LIVE',
    detail_content: '',
    created_at: '',
    updated_at: '',
  },
];

type FormData = {
  title: string;
  summary: string;
  results: string;
  tech_stack: string;
  status: 'LIVE' | 'DRAFT';
  detail_content: string;
};

const emptyForm: FormData = {
  title: '',
  summary: '',
  results: '',
  tech_stack: '',
  status: 'DRAFT',
  detail_content: '',
};

const navItems = [
  { icon: 'person', label: 'Profile' },
  { icon: 'work', label: 'Experience' },
  { icon: 'folder', label: 'Projects', active: true },
  { icon: 'military_tech', label: 'Awards' },
  { icon: 'contact_mail', label: 'Contacts' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token') ?? '';

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [useMock, setUseMock] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch {
      setUseMock(true);
      setProjects(MOCK_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditTarget(p);
    setForm({
      title: p.title,
      summary: p.summary,
      results: p.results,
      tech_stack: p.tech_stack,
      status: p.status,
      detail_content: p.detail_content,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editTarget) {
        const updated = await updateProject(editTarget.id, form, token);
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const created = await createProject(form, token);
        setProjects((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch {
      if (useMock) {
        if (editTarget) {
          setProjects((prev) =>
            prev.map((p) => (p.id === editTarget.id ? { ...p, ...form } : p))
          );
        } else {
          const newId = Date.now();
          setProjects((prev) => [
            ...prev,
            { ...form, id: newId, image_url: '', created_at: '', updated_at: '' },
          ]);
        }
        setModalOpen(false);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    setDeleteId(id);
    try {
      await deleteProject(id, token);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      if (useMock) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } finally {
      setDeleteId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const liveCount = projects.filter((p) => p.status === 'LIVE').length;

  return (
    <div className="bg-background text-on-background min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col p-base gap-stack-sm z-50">
        <div className="px-base py-stack-md">
          <h1
            className="text-primary font-black"
            style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 900 }}
          >
            Portfolio.OS
          </h1>
          <p className="text-on-surface-variant font-medium" style={{ fontSize: '12px', opacity: 0.7 }}>
            System Controller
          </p>
        </div>

        <nav className="flex flex-col gap-base overflow-y-auto flex-grow">
          {navItems.map(({ icon, label, active }) => (
            <button
              key={label}
              className={`flex items-center gap-stack-sm px-stack-sm py-stack-sm rounded-lg hover:translate-x-1 transition-transform duration-200 cursor-pointer w-full text-left ${
                active
                  ? 'bg-secondary-container text-on-secondary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-variant/50'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {icon}
              </span>
              <span className="font-semibold" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
                {label}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-outline-variant/30 pt-stack-sm px-base flex items-center gap-base">
          <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '24px' }}>
              person
            </span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="font-semibold" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
              Admin User
            </span>
            <span className="text-on-surface-variant" style={{ fontSize: '11px' }}>
              System Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-on-surface-variant hover:text-error transition-colors"
            title="로그아웃"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-margin-desktop min-h-screen">
        <header className="max-w-[1200px] mx-auto mb-stack-lg flex justify-between items-end">
          <div>
            <h2
              className="text-primary"
              style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: 700 }}
            >
              Manage Projects
            </h2>
            <p className="text-on-surface-variant mt-2" style={{ fontSize: '16px', lineHeight: '24px' }}>
              Curate and showcase your technical achievements.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-on-tertiary-container text-white px-stack-md py-stack-sm rounded-lg hover:opacity-90 active:scale-95 transition-all duration-300 font-semibold"
            style={{ fontSize: '14px', letterSpacing: '0.05em' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              add
            </span>
            Add New Project
          </button>
        </header>

        {useMock && (
          <div className="max-w-[1200px] mx-auto mb-stack-md px-4 py-3 bg-error-container text-error rounded-lg text-sm">
            백엔드에 연결할 수 없어 목업 데이터를 사용 중입니다.
          </div>
        )}

        {/* Metrics */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
          {[
            { label: 'Total Projects', value: projects.length },
            { label: 'Live Projects', value: liveCount },
            { label: 'Draft Projects', value: projects.length - liveCount },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-surface-container-lowest p-stack-md rounded-xl hover:-translate-y-0.5 transition-all"
              style={{ boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}
            >
              <span
                className="text-on-surface-variant uppercase tracking-widest font-semibold"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                {label}
              </span>
              <p className="text-secondary mt-1" style={{ fontSize: '36px', lineHeight: '44px', fontWeight: 700 }}>
                {loading ? '...' : value}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div
          className="max-w-[1200px] mx-auto bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20"
          style={{ boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant/30">
              <tr>
                {['Project Info', 'Status', 'Results', 'Actions'].map((h, i) => (
                  <th
                    key={h}
                    className={`px-stack-md py-stack-sm text-on-surface-variant uppercase font-semibold ${i === 3 ? 'text-right' : ''}`}
                    style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-stack-md py-10 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined animate-spin" style={{ fontSize: '32px' }}>
                      progress_activity
                    </span>
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-stack-md py-10 text-center text-on-surface-variant">
                    프로젝트가 없습니다.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-bright transition-colors">
                    <td className="px-stack-md py-stack-md">
                      <div className="flex items-center gap-stack-md">
                        <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '24px' }}>
                            folder
                          </span>
                        </div>
                        <div>
                          <p className="text-primary font-semibold" style={{ fontSize: '16px' }}>
                            {p.title}
                          </p>
                          <p
                            className="text-on-surface-variant"
                            style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}
                          >
                            {p.summary}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-stack-md py-stack-md">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                          p.status === 'LIVE'
                            ? 'bg-secondary-container/30 text-on-secondary-container'
                            : 'bg-outline-variant/30 text-on-surface-variant'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-stack-md py-stack-md">
                      <span className="text-secondary font-bold">{p.results}</span>
                    </td>
                    <td className="px-stack-md py-stack-md text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-2 text-on-surface-variant hover:text-on-tertiary-container hover:bg-tertiary-fixed rounded-lg transition-all"
                          title="수정"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deleteId === p.id}
                          className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-all disabled:opacity-40"
                          title="삭제"
                        >
                          <span className="material-symbols-outlined">
                            {deleteId === p.id ? 'hourglass_empty' : 'delete'}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-margin-mobile">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}
            onClick={() => setModalOpen(false)}
          />
          <div
            className="bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-stack-md py-stack-md border-b border-outline-variant/30 flex justify-between items-center">
              <h3
                className="text-primary"
                style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 600 }}
              >
                {editTarget ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-surface-container rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-stack-md overflow-y-auto">
              <form id="project-form" onSubmit={handleSave} className="space-y-stack-md">
                {[
                  { label: 'Project Title', key: 'title', type: 'text', placeholder: 'e.g. Quantum Ledger v2' },
                  { label: 'Measurable Results', key: 'results', type: 'text', placeholder: 'e.g. +15% Speed' },
                  { label: 'Tech Stack (comma-separated)', key: 'tech_stack', type: 'text', placeholder: 'React, Node.js, AWS' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} className="space-y-base">
                    <label
                      className="text-on-surface-variant font-semibold"
                      style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      value={form[key as keyof FormData]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      required={key === 'title'}
                      className="w-full px-stack-sm py-stack-sm rounded-lg border border-outline focus:border-on-tertiary-container focus:ring-2 focus:ring-on-tertiary-container/20 transition-all bg-surface-bright outline-none"
                      style={{ fontSize: '16px', lineHeight: '24px' }}
                    />
                  </div>
                ))}

                <div className="space-y-base">
                  <label
                    className="text-on-surface-variant font-semibold"
                    style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                  >
                    Short Summary
                  </label>
                  <textarea
                    value={form.summary}
                    onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                    placeholder="Briefly describe the project goals..."
                    rows={2}
                    className="w-full px-stack-sm py-stack-sm rounded-lg border border-outline focus:border-on-tertiary-container focus:ring-2 focus:ring-on-tertiary-container/20 transition-all bg-surface-bright outline-none resize-none"
                    style={{ fontSize: '16px', lineHeight: '24px' }}
                  />
                </div>

                <div className="space-y-base">
                  <label
                    className="text-on-surface-variant font-semibold"
                    style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                  >
                    Detail Content
                  </label>
                  <textarea
                    value={form.detail_content}
                    onChange={(e) => setForm((f) => ({ ...f, detail_content: e.target.value }))}
                    placeholder="케이스 스터디 상세 내용..."
                    rows={4}
                    className="w-full px-stack-sm py-stack-sm rounded-lg border border-outline focus:border-on-tertiary-container focus:ring-2 focus:ring-on-tertiary-container/20 transition-all bg-surface-bright outline-none resize-none"
                    style={{ fontSize: '16px', lineHeight: '24px' }}
                  />
                </div>

                <div className="space-y-base">
                  <label
                    className="text-on-surface-variant font-semibold"
                    style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                  >
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as 'LIVE' | 'DRAFT' }))}
                    className="w-full px-stack-sm py-stack-sm rounded-lg border border-outline focus:border-on-tertiary-container focus:ring-2 focus:ring-on-tertiary-container/20 transition-all bg-surface-bright outline-none"
                    style={{ fontSize: '16px', lineHeight: '24px' }}
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="LIVE">LIVE</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-stack-md py-stack-md border-t border-outline-variant/30 bg-surface-container-low flex justify-end gap-stack-md">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-stack-md py-stack-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-semibold"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="project-form"
                disabled={saving}
                className="px-stack-md py-stack-sm rounded-lg bg-primary text-on-primary hover:opacity-90 transition-all shadow-md font-semibold disabled:opacity-60"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                {saving ? 'Saving...' : editTarget ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
