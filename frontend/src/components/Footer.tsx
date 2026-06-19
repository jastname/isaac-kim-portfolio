export default function Footer() {
  return (
    <footer className="w-full py-stack-lg bg-surface-container-highest border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto px-margin-desktop gap-stack-md">
        <div className="flex flex-col gap-base">
          <span
            className="font-bold text-primary"
            style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}
          >
            Portfolio.OS
          </span>
          <p
            className="text-on-surface-variant max-w-xs text-center md:text-left"
            style={{ fontSize: '16px', lineHeight: '24px' }}
          >
            &copy; 2024 Portfolio.OS. Engineered for performance.
          </p>
        </div>
        <div className="flex gap-gutter">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-all duration-300"
            style={{ fontSize: '16px', lineHeight: '24px' }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-all duration-300"
            style={{ fontSize: '16px', lineHeight: '24px' }}
          >
            LinkedIn
          </a>
          <a
            href="mailto:alex@portfolio.os"
            className="text-on-surface-variant hover:text-primary transition-all duration-300"
            style={{ fontSize: '16px', lineHeight: '24px' }}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
