import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import type { MenuItem } from '../../../types/menu';

interface SimpleMenuItemFormProps {
  item?: MenuItem;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
}

interface Ingredient {
  id: string;
  name: string;
  isRemovable: boolean;
}

interface Extra {
  id: string;
  name: string;
  price: number;
}

export function SimpleMenuItemForm({ item, onClose, onSave }: SimpleMenuItemFormProps) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    price: item?.price || 0,
    ingredients: item?.ingredients || [],
    extras: item?.addons || []
  });

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: '',
      isRemovable: true
    };
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
  };

  const addExtra = () => {
    const newExtra: Extra = {
      id: Date.now().toString(),
      name: '',
      price: 0
    };
    setFormData(prev => ({
      ...prev,
      extras: [...prev.extras, newExtra]
    }));
  };

  const removeIngredient = (id: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i.id !== id)
    }));
  };

  const removeExtra = (id: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.filter(e => e.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: item?.id || Date.now().toString(),
      ...formData
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {item ? 'Ürün Düzenle' : 'Yeni Ürün'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Malzemeler */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Malzemeler
              </label>
              <button
                type="button"
                onClick={addIngredient}
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                <Plus size={16} />
                <span>Ekle</span>
              </button>
            </div>
            {formData.ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex gap-2">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => {
                    const updated = formData.ingredients.map(i =>
                      i.id === ingredient.id ? { ...i, name: e.target.value } : i
                    );
                    setFormData({ ...formData, ingredients: updated });
                  }}
                  placeholder="Malzeme adı"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={ingredient.isRemovable}
                    onChange={(e) => {
                      const updated = formData.ingredients.map(i =>
                        i.id === ingredient.id ? { ...i, isRemovable: e.target.checked } : i
                      );
                      setFormData({ ...formData, ingredients: updated });
                    }}
                    className="h-4 w-4 text-green-600 rounded"
                  />
                  <span className="text-sm text-gray-600">Çıkarılabilir</span>
                </label>
                <button
                  type="button"
                  onClick={() => removeIngredient(ingredient.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Ekstralar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Ekstra Malzemeler
              </label>
              <button
                type="button"
                onClick={addExtra}
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                <Plus size={16} />
                <span>Ekle</span>
              </button>
            </div>
            {formData.extras.map((extra) => (
              <div key={extra.id} className="flex gap-2">
                <input
                  type="text"
                  value={extra.name}
                  onChange={(e) => {
                    const updated = formData.extras.map(ex =>
                      ex.id === extra.id ? { ...ex, name: e.target.value } : ex
                    );
                    setFormData({ ...formData, extras: updated });
                  }}
                  placeholder="Ekstra adı"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  value={extra.price}
                  onChange={(e) => {
                    const updated = formData.extras.map(ex =>
                      ex.id === extra.id ? { ...ex, price: parseFloat(e.target.value) } : ex
                    );
                    setFormData({ ...formData, extras: updated });
                  }}
                  placeholder="Fiyat"
                  className="w-24 px-3 py-2 border rounded-lg"
                  min="0"
                  step="0.01"
                />
                <button
                  type="button"
                  onClick={() => removeExtra(extra.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
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