import React, { useState } from 'react';
import { Plus, QrCode, Pencil, Trash2 } from 'lucide-react';
import { TableStatusBadge } from '../../../components/admin/TableStatusBadge';
import { UpdateTableStatusModal } from '../../../components/admin/UpdateTableStatusModal';
import { EditTableModal } from '../../../components/admin/EditTableModal';
import { generateQRCode } from '../../../utils/qr';
import type { Table, TableStatus } from '../../../types';

export function TableManagement() {
  const [tables, setTables] = useState<Table[]>([
    { id: '1', number: 1, capacity: 4, status: 'available' },
    { id: '2', number: 2, capacity: 2, status: 'occupied' },
    { id: '3', number: 3, capacity: 6, status: 'reserved' },
  ]);
  const [showQR, setShowQR] = useState<string | null>(null);
  const [isAddingTable, setIsAddingTable] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [newTable, setNewTable] = useState({ number: 0, capacity: 2 });

  const handleGenerateQRCode = async (tableId: string) => {
    try {
      const url = `${window.location.origin}/menu?table=${tableId}`;
      const qrDataUrl = await generateQRCode(url);
      setShowQR(qrDataUrl);
    } catch (err) {
      console.error('QR kod oluşturulamadı:', err);
    }
  };

  const handleAddTable = () => {
    const newTableData: Table = {
      id: Date.now().toString(),
      number: newTable.number,
      capacity: newTable.capacity,
      status: 'available'
    };
    setTables([...tables, newTableData]);
    setIsAddingTable(false);
    setNewTable({ number: 0, capacity: 2 });
  };

  const handleDeleteTable = (id: string) => {
    setTables(tables.filter(table => table.id !== id));
  };

  const handleUpdateStatus = (tableId: string, newStatus: TableStatus) => {
    setTables(tables.map(table => 
      table.id === tableId ? { ...table, status: newStatus } : table
    ));
  };

  const handleUpdateTable = (tableId: string, updates: Partial<Table>) => {
    setTables(tables.map(table =>
      table.id === tableId ? { ...table, ...updates } : table
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Masa Yönetimi</h1>
        <button
          onClick={() => setIsAddingTable(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus size={20} />
          <span>Yeni Masa</span>
        </button>
      </div>

      {isAddingTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Yeni Masa Ekle</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Masa Numarası
                </label>
                <input
                  type="number"
                  value={newTable.number}
                  onChange={(e) => setNewTable({ ...newTable, number: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kapasite
                </label>
                <input
                  type="number"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({ ...newTable, capacity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAddingTable(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  İptal
                </button>
                <button
                  onClick={handleAddTable}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Masa QR Kodu</h2>
            <img src={showQR} alt="QR Code" className="mb-4" />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowQR(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Kapat
              </button>
              <a
                href={showQR}
                download="masa-qr.png"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                İndir
              </a>
            </div>
          </div>
        </div>
      )}

      {selectedTable && (
        <UpdateTableStatusModal
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {editingTable && (
        <EditTableModal
          table={editingTable}
          onClose={() => setEditingTable(null)}
          onUpdate={handleUpdateTable}
        />
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Masa No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kapasite
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tables.map((table) => (
              <tr key={table.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    Masa {table.number}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{table.capacity} Kişilik</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => setSelectedTable(table)}
                    className="hover:opacity-75 transition-opacity"
                  >
                    <TableStatusBadge status={table.status} />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleGenerateQRCode(table.id)}
                      className="text-blue-600 hover:text-blue-900"
                      title="QR Kod Oluştur"
                    >
                      <QrCode size={20} />
                    </button>
                    <button
                      onClick={() => setEditingTable(table)}
                      className="text-gray-600 hover:text-gray-900"
                      title="Düzenle"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteTable(table.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Sil"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}