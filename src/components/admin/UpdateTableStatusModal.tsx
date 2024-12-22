import React from 'react';
import { X } from 'lucide-react';
import type { Table, TableStatus } from '../../types';

interface UpdateTableStatusModalProps {
  table: Table;
  onClose: () => void;
  onUpdateStatus: (tableId: string, newStatus: TableStatus) => void;
}

const statusOptions: { value: TableStatus; label: string }[] = [
  { value: 'available', label: 'Müsait' },
  { value: 'occupied', label: 'Dolu' },
  { value: 'reserved', label: 'Rezerve' },
];

export function UpdateTableStatusModal({ table, onClose, onUpdateStatus }: UpdateTableStatusModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Masa {table.number} - Durum Güncelle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onUpdateStatus(table.id, option.value);
                onClose();
              }}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                table.status === option.value
                  ? 'bg-green-50 text-green-700 border-2 border-green-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}