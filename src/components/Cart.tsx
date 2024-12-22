import React from 'react';
import { ShoppingCart, Trash2, X, Plus } from 'lucide-react';
import type { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export function Cart({ items, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => 
    sum + (item.price + item.selectedAddons.reduce((a, b) => a + b.price, 0)) * item.quantity, 
  0);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-green-500" />
            <span className="font-semibold">Sepetiniz</span>
          </div>
          <span className="text-lg font-bold text-green-600">₺{total.toFixed(2)}</span>
        </div>
        
        <div className="space-y-2 max-h-48 overflow-auto mb-4">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-50 p-3 rounded">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600 text-sm ml-2">x{item.quantity}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-600">
                    ₺{((item.price + item.selectedAddons.reduce((a, b) => a + b.price, 0)) * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              {(item.removedIngredients.length > 0 || item.selectedAddons.length > 0) && (
                <div className="text-sm text-gray-600 pl-4 space-y-1">
                  {item.removedIngredients.length > 0 && (
                    <div className="flex items-center gap-1">
                      <X size={14} className="text-red-500" />
                      <span>{item.removedIngredients.map(i => i.name).join(', ')}</span>
                    </div>
                  )}
                  {item.selectedAddons.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Plus size={14} className="text-green-500" />
                      <span>{item.selectedAddons.map(a => a.name).join(', ')}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onCheckout}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Siparişi Tamamla
        </button>
      </div>
    </div>
  );
}