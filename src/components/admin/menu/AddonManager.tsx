import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Addon } from '../../../types/menu';

interface AddonManagerProps {
  addons: Addon[];
  onChange: (addons: Addon[]) => void;
}

export function AddonManager({ addons, onChange }: AddonManagerProps) {
  const addAddon = () => {
    onChange([
      ...addons,
      {
        id: Date.now().toString(),
        name: '',
        price: 0,
        isAvailable: true
      }
    ]);
  };

  const removeAddon = (id: string) => {
    onChange(addons.filter(a => a.id !== id));
  };

  const updateAddon = (id: string, updates: Partial<Addon>) => {
    onChange(addons.map(a => 
      a.id === id ? { ...a, ...updates } : a
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Ekstra Malzemeler
        </label>
        <button
          type="button"
          onClick={addAddon}
          className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
        >
          <Plus size={16} />
          <span>Ekstra Ekle</span>
        </button>
      </div>

      <div className="space-y-2">
        {addons.map((addon) => (
          <div key={addon.id} className="flex gap-2 items-start">
            <input
              type="text"
              value={addon.name}
              onChange={(e) => updateAddon(addon.id, { name: e.target.value })}
              placeholder="Ekstra adı"
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <input
              type="number"
              value={addon.price}
              onChange={(e) => updateAddon(addon.id, { price: parseFloat(e.target.value) })}
              placeholder="Fiyat"
              className="w-24 px-3 py-2 border rounded-lg"
              min="0"
              step="0.01"
            />
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={addon.isAvailable}
                  onChange={(e) => updateAddon(addon.id, { isAvailable: e.target.checked })}
                  className="h-4 w-4 text-green-600 rounded"
                />
                <span className="text-sm text-gray-600">Mevcut</span>
              </label>
              <button
                type="button"
                onClick={() => removeAddon(addon.id)}
                className="p-1 text-red-500 hover:text-red-700"
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