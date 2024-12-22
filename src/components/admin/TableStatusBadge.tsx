import React from 'react';
import type { TableStatus } from '../../types';

interface TableStatusBadgeProps {
  status: TableStatus;
}

export function TableStatusBadge({ status }: TableStatusBadgeProps) {
  const getStatusInfo = (status: TableStatus) => {
    switch (status) {
      case 'available':
        return { text: 'Müsait', className: 'bg-green-100 text-green-800' };
      case 'occupied':
        return { text: 'Dolu', className: 'bg-red-100 text-red-800' };
      case 'reserved':
        return { text: 'Rezerve', className: 'bg-yellow-100 text-yellow-800' };
      default:
        return { text: 'Bilinmiyor', className: 'bg-gray-100 text-gray-800' };
    }
  };

  const { text, className } = getStatusInfo(status);

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${className}`}>
      {text}
    </span>
  );
}