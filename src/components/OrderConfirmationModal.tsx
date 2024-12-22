import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderConfirmationModalProps {
  orderId: string;
  onClose: () => void;
}

export function OrderConfirmationModal({ orderId, onClose }: OrderConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Sipariş Alındı!</h3>
          <p className="mt-2 text-sm text-gray-500">
            Sipariş numaranız: {orderId}
          </p>
          <div className="mt-4">
            <Link
              to="/menu"
              onClick={onClose}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Menüye Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}