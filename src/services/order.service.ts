import type { CartItem } from '../types/menu';

export interface OrderRequest {
  tableId: string;
  items: CartItem[];
  notes?: string;
}

export const orderService = {
  async createOrder(order: OrderRequest) {
    // In a real app, this would make an API call
    // For demo, we'll simulate an API response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          ...order,
          status: 'pending',
          createdAt: new Date(),
        });
      }, 1000);
    });
  }
};