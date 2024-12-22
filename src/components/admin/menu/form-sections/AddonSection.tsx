import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Addon } from '../../../../types/menu';

interface AddonSectionProps {
  addons: Addon[];
}

export function AddonSection({ addons: initialAddons }: AddonSectionProps) {
  const [addons, setAddons] = useState(initialAddons);

  const addAddon = () => {
    setAddons([
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
    setAddons(addons.filter(a => a.id !== id));
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
          className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
        >
          <Plus size={16} />
          <span>Ekstra Ekle</span>
        </button>
      </div>

      <div className="space-y-2">
        {addons.map((addon, index) => (
          <div key={addon.id} className="flex gap-2">
            <input
              type="text"
              name={`addons[${index}].name`}
              defaultValue={addon.name}
              placeholder="Ekstra adı"
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <input
              type="number"
              name={`addons[${index}].price`}
              defaultValue={addon.price}
              placeholder="Fiyat"
              className="w-24 px-3 py-2 border rounded-lg"
              min="0"
              step="0.01"
            />
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name={`addons[${index}].isAvailable`}
                defaultChecked={addon.isAvailable}
                className="h-4 w-4 text-green-600 rounded"
              />
              <span className="text-sm text-gray-600">Mevcut</span>
            </label>
            <button
              type="button"
              onClick={() => removeAddon(addon.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}