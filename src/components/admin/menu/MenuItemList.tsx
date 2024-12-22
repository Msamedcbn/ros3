import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { MenuItem } from '../../../types/menu';

interface MenuItemListProps {
  items: MenuItem[];
  onAddItem: () => void;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (itemId: string) => void;
}

export function MenuItemList({
  items,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: MenuItemListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Menü Öğeleri</h2>
          <button
            onClick={onAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus size={20} />
            <span>Yeni Ürün</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 border rounded-lg group hover:border-green-500 transition-colors"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEditItem(item)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    title="Düzenle"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1 text-red-500 hover:text-red-700"
                    title="Sil"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-semibold text-green-600">
                  ₺{item.price.toFixed(2)}
                </span>
                <span className={`text-sm ${
                  item.isAvailable ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.isAvailable ? 'Mevcut' : 'Mevcut Değil'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}