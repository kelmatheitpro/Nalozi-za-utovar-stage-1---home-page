import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet, Navigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Menu } from 'lucide-react';

export const AppLayout = () => {
  const { isAuthenticated } = useStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-background text-slate-200">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-background border-r border-white/5 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden bg-background">
        {/* Mobile Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/5 bg-background px-4 lg:hidden">
            <div className="flex items-center gap-2 font-bold text-lg text-white">
               Nalozi za utovar
            </div>
            <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-400 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface via-background to-background">
           <Outlet />
        </main>
      </div>
    </div>
  );
};