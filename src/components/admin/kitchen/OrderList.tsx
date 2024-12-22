import React from 'react';
import { Clock } from 'lucide-react';
import type { Order } from '../../../types/menu';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderListProps {
  orders: Order[];
  selectedOrder: Order | null;
  onSelectOrder: (order: Order | null) => void;
}

export function OrderList({ orders, selectedOrder, onSelectOrder }: OrderListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Aktif Siparişler</h2>
      </div>

      <div className="divide-y">
        {orders.map((order) => (
          <button
            key={order.id}
            onClick={() => onSelectOrder(order)}
            className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
              selectedOrder?.id === order.id ? 'bg-green-50' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-medium">Masa {order.tableId}</span>
                <OrderStatusBadge status={order.status} className="ml-2" />
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                <span>12:34</span>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {order.items.map((item, index) => (
                <span key={item.id}>
                  {item.quantity}x {item.menuItemId}
                  {index < order.items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}