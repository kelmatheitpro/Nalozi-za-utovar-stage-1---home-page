import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Pricing } from './pages/Pricing';
import { AppLayout } from './components/layout/AppLayout';
import { Overview } from './pages/dashboard/Overview';
import { LoadBoard } from './pages/listings/LoadBoard';
import { TruckBoard } from './pages/listings/TruckBoard';
import { CreateLoad } from './pages/listings/CreateLoad';
import { CreateTruck } from './pages/listings/CreateTruck';
import { AdminPanel } from './pages/admin/AdminPanel';

const App = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Protected Routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/loads" element={<LoadBoard />} />
            <Route path="/trucks" element={<TruckBoard />} />
            <Route path="/post-load" element={<CreateLoad />} />
            <Route path="/post-truck" element={<CreateTruck />} />
            <Route path="/admin" element={<AdminPanel />} />
            
            {/* Plans route redirects to pricing for now */}
            <Route path="/plans" element={<Navigate to="/pricing" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;