import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchUsers } from '@/services/api';
import type { User } from '@/types';

export const USERS_QUERY_KEY = ['users'] as const;

export const useUsers = (): UseQueryResult<User[], Error> => {
  return useQuery<User[], Error>({
    queryKey: USERS_QUERY_KEY,
    queryFn: fetchUsers,
  });
};
