import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import type { CartItem } from '../../types/menu';

export function CustomerLayout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const location = useLocation();

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    // Implement checkout logic
    console.log('Checkout:', cartItems);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet context={{
        cartItems,
        onAddToCart: handleAddToCart,
        onUpdateQuantity: handleUpdateQuantity,
        onRemoveFromCart: handleRemoveFromCart,
        onCheckout: handleCheckout
      }} />
    </div>
  );
}