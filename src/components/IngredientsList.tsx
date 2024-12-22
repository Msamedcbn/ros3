import React from 'react';
import { Check, X } from 'lucide-react';
import type { Ingredient } from '../types';

interface IngredientsListProps {
  ingredients: Ingredient[];
  removedIngredients: Ingredient[];
  onToggleIngredient: (ingredient: Ingredient) => void;
}

export function IngredientsList({ 
  ingredients, 
  removedIngredients, 
  onToggleIngredient 
}: IngredientsListProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">İçindekiler</h3>
      <div className="space-y-2">
        {ingredients.map(ingredient => (
          <div
            key={ingredient.id}
            className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
          >
            <span className="flex items-center gap-2">
              {removedIngredients.some(i => i.id === ingredient.id) 
                ? <X className="text-red-500" size={18} />
                : <Check className="text-green-500" size={18} />
              }
              {ingredient.name}
            </span>
            {ingredient.removable && (
              <button
                onClick={() => onToggleIngredient(ingredient)}
                className={`px-3 py-1 rounded-full text-sm ${
                  removedIngredients.some(i => i.id === ingredient.id)
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {removedIngredients.some(i => i.id === ingredient.id)
                  ? 'Ekle'
                  : 'Çıkar'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}