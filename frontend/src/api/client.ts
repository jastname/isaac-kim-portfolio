const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Project {
  id: number;
  title: string;
  summary: string;
  results: string;
  tech_stack: string;
  image_url: string;
  status: 'LIVE' | 'DRAFT';
  detail_content: string;
  created_at: string;
  updated_at: string;
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/api/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function getProject(id: number): Promise<Project> {
  const res = await fetch(`${API_URL}/api/projects/${id}`);
  if (!res.ok) throw new Error('Project not found');
  return res.json();
}

export async function login(
  username: string,
  password: string
): Promise<{ access_token: string }> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function createProject(
  data: Partial<Project>,
  token: string
): Promise<Project> {
  const res = await fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}

export async function updateProject(
  id: number,
  data: Partial<Project>,
  token: string
): Promise<Project> {
  const res = await fetch(`${API_URL}/api/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
}

export async function deleteProject(id: number, token: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete project');
}
