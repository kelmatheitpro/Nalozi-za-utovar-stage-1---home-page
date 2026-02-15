import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SupabaseService } from '../../services/supabaseService';
import { UserRole, UserStatus, User } from '../../types';
import { Card, Button, Badge } from '../../components/UIComponents';
import { Check, X, AlertCircle, Trash2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export const AdminPanel = () => {
  const { profile, isAdmin } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [showRejectionModal, setShowRejectionModal] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) {
      fetchPendingUsers();
      fetchAllUsers();
    }
  }, [isAdmin]);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const users = await SupabaseService.getPendingUsers();
      setPendingUsers(users);
    } catch (error: any) {
      console.error('Error fetching pending users:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const users = await SupabaseService.getAllUsers();
      setAllUsers(users);
    } catch (error: any) {
      console.error('Error fetching all users:', error);
    }
  };

  const handleApproval = async (userId: string, status: 'approved' | 'rejected', rejectionReason?: string) => {
    if (!profile) return;
    
    try {
      setLoading(true);
      await SupabaseService.updateUserStatus(userId, status, profile.id, rejectionReason);
      // Refresh both lists
      await fetchPendingUsers();
      await fetchAllUsers();
      setError(null); // Clear any previous errors
      
      // Close modal if it was open
      setShowRejectionModal(null);
      setRejectionReason('');
    } catch (error: any) {
      console.error('Error updating user status:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = (userId: string) => {
    setShowRejectionModal(userId);
    setRejectionReason('');
  };

  const confirmRejection = () => {
    if (showRejectionModal) {
      handleApproval(showRejectionModal, 'rejected', rejectionReason);
    }
  };

  const handlePlanChange = async (userId: string, plan: 'free' | 'standard' | 'pro') => {
    if (!profile) return;
    
    try {
      await SupabaseService.updateUserPlan(userId, plan);
      // Refresh all users list
      await fetchAllUsers();
      setError(null); // Clear any previous errors
    } catch (error: any) {
      console.error('Error updating user plan:', error);
      setError(error.message);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!profile) return;
    
    if (!confirm(`Da li ste sigurni da želite da obrišete korisnika ${userName}? Ova akcija se ne može poništiti.`)) {
      return;
    }
    
    try {
      setLoading(true);
      console.log('Starting user deletion for:', userId, userName);
      
      await SupabaseService.deleteUser(userId);
      
      console.log('User deletion completed successfully');
      
      // Refresh both lists
      await fetchPendingUsers();
      await fetchAllUsers();
      setError(null); // Clear any previous errors
      
      // Show success message
      alert(`Korisnik ${userName} je uspešno obrisan.`);
      
    } catch (error: any) {
      console.error('Error deleting user:', error);
      setError(`Greška pri brisanju korisnika: ${error.message}`);
      alert(`Greška pri brisanju korisnika ${userName}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-muted">Učitavanje...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-text-main mb-4">Greška</h1>
          <p className="text-text-muted mb-4">{error}</p>
          <Button onClick={fetchPendingUsers} variant="primary">
            Pokušaj ponovo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-text-main">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex space-x-1 bg-surface rounded-lg p-1">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'pending'
              ? 'bg-brand-500 text-white'
              : 'text-text-muted hover:text-text-main'
          }`}
        >
          Zahtevi za odobrenje ({pendingUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-brand-500 text-white'
              : 'text-text-muted hover:text-text-main'
          }`}
        >
          Svi korisnici ({allUsers.length})
        </button>
      </div>

      {/* Pending Approvals Tab */}
      {activeTab === 'pending' && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-main flex items-center gap-2">
             Zahtevi za odobrenje 
             <Badge variant="warning">{pendingUsers.length}</Badge>
          </h2>
          
          {pendingUsers.length === 0 ? (
             <Card className="p-8 text-center text-text-muted italic bg-surface">Nema zahteva na čekanju.</Card>
          ) : (
             <div className="grid gap-4">
               {pendingUsers.map(user => (
                 <Card key={user.id} className="p-6 border-l-4 border-l-amber-500 shadow-md">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-2">
                         <div className="flex items-center gap-2">
                           <h3 className="font-bold text-lg text-text-main">{user.company?.name}</h3>
                           <Badge>{user.company?.category}</Badge>
                         </div>
                         <p className="text-sm text-text-muted">PIB/Matični broj: {user.company?.registrationNumber}</p>
                         <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-text-muted mt-2">
                            <p>Korisnik: <span className="text-text-main font-medium">{user.name}</span></p>
                            <p>Email: {user.email}</p>
                            <p>Telefon: {user.company?.phone}</p>
                            <p>Lokacija: {user.company?.city}, {user.company?.country}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <Button 
                           variant="danger" 
                           size="sm" 
                           onClick={() => handleReject(user.id)}
                         >
                           <X className="h-4 w-4 mr-1" /> Odbij
                         </Button>
                         <Button 
                           variant="secondary" 
                           size="sm"
                           onClick={() => handleApproval(user.id, 'approved')}
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
      )}

      {/* All Users Tab */}
      {activeTab === 'all' && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-main">Svi korisnici</h2>
          
          <div className="grid gap-4">
            {allUsers.map(user => (
              <Card key={user.id} className="p-6 shadow-md">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-2">
                     <div className="flex items-center gap-2">
                       <h3 className="font-bold text-lg text-text-main">{user.company?.name || user.name}</h3>
                       <Badge variant={user.status === 'approved' ? 'success' : user.status === 'pending' ? 'warning' : 'danger'}>
                         {user.status === 'approved' ? 'Odobreno' : user.status === 'pending' ? 'Čeka' : 'Odbačeno'}
                       </Badge>
                       <Badge variant={user.role === 'admin' ? 'info' : 'default'}>
                         {user.role === 'admin' ? 'ADMIN' : 'USER'}
                       </Badge>
                     </div>
                     <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-text-muted mt-2">
                        <p>Korisnik: <span className="text-text-main font-medium">{user.name}</span></p>
                        <p>Email: {user.email}</p>
                        <p>Plan: <span className={`font-medium ${
                          user.plan === 'free' ? 'text-gray-500' :
                          user.plan === 'standard' ? 'text-blue-500' :
                          'text-amber-500'
                        }`}>{user.plan?.toUpperCase()}</span></p>
                        <p>Lokacija: {user.company?.city}, {user.company?.country}</p>
                     </div>
                  </div>
                  <div className="flex flex-col gap-3">
                     <div>
                       <label className="text-xs text-text-muted uppercase tracking-wider">Plan</label>
                       <select
                         value={user.plan}
                         onChange={(e) => handlePlanChange(user.id, e.target.value as 'free' | 'standard' | 'pro')}
                         className="w-full mt-1 px-3 py-2 bg-surface border border-border rounded-md text-text-main text-sm"
                       >
                         <option value="free">FREE</option>
                         <option value="standard">STANDARD</option>
                         <option value="pro">PRO</option>
                       </select>
                     </div>
                     <div className="flex gap-2">
                       {user.status === 'pending' && (
                         <>
                           <Button 
                             variant="danger" 
                             size="sm" 
                             onClick={() => handleReject(user.id)}
                           >
                             <X className="h-4 w-4" />
                           </Button>
                           <Button 
                             variant="secondary" 
                             size="sm"
                             onClick={() => handleApproval(user.id, 'approved')}
                           >
                             <Check className="h-4 w-4" />
                           </Button>
                         </>
                       )}
                       {user.status === 'rejected' && (
                         <Button 
                           variant="secondary" 
                           size="sm"
                           onClick={() => handleApproval(user.id, 'approved')}
                           title="Odobri korisnika (rehabilitacija)"
                         >
                           <Check className="h-4 w-4" /> Odobri
                         </Button>
                       )}
                       {user.role !== 'admin' && (
                         <Button 
                           variant="danger" 
                           size="sm" 
                           onClick={() => handleDeleteUser(user.id, user.name)}
                           title="Obriši korisnika (za testiranje)"
                         >
                           <Trash2 className="h-4 w-4" />
                         </Button>
                       )}
                     </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
      
      {/* Rejection Reason Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-text-main mb-4">Razlog odbijanja</h3>
            <p className="text-text-muted text-sm mb-4">
              Unesite razlog zašto odbijate ovu prijavu. Ovaj razlog će biti poslat korisniku u email-u.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Npr: Nedostaju potrebni dokumenti, neispravni podaci o firmi..."
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-text-main text-sm resize-none"
              rows={4}
            />
            <div className="flex gap-3 mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setShowRejectionModal(null);
                  setRejectionReason('');
                }}
                className="flex-1"
              >
                Otkaži
              </Button>
              <Button 
                variant="danger" 
                size="sm"
                onClick={confirmRejection}
                className="flex-1"
              >
                Odbij prijavu
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};