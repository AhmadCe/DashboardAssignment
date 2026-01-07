export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface UserWithStatus extends User {
  isActive: boolean;
}

export interface UserFormData {
  name: string;
  email: string;
}

export interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export type UserStatusMap = Record<number, boolean>;
