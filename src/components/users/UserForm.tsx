import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { UserFormData, UserWithStatus } from '@/types';

const userFormSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

interface UserFormProps {
  user?: UserWithStatus | null;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
          Name <span className="text-[var(--color-error)]">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter full name"
          {...register('name')}
          className={`w-full px-3 py-2 rounded-lg bg-[var(--color-primary)] border ${errors.name ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'} text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-[var(--color-error)]' : 'focus:ring-[var(--color-accent)]'} focus:border-transparent transition-all`}
        />
        {errors.name && <p className="mt-1.5 text-sm text-[var(--color-error)]">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
          Email <span className="text-[var(--color-error)]">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email address"
          {...register('email')}
          className={`w-full px-3 py-2 rounded-lg bg-[var(--color-primary)] border ${errors.email ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'} text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-[var(--color-error)]' : 'focus:ring-[var(--color-accent)]'} focus:border-transparent transition-all`}
        />
        {errors.email && <p className="mt-1.5 text-sm text-[var(--color-error)]">{errors.email.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-[var(--color-primary)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white transition-colors disabled:opacity-50"
        >
          {user ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
