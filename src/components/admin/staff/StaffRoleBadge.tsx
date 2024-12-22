import React from 'react';
import type { StaffRole } from '../../../types/staff';

interface StaffRoleBadgeProps {
  role: StaffRole;
}

export function StaffRoleBadge({ role }: StaffRoleBadgeProps) {
  const getRoleInfo = (role: StaffRole) => {
    switch (role) {
      case 'admin':
        return { text: 'Yönetici', className: 'bg-purple-100 text-purple-800' };
      case 'manager':
        return { text: 'Müdür', className: 'bg-blue-100 text-blue-800' };
      case 'waiter':
        return { text: 'Garson', className: 'bg-green-100 text-green-800' };
      case 'kitchen':
        return { text: 'Mutfak', className: 'bg-yellow-100 text-yellow-800' };
      case 'cashier':
        return { text: 'Kasiyer', className: 'bg-pink-100 text-pink-800' };
    }
  };

  const { text, className } = getRoleInfo(role);

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${className}`}>
      {text}
    </span>
  );
}