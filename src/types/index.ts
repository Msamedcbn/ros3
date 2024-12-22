export type TableStatus = 'available' | 'occupied' | 'reserved';

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: TableStatus;
}

export interface FinancialStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrder: number;
  growth: {
    revenue: number;
    orders: number;
  };
}