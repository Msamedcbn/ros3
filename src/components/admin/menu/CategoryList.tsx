import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { Category } from '../../../types/menu';

interface CategoryListProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  onAddCategory: () => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
}

export function CategoryList({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: CategoryListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Kategoriler</h2>
        <button
          onClick={onAddCategory}
          className="p-2 text-green-600 hover:text-green-700"
          title="Yeni Kategori"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full p-2 rounded-lg text-left transition-colors ${
            !selectedCategory
              ? 'bg-green-50 text-green-700'
              : 'hover:bg-gray-50'
          }`}
        >
          Tümü
        </button>

        {categories.map((category) => (
          <div
            key={category.id}
            className={`group flex items-center justify-between p-2 rounded-lg transition-colors ${
              selectedCategory?.id === category.id
                ? 'bg-green-50 text-green-700'
                : 'hover:bg-gray-50'
            }`}
          >
            <button
              onClick={() => onSelectCategory(category)}
              className="flex-1 text-left"
            >
              {category.name}
            </button>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEditCategory(category)}
                className="p-1 text-gray-500 hover:text-gray-700"
                title="Düzenle"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDeleteCategory(category.id)}
                className="p-1 text-red-500 hover:text-red-700"
                title="Sil"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}