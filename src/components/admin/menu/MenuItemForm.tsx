import React from 'react';
import { X } from 'lucide-react';
import type { MenuItem, Category } from '../../../types/menu';
import { BasicInfoSection } from './form-sections/BasicInfoSection';
import { IngredientSection } from './form-sections/IngredientSection';
import { AddonSection } from './form-sections/AddonSection';

interface MenuItemFormProps {
  item?: MenuItem | null;
  categories: Category[];
  onClose: () => void;
  onSave: (item: MenuItem) => void;
}

export function MenuItemForm({ item, categories, onClose, onSave }: MenuItemFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {item ? 'Ürün Düzenle' : 'Yeni Ürün'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection item={item} categories={categories} />
          <IngredientSection ingredients={item?.ingredients || []} />
          <AddonSection addons={item?.addons || []} />
          
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}