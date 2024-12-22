import React, { useState } from 'react';
import { OrderList } from '../../../components/admin/kitchen/OrderList';
import { OrderDetails } from '../../../components/admin/kitchen/OrderDetails';
import type { Order, OrderStatus } from '../../../types/menu';

export function KitchenManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const handleUpdateOrderItemStatus = (
    orderId: string,
    itemId: string,
    status: OrderStatus
  ) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? {
            ...order,
            items: order.items.map(item =>
              item.id === itemId ? { ...item, status } : item
            ),
          }
        : order
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mutfak Yönetimi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderList
          orders={orders}
          selectedOrder={selectedOrder}
          onSelectOrder={setSelectedOrder}
        />

        {selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            onUpdateStatus={handleUpdateOrderStatus}
            onUpdateItemStatus={handleUpdateOrderItemStatus}
          />
        )}
      </div>
    </div>
  );
}