import React from 'react';
import type { Category } from '../types/menu';

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryBar({ categories, selectedCategory, onSelectCategory }: CategoryBarProps) {
  return (
    <div className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
          <button
            onClick={() => onSelectCategory(null)}
            className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
              selectedCategory === null
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tümü
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}