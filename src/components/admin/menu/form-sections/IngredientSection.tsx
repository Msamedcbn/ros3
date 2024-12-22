import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Ingredient } from '../../../../types/menu';

interface IngredientSectionProps {
  ingredients: Ingredient[];
}

export function IngredientSection({ ingredients: initialIngredients }: IngredientSectionProps) {
  const [ingredients, setIngredients] = useState(initialIngredients);

  const addIngredient = () => {
    setIngredients([
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
    setIngredients(ingredients.filter(i => i.id !== id));
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
          className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
        >
          <Plus size={16} />
          <span>Malzeme Ekle</span>
        </button>
      </div>

      <div className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <div key={ingredient.id} className="flex gap-2">
            <input
              type="text"
              name={`ingredients[${index}].name`}
              defaultValue={ingredient.name}
              placeholder="Malzeme adı"
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name={`ingredients[${index}].isRemovable`}
                defaultChecked={ingredient.isRemovable}
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
    </div>
  );
}