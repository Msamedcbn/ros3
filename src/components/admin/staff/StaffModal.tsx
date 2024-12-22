import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Staff, StaffRole } from '../../../types/staff';

interface StaffModalProps {
  staff?: Staff | null;
  onClose: () => void;
  onSave: (staff: Staff) => void;
}

const roleOptions: { value: StaffRole; label: string }[] = [
  { value: 'admin', label: 'Yönetici' },
  { value: 'manager', label: 'Müdür' },
  { value: 'waiter', label: 'Garson' },
  { value: 'kitchen', label: 'Mutfak' },
  { value: 'cashier', label: 'Kasiyer' },
];

export function StaffModal({ staff, onClose, onSave }: StaffModalProps) {
  const [formData, setFormData] = useState({
    name: staff?.name || '',
    email: staff?.email || '',
    role: staff?.role || 'waiter',
    isActive: staff?.isActive ?? true,
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: staff?.id || Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role as StaffRole,
      isActive: formData.isActive,
      createdAt: staff?.createdAt || new Date(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {staff ? 'Personel Düzenle' : 'Yeni Personel'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Soyad
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
              E-posta
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required={!staff}
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as StaffRole })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-green-600 rounded"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Aktif
            </label>
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