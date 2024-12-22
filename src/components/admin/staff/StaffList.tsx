import React from 'react';
import { Edit2, Trash2, Key } from 'lucide-react';
import type { Staff } from '../../../types/staff';
import { StaffRoleBadge } from './StaffRoleBadge';

interface StaffListProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (staffId: string) => void;
}

export function StaffList({ staff, onEdit, onDelete }: StaffListProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Personel
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              E-posta
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Durum
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {staff.map((person) => (
            <tr key={person.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">
                  {person.name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-500">{person.email}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StaffRoleBadge role={person.role} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  person.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {person.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(person)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Düzenle"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(person.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Sil"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}