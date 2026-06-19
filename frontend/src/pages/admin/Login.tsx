import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/client';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { access_token } = await login(username, password);
      localStorage.setItem('admin_token', access_token);
      navigate('/admin');
    } catch {
      setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop"
      style={{ backgroundColor: '#f7f9fb', fontFamily: 'Inter, sans-serif' }}
    >
      <div className="w-full max-w-[420px]">
        {/* Branding */}
        <div className="flex flex-col items-center mb-stack-lg text-center">
          <div className="mb-stack-sm p-base bg-primary rounded-lg text-on-primary">
            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
              shield_person
            </span>
          </div>
          <h1
            className="font-bold text-primary"
            style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 600 }}
          >
            Portfolio.OS
          </h1>
          <p
            className="text-on-surface-variant tracking-wider uppercase font-semibold"
            style={{ fontSize: '14px', letterSpacing: '0.05em' }}
          >
            Administrative Portal
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30"
          style={{ boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
            {/* Username */}
            <div className="flex flex-col gap-base">
              <label
                htmlFor="username"
                className="text-on-surface-variant flex items-center gap-base font-semibold"
                style={{ fontSize: '14px', letterSpacing: '0.05em' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  person
                </span>
                Email/Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your credentials"
                required
                className="w-full h-12 px-stack-md bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-on-tertiary-container focus:border-on-tertiary-container outline-none transition-all duration-300"
                style={{ fontSize: '16px', lineHeight: '24px' }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-base">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-on-surface-variant flex items-center gap-base font-semibold"
                  style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    lock
                  </span>
                  Password
                </label>
                <a
                  href="#"
                  className="text-on-tertiary-container hover:underline font-semibold"
                  style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-12 px-stack-md bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-on-tertiary-container focus:border-on-tertiary-container outline-none transition-all duration-300"
                  style={{ fontSize: '16px', lineHeight: '24px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-stack-sm top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-base p-stack-sm bg-surface-container-low rounded-lg border border-outline-variant/20">
              <span className="material-symbols-outlined text-secondary" style={{ fontSize: '18px' }}>
                verified_user
              </span>
              <p className="text-on-surface-variant font-semibold" style={{ fontSize: '12px', lineHeight: '16px' }}>
                Secure, encrypted session. Multi-factor authentication may be required.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-base p-stack-sm bg-error-container rounded-lg">
                <span className="material-symbols-outlined text-error" style={{ fontSize: '18px' }}>
                  error
                </span>
                <p className="text-error" style={{ fontSize: '14px' }}>
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-base w-full h-12 bg-primary text-on-primary rounded-lg font-semibold uppercase tracking-[0.1em] flex items-center justify-center gap-stack-sm hover:opacity-80 transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontSize: '14px', letterSpacing: '0.05em' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    login
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer meta */}
        <div className="mt-stack-lg flex flex-col items-center gap-base">
          <p className="text-on-surface-variant font-semibold" style={{ fontSize: '12px', opacity: 0.6 }}>
            &copy; 2024 Portfolio.OS. Engineered for performance.
          </p>
          <div className="flex gap-stack-md">
            {['System Status', 'Privacy Policy', 'Help Desk'].map((item, i) => (
              <span key={item} className="flex items-center gap-stack-md">
                {i > 0 && (
                  <span className="text-on-surface-variant" style={{ fontSize: '12px', opacity: 0.3 }}>
                    •
                  </span>
                )}
                <a
                  href="#"
                  className="text-on-surface-variant hover:text-primary transition-colors font-semibold"
                  style={{ fontSize: '12px', opacity: 0.6 }}
                >
                  {item}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
