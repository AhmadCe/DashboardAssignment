import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">
          Settings
        </h2>
        <p className="text-[var(--color-text-muted)]">
          This is a placeholder settings page. Configure your application preferences here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl p-5 cursor-pointer hover:border-[var(--color-accent)] transition-colors">
          <h3 className="font-semibold text-[var(--color-text)]">Notifications</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Configure notification preferences</p>
        </div>
        <div className="bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl p-5 cursor-pointer hover:border-[var(--color-accent)] transition-colors">
          <h3 className="font-semibold text-[var(--color-text)]">Security</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Manage security settings</p>
        </div>
        <div className="bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl p-5 cursor-pointer hover:border-[var(--color-accent)] transition-colors">
          <h3 className="font-semibold text-[var(--color-text)]">Appearance</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Customize the look and feel</p>
        </div>
        <div className="bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl p-5 cursor-pointer hover:border-[var(--color-accent)] transition-colors">
          <h3 className="font-semibold text-[var(--color-text)]">Account</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Manage your account details</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
