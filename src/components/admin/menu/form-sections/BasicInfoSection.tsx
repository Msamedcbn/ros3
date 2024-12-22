import React from 'react';
import type { MenuItem, Category } from '../../../../types/menu';

interface BasicInfoSectionProps {
  item?: MenuItem | null;
  categories: Category[];
}

export function BasicInfoSection({ item, categories }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ürün Adı
          </label>
          <input
            type="text"
            name="name"
            defaultValue={item?.name}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            name="categoryId"
            defaultValue={item?.categoryId || categories[0]?.id}
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
            name="price"
            defaultValue={item?.price}
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
            name="preparationTime"
            defaultValue={item?.preparationTime || 15}
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
          name="description"
          defaultValue={item?.description}
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
          name="image"
          defaultValue={item?.image}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
    </div>
  );
}