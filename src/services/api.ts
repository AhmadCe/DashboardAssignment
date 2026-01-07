import type { User } from '@/types';

const BASE_URL: string = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<User[]> => {
  const response: Response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }

  const data: User[] = await response.json();
  return data;
};
