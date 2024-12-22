import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { MenuItem, CartItem, Addon, Ingredient } from '../types/menu';

interface ProductDetailProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export function ProductDetail({ item, onClose, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [removedIngredients, setRemovedIngredients] = useState<Ingredient[]>([]);

  const totalPrice = (item.price + selectedAddons.reduce((sum, addon) => sum + addon.price, 0)) * quantity;

  const handleAddonToggle = (addon: Addon) => {
    setSelectedAddons(prev =>
      prev.some(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handleIngredientToggle = (ingredient: Ingredient) => {
    if (!ingredient.isRemovable) return;
    
    setRemovedIngredients(prev =>
      prev.some(i => i.id === ingredient.id)
        ? prev.filter(i => i.id !== ingredient.id)
        : [...prev, ingredient]
    );
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      quantity,
      selectedAddons,
      removedIngredients,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
          </div>

          {item.ingredients.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Malzemeler</h3>
              <div className="space-y-2">
                {item.ingredients.map((ingredient) => (
                  <button
                    key={ingredient.id}
                    onClick={() => handleIngredientToggle(ingredient)}
                    disabled={!ingredient.isRemovable}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between ${
                      ingredient.isRemovable
                        ? 'hover:bg-gray-50 cursor-pointer'
                        : 'cursor-default'
                    } ${
                      removedIngredients.some(i => i.id === ingredient.id)
                        ? 'bg-red-50 text-red-700'
                        : 'bg-gray-50'
                    }`}
                  >
                    <span>{ingredient.name}</span>
                    {ingredient.isRemovable && (
                      <span className="text-sm">
                        {removedIngredients.some(i => i.id === ingredient.id)
                          ? 'Çıkarıldı'
                          : 'Çıkar'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {item.addons.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Ekstra Malzemeler</h3>
              <div className="space-y-2">
                {item.addons.map((addon) => (
                  <label
                    key={addon.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAddons.some(a => a.id === addon.id)}
                        onChange={() => handleAddonToggle(addon)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="ml-3">{addon.name}</span>
                    </div>
                    <span className="text-green-600 font-medium">+₺{addon.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Minus size={20} />
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Plus size={20} />
              </button>
            </div>
            <span className="text-2xl font-bold text-green-600">₺{totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}