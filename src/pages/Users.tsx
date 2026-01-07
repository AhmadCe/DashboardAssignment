import React, { useState, useMemo, ChangeEvent } from 'react';
import { useUsers } from '@/hooks/useUsers';
import Modal from '@/components/ui/Modal';
import { UserForm } from '@/components/users';
import type { UserWithStatus, UserFormData, UserStatusMap } from '@/types';

const Users: React.FC = () => {
  const { data: apiUsers, isLoading, error } = useUsers();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userStatuses, setUserStatuses] = useState<UserStatusMap>({});
  const [localUsers, setLocalUsers] = useState<UserWithStatus[]>([]);
  const [nextId, setNextId] = useState<number>(100);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserWithStatus | null>(null);

  const usersWithStatus: UserWithStatus[] = useMemo((): UserWithStatus[] => {
    if (!apiUsers) return localUsers;
    const apiUsersWithStatus: UserWithStatus[] = apiUsers.map((user) => ({
      ...user,
      isActive: userStatuses[user.id] ?? true,
    }));
    return [...apiUsersWithStatus, ...localUsers];
  }, [apiUsers, userStatuses, localUsers]);

  const filteredUsers: UserWithStatus[] = useMemo((): UserWithStatus[] => {
    if (!searchQuery.trim()) return usersWithStatus;
    const query: string = searchQuery.toLowerCase();
    return usersWithStatus.filter(
      (user: UserWithStatus): boolean =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [usersWithStatus, searchQuery]);

  const toggleStatus = (userId: number): void => {
    const isLocalUser: boolean = localUsers.some((u: UserWithStatus) => u.id === userId);
    if (isLocalUser) {
      setLocalUsers((prev: UserWithStatus[]): UserWithStatus[] =>
        prev.map((user: UserWithStatus): UserWithStatus =>
          user.id === userId ? { ...user, isActive: !user.isActive } : user
        )
      );
    } else {
      setUserStatuses((prev: UserStatusMap): UserStatusMap => ({
        ...prev,
        [userId]: !(prev[userId] ?? true),
      }));
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleAddUser = (): void => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: UserWithStatus): void => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleFormSubmit = (data: UserFormData): void => {
    if (editingUser) {
      const isLocalUser: boolean = localUsers.some((u: UserWithStatus) => u.id === editingUser.id);
      if (isLocalUser) {
        setLocalUsers((prev: UserWithStatus[]): UserWithStatus[] =>
          prev.map((user: UserWithStatus): UserWithStatus =>
            user.id === editingUser.id ? { ...user, name: data.name, email: data.email } : user
          )
        );
      } else {
        setLocalUsers((prev: UserWithStatus[]): UserWithStatus[] => [
          ...prev,
          { ...editingUser, name: data.name, email: data.email },
        ]);
        setUserStatuses((prev: UserStatusMap): UserStatusMap => {
          const newStatuses: UserStatusMap = { ...prev };
          delete newStatuses[editingUser.id];
          return newStatuses;
        });
      }
    } else {
      const newUser: UserWithStatus = {
        id: nextId,
        name: data.name,
        email: data.email,
        username: data.name.toLowerCase().replace(/\s+/g, '.'),
        phone: '',
        website: '',
        address: { street: '', suite: '', city: '', zipcode: '' },
        company: { name: '', catchPhrase: '', bs: '' },
        isActive: true,
      };
      setLocalUsers((prev: UserWithStatus[]): UserWithStatus[] => [...prev, newUser]);
      setNextId((prev: number): number => prev + 1);
    }
    handleCloseModal();
  };

  const getUserInitials = (name: string): string => {
    return name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--color-text-muted)]">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center p-8 bg-[var(--color-secondary)] border border-[var(--color-error)] rounded-xl max-w-md">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">Failed to Load Users</h3>
          <p className="text-[var(--color-text-muted)] mb-4">{error.message}</p>
          <button
            onClick={(): void => window.location.reload()}
            className="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Users Management</h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              {filteredUsers.length} of {usersWithStatus.length} users
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-[var(--color-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={handleAddUser}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add User
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-primary)]/50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-[var(--color-text-muted)]">
                      {searchQuery ? 'No users found matching your search.' : 'No users available.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user: UserWithStatus) => (
                  <tr key={user.id} className="hover:bg-[var(--color-primary)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-semibold text-sm">
                          {getUserInitials(user.name)}
                        </div>
                        <span className="font-medium text-[var(--color-text)]">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--color-text-muted)]">{user.email}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(): void => toggleStatus(user.id)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          user.isActive
                            ? 'bg-[var(--color-success)]/20 text-[var(--color-success)] hover:bg-[var(--color-success)]/30'
                            : 'bg-[var(--color-text-muted)]/20 text-[var(--color-text-muted)] hover:bg-[var(--color-text-muted)]/30'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-[var(--color-success)]' : 'bg-[var(--color-text-muted)]'}`} />
                        {user.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(): void => handleEditUser(user)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-primary)] rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingUser ? 'Edit User' : 'Create New User'}>
        <UserForm user={editingUser} onSubmit={handleFormSubmit} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Users;
