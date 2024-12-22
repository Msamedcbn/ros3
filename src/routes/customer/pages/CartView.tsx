import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CartItem } from '../../../types/menu';
import { calculateItemTotal } from '../../../utils/cart';
import { orderService } from '../../../services/order.service';
import { OrderConfirmationModal } from '../../../components/OrderConfirmationModal';

interface CartViewContext {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveFromCart: (itemId: string) => void;
  onCheckout: () => void;
}

export function CartView() {
  const {
    cartItems: items,
    onUpdateQuantity,
    onRemoveFromCart,
    onCheckout: clearCart
  } = useOutletContext<CartViewContext>();

  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const total = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const result = await orderService.createOrder({
        tableId: '1', // In a real app, get this from URL or context
        items: items
      });
      setOrderId(result.id);
      clearCart();
    } catch (error) {
      console.error('Checkout failed:', error);
      // In a real app, show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0 && !orderId) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Sepetiniz Boş</h2>
          <p className="text-gray-600 mb-6">Sepetinizde henüz ürün bulunmuyor.</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
          >
            <ArrowLeft size={20} />
            <span>Menüye Dön</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
            <span>Menüye Dön</span>
          </Link>
          <h1 className="text-2xl font-semibold">Sepetim</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm divide-y">
          {items.map((item) => (
            <div key={item.id} className="p-4">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.name}</h3>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {(item.removedIngredients.length > 0 || item.selectedAddons.length > 0) && (
                    <div className="mt-1 text-sm text-gray-600">
                      {item.removedIngredients.length > 0 && (
                        <p>Çıkarılanlar: {item.removedIngredients.map(i => i.name).join(', ')}</p>
                      )}
                      {item.selectedAddons.length > 0 && (
                        <p>Ekstralar: {item.selectedAddons.map(a => a.name).join(', ')}</p>
                      )}
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="font-medium text-green-600">
                      ₺{calculateItemTotal(item).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Toplam</span>
            <span className="text-green-600">₺{total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'İşleniyor...' : 'Siparişi Tamamla'}
        </button>
      </div>

      {orderId && (
        <OrderConfirmationModal
          orderId={orderId}
          onClose={() => setOrderId(null)}
        />
      )}
    </div>
  );
}