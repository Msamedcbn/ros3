import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminLayout } from './routes/admin/AdminLayout';
import { Login } from './routes/admin/pages/Login';
import { Dashboard } from './routes/admin/pages/Dashboard';
import { MenuManagement } from './routes/admin/pages/MenuManagement';
import { TableManagement } from './routes/admin/pages/TableManagement';
import { KitchenManagement } from './routes/admin/pages/KitchenManagement';
import { FinancialAnalysis } from './routes/admin/pages/FinancialAnalysis';
import { StaffManagement } from './routes/admin/pages/StaffManagement';
import { CustomerLayout } from './routes/customer/CustomerLayout';
import { MenuView } from './routes/customer/pages/MenuView';
import { CartView } from './routes/customer/pages/CartView';
import { ProtectedRoute } from './routes/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="tables" element={<TableManagement />} />
            <Route path="kitchen" element={<KitchenManagement />} />
            <Route path="financial" element={<FinancialAnalysis />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="settings" element={<div>Ayarlar</div>} />
          </Route>

          {/* Customer routes */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<Navigate to="/menu" replace />} />
            <Route path="menu" element={<MenuView />} />
            <Route path="cart" element={<CartView />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/menu" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}