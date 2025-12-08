import React from 'react';
import { useStore } from '../../context/StoreContext';
import { UserRole, UserStatus } from '../../types';
import { Card, Button, Badge } from '../../components/UIComponents';
import { Check, X } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export const AdminPanel = () => {
  const { users, currentUser, updateUserStatus } = useStore();

  if (currentUser?.role !== UserRole.ADMIN) {
    return <Navigate to="/dashboard" />;
  }

  const pendingUsers = users.filter(u => u.status === UserStatus.PENDING && u.role !== UserRole.ADMIN);
  const activeUsers = users.filter(u => u.status === UserStatus.APPROVED && u.role !== UserRole.ADMIN);

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>

      {/* Pending Approvals */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
           Zahtevi za odobrenje 
           <Badge variant="warning">{pendingUsers.length}</Badge>
        </h2>
        
        {pendingUsers.length === 0 ? (
           <Card className="p-8 text-center text-slate-500 italic bg-slate-50/50">Nema zahteva na čekanju.</Card>
        ) : (
           <div className="grid gap-4">
             {pendingUsers.map(user => (
               <Card key={user.id} className="p-6 border-l-4 border-l-amber-500 shadow-md">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-2">
                       <div className="flex items-center gap-2">
                         <h3 className="font-bold text-lg text-slate-900">{user.company?.name}</h3>
                         <Badge>{user.company?.category}</Badge>
                       </div>
                       <p className="text-sm text-slate-600">PIB/Matični broj: {user.company?.registrationNumber}</p>
                       <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-600 mt-2">
                          <p>Korisnik: <span className="text-slate-900 font-medium">{user.name}</span></p>
                          <p>Email: {user.email}</p>
                          <p>Telefon: {user.company?.phone}</p>
                          <p>Lokacija: {user.company?.city}, {user.company?.country}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <Button 
                         variant="danger" 
                         size="sm" 
                         onClick={() => updateUserStatus(user.id, UserStatus.REJECTED)}
                       >
                         <X className="h-4 w-4 mr-1" /> Odbij
                       </Button>
                       <Button 
                         variant="secondary" 
                         size="sm"
                         onClick={() => updateUserStatus(user.id, UserStatus.APPROVED)}
                       >
                         <Check className="h-4 w-4 mr-1" /> Odobri
                       </Button>
                    </div>
                  </div>
               </Card>
             ))}
           </div>
        )}
      </section>

      {/* Active Users */}
      <section className="space-y-4 pt-8 border-t border-slate-200">
         <h2 className="text-xl font-semibold text-slate-800">Aktivne Firme</h2>
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                     <tr>
                        <th className="px-6 py-3 font-medium text-slate-500">Firma</th>
                        <th className="px-6 py-3 font-medium text-slate-500">Email</th>
                        <th className="px-6 py-3 font-medium text-slate-500">Paket</th>
                        <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                        <th className="px-6 py-3 font-medium text-slate-500">Akcije</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {activeUsers.map(user => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4 font-medium text-slate-900">{user.company?.name}</td>
                           <td className="px-6 py-4 text-slate-600">{user.email}</td>
                           <td className="px-6 py-4"><Badge variant="info" className="uppercase">{user.plan}</Badge></td>
                           <td className="px-6 py-4"><Badge variant="success">Aktivan</Badge></td>
                           <td className="px-6 py-4">
                              <button 
                                className="text-red-600 hover:text-red-800 font-medium text-xs border border-red-200 px-2 py-1 rounded hover:bg-red-50"
                                onClick={() => updateUserStatus(user.id, UserStatus.REJECTED)}
                              >
                                Deaktiviraj
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>
    </div>
  );
};