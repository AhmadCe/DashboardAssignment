import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">
          Welcome to Admin Dashboard
        </h2>
        <p className="text-[var(--color-text-muted)]">
          This is a simple admin dashboard. Navigate to the Users page to see the main functionality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--color-text-muted)]">Total Users</p>
          <p className="text-3xl font-bold text-[var(--color-text)] mt-2">10</p>
        </div>
        <div className="bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--color-text-muted)]">Active Users</p>
          <p className="text-3xl font-bold text-[var(--color-success)] mt-2">10</p>
        </div>
        <div className="bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--color-text-muted)]">Inactive Users</p>
          <p className="text-3xl font-bold text-[var(--color-text-muted)] mt-2">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
