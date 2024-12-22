import React from 'react';
import type { MenuItem } from '../types/menu';

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export function MenuCard({ item, onSelect }: MenuCardProps) {
  return (
    <div 
      onClick={() => onSelect(item)}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-md"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <span className="text-lg font-bold text-green-600">₺{item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
}