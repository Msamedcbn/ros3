import React from 'react';
import type { Order, OrderStatus } from '../../../types/menu';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderDetailsProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onUpdateItemStatus: (orderId: string, itemId: string, status: OrderStatus) => void;
}

const statusOptions: OrderStatus[] = ['pending', 'preparing', 'ready', 'served', 'cancelled'];

export function OrderDetails({ order, onUpdateStatus, onUpdateItemStatus }: OrderDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-1">Sipariş Detayı</h2>
          <p className="text-gray-600">Masa {order.tableId}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Sipariş Durumu</h3>
          <div className="flex gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => onUpdateStatus(order.id, status)}
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === status
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Ürünler</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium">
                    {item.quantity}x {item.menuItemId}
                  </div>
                  {item.notes && (
                    <p className="text-sm text-gray-600">{item.notes}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => onUpdateItemStatus(order.id, item.id, status)}
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === status
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {order.notes && (
          <div>
            <h3 className="font-medium mb-2">Notlar</h3>
            <p className="text-gray-600">{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}