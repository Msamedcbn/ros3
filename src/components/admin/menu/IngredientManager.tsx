import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Ingredient } from '../../../types/menu';

interface IngredientManagerProps {
  ingredients: Ingredient[];
  onChange: (ingredients: Ingredient[]) => void;
}

export function IngredientManager({ ingredients, onChange }: IngredientManagerProps) {
  const addIngredient = () => {
    onChange([
      ...ingredients,
      {
        id: Date.now().toString(),
        name: '',
        isRemovable: true,
        isInStock: true
      }
    ]);
  };

  const removeIngredient = (id: string) => {
    onChange(ingredients.filter(i => i.id !== id));
  };

  const updateIngredient = (id: string, updates: Partial<Ingredient>) => {
    onChange(ingredients.map(i => 
      i.id === id ? { ...i, ...updates } : i
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Malzemeler
        </label>
        <button
          type="button"
          onClick={addIngredient}
          className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
        >
          <Plus size={16} />
          <span>Malzeme Ekle</span>
        </button>
      </div>

      <div className="space-y-2">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex gap-2 items-start">
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => updateIngredient(ingredient.id, { name: e.target.value })}
              placeholder="Malzeme adı"
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={ingredient.isRemovable}
                  onChange={(e) => updateIngredient(ingredient.id, { isRemovable: e.target.checked })}
                  className="h-4 w-4 text-green-600 rounded"
                />
                <span className="text-sm text-gray-600">Çıkarılabilir</span>
              </label>
              <button
                type="button"
                onClick={() => removeIngredient(ingredient.id)}
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