import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { MenuItem, Category } from '../../../types/menu';
import { IngredientManager } from './IngredientManager';
import { AddonManager } from './AddonManager';

interface MenuItemModalProps {
  item?: MenuItem | null;
  categories: Category[];
  onClose: () => void;
  onSave: (item: MenuItem) => void;
}

export function MenuItemModal({ item, categories, onClose, onSave }: MenuItemModalProps) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || 0,
    categoryId: item?.categoryId || categories[0]?.id || '',
    image: item?.image || '',
    isAvailable: item?.isAvailable ?? true,
    preparationTime: item?.preparationTime || 15,
    ingredients: item?.ingredients || [],
    addons: item?.addons || [],
    order: item?.order || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: item?.id || Date.now().toString(),
      ...formData,
    });
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
          {/* Existing form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ürün Adı
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fiyat (₺)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hazırlama Süresi (dk)
              </label>
              <input
                type="number"
                value={formData.preparationTime}
                onChange={(e) => setFormData({ ...formData, preparationTime: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Açıklama
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Görsel URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          {/* New Ingredient and Addon managers */}
          <IngredientManager
            ingredients={formData.ingredients}
            onChange={(ingredients) => setFormData({ ...formData, ingredients })}
          />

          <AddonManager
            addons={formData.addons}
            onChange={(addons) => setFormData({ ...formData, addons })}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAvailable"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
              className="h-4 w-4 text-green-600 rounded"
            />
            <label htmlFor="isAvailable" className="ml-2 text-sm text-gray-700">
              Satışa Açık
            </label>
          </div>

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