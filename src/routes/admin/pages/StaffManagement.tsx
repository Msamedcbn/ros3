import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { StaffList } from '../../../components/admin/staff/StaffList';
import { StaffModal } from '../../../components/admin/staff/StaffModal';
import type { Staff } from '../../../types/staff';

export function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const handleAddStaff = (newStaff: Staff) => {
    setStaff([...staff, newStaff]);
    setIsAddingStaff(false);
  };

  const handleUpdateStaff = (staffId: string, updates: Partial<Staff>) => {
    setStaff(staff.map(s => 
      s.id === staffId ? { ...s, ...updates } : s
    ));
    setEditingStaff(null);
  };

  const handleDeleteStaff = (staffId: string) => {
    setStaff(staff.filter(s => s.id !== staffId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Personel Yönetimi</h1>
        <button
          onClick={() => setIsAddingStaff(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus size={20} />
          <span>Yeni Personel</span>
        </button>
      </div>

      <StaffList
        staff={staff}
        onEdit={setEditingStaff}
        onDelete={handleDeleteStaff}
      />

      {(isAddingStaff || editingStaff) && (
        <StaffModal
          staff={editingStaff}
          onClose={() => {
            setIsAddingStaff(false);
            setEditingStaff(null);
          }}
          onSave={editingStaff ? handleUpdateStaff : handleAddStaff}
        />
      )}
    </div>
  );
}