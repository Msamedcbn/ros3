import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CategoryBar } from '../../../components/CategoryBar';
import { MenuCard } from '../../../components/MenuCard';
import { ProductDetail } from '../../../components/ProductDetail';
import { CartButton } from '../../../components/CartButton';
import type { MenuItem, CartItem } from '../../../types/menu';
import { categories, menuItems } from '../../../constants/menu';

interface MenuViewContext {
  cartItems: CartItem[];
  onAddToCart: (item: CartItem) => void;
}

export function MenuView() {
  const { cartItems, onAddToCart } = useOutletContext<MenuViewContext>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = selectedCategory
    ? menuItems.filter(item => item.categoryId === selectedCategory && item.isAvailable)
    : menuItems.filter(item => item.isAvailable);

  const sortedItems = [...filteredItems].sort((a, b) => a.order - b.order);
  const sortedCategories = [...categories]
    .filter(cat => cat.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Menü</h1>
        </div>
      </header>

      <CategoryBar
        categories={sortedCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map(item => (
            <MenuCard
              key={item.id}
              item={item}
              onSelect={setSelectedItem}
            />
          ))}
        </div>

        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Bu kategoride ürün bulunmamaktadır.</p>
          </div>
        )}
      </div>

      {selectedItem && (
        <ProductDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={onAddToCart}
        />
      )}

      <CartButton items={cartItems} />
    </div>
  );
}