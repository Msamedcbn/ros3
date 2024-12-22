import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CartItem } from '../types/menu';
import { calculateCartTotal } from '../utils/cart';

interface CartButtonProps {
  items: CartItem[];
}

export function CartButton({ items }: CartButtonProps) {
  if (items.length === 0) return null;

  const total = calculateCartTotal(items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      to="/cart"
      className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-white text-green-500 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        </div>
        <span className="font-semibold">₺{total.toFixed(2)}</span>
      </div>
    </Link>
  );
}