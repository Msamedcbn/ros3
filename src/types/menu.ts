export type CategoryId = string;
export type MenuItemId = string;

export interface Category {
  id: CategoryId;
  name: string;
  description?: string;
  order: number;
  isActive: boolean;
}

export interface MenuItem {
  id: MenuItemId;
  categoryId: CategoryId;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  preparationTime: number;
  ingredients: Ingredient[];
  addons: Addon[];
  order: number;
}

export interface Ingredient {
  id: string;
  name: string;
  isRemovable: boolean;
  isInStock: boolean;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedAddons: Addon[];
  removedIngredients: Ingredient[];
}

export type OrderStatus = 
  | 'pending'
  | 'preparing'
  | 'ready'
  | 'served'
  | 'cancelled';

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  menuItemId: MenuItemId;
  quantity: number;
  removedIngredients: string[];
  addons: string[];
  notes?: string;
  status: OrderStatus;
}