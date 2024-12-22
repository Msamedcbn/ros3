import type { CartItem } from '../types/menu';

export const calculateItemTotal = (item: CartItem): number => {
  const addonTotal = item.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  return (item.price + addonTotal) * item.quantity;
};

export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
};