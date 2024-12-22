import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Users, 
  ClipboardList,
  QrCode,
  Settings,
  LineChart,
  ChefHat
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/menu', icon: UtensilsCrossed, label: 'Menü Yönetimi' },
  { to: '/admin/tables', icon: QrCode, label: 'Masa Yönetimi' },
  { to: '/admin/kitchen', icon: ChefHat, label: 'Mutfak Yönetimi' },
  { to: '/admin/financial', icon: LineChart, label: 'Finansal Analiz' },
  { to: '/admin/orders', icon: ClipboardList, label: 'Siparişler' },
  { to: '/admin/staff', icon: Users, label: 'Personel' },
  { to: '/admin/settings', icon: Settings, label: 'Ayarlar' }
];

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Restoran Yönetimi</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Icon size={20} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}