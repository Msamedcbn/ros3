import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag,
  DollarSign 
} from 'lucide-react';

const stats = [
  { 
    label: 'Günlük Satış',
    value: '₺4,250',
    change: '+12%',
    icon: DollarSign,
    trend: 'up'
  },
  { 
    label: 'Aktif Siparişler',
    value: '24',
    change: '+8%',
    icon: ShoppingBag,
    trend: 'up'
  },
  { 
    label: 'Müşteri Sayısı',
    value: '156',
    change: '+22%',
    icon: Users,
    trend: 'up'
  },
  { 
    label: 'Ortalama Sipariş',
    value: '₺185',
    change: '+5%',
    icon: TrendingUp,
    trend: 'up'
  },
];

export function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, change, icon: Icon, trend }) => (
          <div key={label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <Icon className="text-green-600" size={24} />
              </div>
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{label}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Buraya grafik ve diğer istatistikler eklenecek */}
    </div>
  );
}