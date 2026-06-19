import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <nav className="flex justify-between items-center max-w-[1200px] mx-auto px-margin-desktop h-16">
        <Link
          to="/"
          className="text-headline-md font-bold text-primary"
          style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 600 }}
        >
          Portfolio.OS
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-gutter items-center">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-label-md font-semibold transition-colors ${
                isActive(to)
                  ? 'text-on-tertiary-container border-b-2 border-on-tertiary-container'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
              style={{ fontSize: '14px', letterSpacing: '0.05em' }}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => navigate('/admin/login')}
            className="bg-primary text-on-primary px-6 py-2 rounded-lg text-label-md font-semibold active:scale-95 transition-all duration-300 hover:opacity-80"
            style={{ fontSize: '14px', letterSpacing: '0.05em' }}
          >
            Login
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/30 px-margin-mobile py-stack-md flex flex-col gap-stack-sm">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-label-md font-semibold py-2 transition-colors ${
                isActive(to) ? 'text-on-tertiary-container' : 'text-on-surface-variant'
              }`}
              style={{ fontSize: '14px', letterSpacing: '0.05em' }}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => navigate('/admin/login')}
            className="bg-primary text-on-primary px-6 py-2 rounded-lg text-label-md font-semibold w-fit"
            style={{ fontSize: '14px', letterSpacing: '0.05em' }}
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}
