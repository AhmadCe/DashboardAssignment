import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[var(--color-primary)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between h-full px-6">
        <h1 className="text-xl font-semibold text-[var(--color-text)]">{title}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pl-4 border-l border-[var(--color-border)]">
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-[var(--color-text)]">Admin User</p>
              <p className="text-xs text-[var(--color-text-muted)]">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
