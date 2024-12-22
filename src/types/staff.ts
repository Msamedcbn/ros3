export interface Staff {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  isActive: boolean;
  createdAt: Date;
}

export interface StaffCredentials {
  id: string;
  staffId: string;
  username: string;
  password: string;
  lastLogin?: Date;
}

export type StaffRole = 'admin' | 'manager' | 'waiter' | 'kitchen' | 'cashier';