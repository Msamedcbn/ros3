import React from 'react';
import type { OrderStatus } from '../../../types/menu';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className = '' }: OrderStatusBadgeProps) {
  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return { text: 'Beklemede', className: 'bg-yellow-100 text-yellow-800' };
      case 'preparing':
        return { text: 'Hazırlanıyor', className: 'bg-blue-100 text-blue-800' };
      case 'ready':
        return { text: 'Hazır', className: 'bg-green-100 text-green-800' };
      case 'served':
        return { text: 'Servis Edildi', className: 'bg-gray-100 text-gray-800' };
      case 'cancelled':
        return { text: 'İptal Edildi', className: 'bg-red-100 text-red-800' };
    }
  };

  const { text, className: statusClassName } = getStatusInfo(status);

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClassName} ${className}`}>
      {text}
    </span>
  );
}