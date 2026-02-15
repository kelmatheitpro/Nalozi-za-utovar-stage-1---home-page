import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Input, Button, Select, Badge } from '../../components/UIComponents';
import { Filter, MapPin, Calendar, Phone, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoadBoard = () => {
  const { profile, canViewContact } = useAuth();
  const [filter, setFilter] = useState({ origin: '', destination: '', date: '' });

  // Test data - will be replaced with real data from Supabase
  const loads: any[] = [
    {
      id: 'test-load-1',
      userId: 'test-user-1',
      type: 'load',
      companyName: 'Transport Srbija DOO',
      originCountry: 'Serbia',
      originCity: 'Belgrade',
      destinationCountry: 'Germany',
      destinationCity: 'Berlin',
      dateFrom: '2024-01-15',
      truckType: 'Cerada / Tautliner',
      capacity: '24t, 33 palete',
      price: 1200,
      currency: 'EUR',
      description: 'Hitna tura, potreban kamion sa ceradom',
      views: 45,
      inquiries: 3,
      createdAt: new Date().toISOString(),
      contactPhone: '+381 64 123 4567', // Pravi broj - samo za STANDARD/PRO korisnike
    },
    {
      id: 'test-load-2',
      userId: 'test-user-2',
      type: 'load',
      companyName: 'Balkan Logistics',
      originCountry: 'Serbia',
      originCity: 'Novi Sad',
      destinationCountry: 'Austria',
      destinationCity: 'Vienna',
      dateFrom: '2024-01-16',
      truckType: 'Hladnjača',
      capacity: '20t',
      price: 800,
      currency: 'EUR',
      description: 'Hrana, temperatura -18°C',
      views: 23,
      inquiries: 1,
      createdAt: new Date().toISOString(),
      contactPhone: '+381 65 987 6543',
    },
    {
      id: 'test-load-3',
      userId: 'test-user-3',
      type: 'load',
      companyName: 'Euro Trans',
      originCountry: 'Serbia',
      originCity: 'Kragujevac',
      destinationCountry: 'Italy',
      destinationCity: 'Milan',
      dateFrom: '2024-01-17',
      truckType: 'Mega',
      capacity: '25t, 40 palete',
      price: null,
      currency: 'EUR',
      description: 'Tekstil, potreban mega trailer',
      views: 67,
      inquiries: 5,
      createdAt: new Date().toISOString(),
      contactPhone: '+381 63 555 1234',
    }
  ];

  const filteredLoads = loads.filter(l => {
    // If user is on free plan, don't apply filters (show all)
    if (profile?.plan === 'free') return true;
    
    const matchOrigin = !filter.origin || 
      l.originCountry?.toLowerCase().includes(filter.origin.toLowerCase()) || 
      l.originCity?.toLowerCase().includes(filter.origin.toLowerCase());
    const matchDest = !filter.destination || 
      (l.destinationCountry?.toLowerCase() || '').includes(filter.destination.toLowerCase()) || 
      (l.destinationCity?.toLowerCase() || '').includes(filter.destination.toLowerCase());
    const matchDate = !filter.date || l.dateFrom?.startsWith(filter.date);
    return matchOrigin && matchDest && matchDate;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">Pretraga Tura</h1>
        {profile?.plan !== 'free' && (
          <Link to="/post-load"><Button>Objavi Turu</Button></Link>
        )}
      </div>

      {/* Filter Bar */}
      <Card className="p-5 sticky top-4 z-20 shadow-lg border-border ring-1 ring-border">
        {profile?.plan === 'free' ? (
          <div className="text-center py-4">
            <p className="text-text-muted mb-3">Filteri su dostupni samo sa STANDARD ili PRO planom</p>
            <Button onClick={() => window.location.href = '/pricing'} variant="primary" size="sm">
              Upgrade Plan
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <Input 
              label="Utovar" 
              placeholder="Grad ili Država" 
              value={filter.origin}
              onChange={(e) => setFilter({...filter, origin: e.target.value})}
              className="bg-surface"
            />
            <Input 
              label="Istovar" 
              placeholder="Grad ili Država" 
              value={filter.destination}
              onChange={(e) => setFilter({...filter, destination: e.target.value})}
              className="bg-surface"
            />
            <Input 
              label="Datum" 
              type="date"
              value={filter.date}
              onChange={(e) => setFilter({...filter, date: e.target.value})}
              className="bg-surface"
            />
            <Button variant="outline" className="w-full flex gap-2" onClick={() => setFilter({origin:'', destination:'', date:''})}>
              <Filter className="h-4 w-4" /> Poništi filtere
            </Button>
          </div>
        )}
      </Card>

      {/* List */}
      <div className="space-y-4 pt-2">
        {filteredLoads.map(load => {
          const hasAccess = canViewContact(load);
          return (
            <Card key={load.id} className="hover:shadow-md transition-all duration-300 group border-border">
               <div className="p-5 flex flex-col md:flex-row gap-6">
                  {/* Route Info */}
                  <div className="flex-1 space-y-4">
                     <div className="flex items-center gap-3">
                        <Badge variant="info">Tura</Badge>
                        <span className="text-sm text-text-muted font-medium flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5"/> {new Date(load.dateFrom).toLocaleDateString()}
                        </span>
                     </div>
                     <div className="flex items-center gap-4 sm:gap-8">
                        <div>
                           <div className="flex items-center gap-1.5 text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Utovar</div>
                           <p className="font-bold text-lg text-text-main">{load.originCity}</p>
                           <p className="text-sm text-text-muted">{load.originCountry}</p>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center px-4">
                           <div className="text-xs text-text-muted mb-1">{load.price ? `${load.price} ${load.currency}` : 'Na upit'}</div>
                           <div className="w-full h-px bg-border relative">
                             <div className="absolute right-0 -top-1.5 text-text-muted"><ArrowRight className="h-4 w-4"/></div>
                           </div>
                        </div>

                        <div className="text-right">
                           <div className="flex items-center justify-end gap-1.5 text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Istovar</div>
                           <p className="font-bold text-lg text-text-main">{load.destinationCity}</p>
                           <p className="text-sm text-text-muted">{load.destinationCountry}</p>
                        </div>
                     </div>
                     <div className="flex flex-wrap gap-2 text-sm text-text-muted pt-2">
                        <span className="bg-surface border border-border px-2.5 py-1 rounded-md">{load.truckType}</span>
                        <span className="bg-surface border border-border px-2.5 py-1 rounded-md">{load.capacity}</span>
                     </div>
                  </div>

                  {/* Company & Contact */}
                  <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 flex flex-col justify-between bg-surface/30 md:bg-transparent -mx-5 md:mx-0 px-5 md:px-0 pb-2 md:pb-0">
                     <div className="pt-2 md:pt-0">
                        <p className="font-semibold text-text-main">{load.companyName}</p>
                        <p className="text-xs text-text-muted mt-1">Objavljeno {new Date(load.createdAt).toLocaleTimeString()}</p>
                     </div>
                     
                     <div className="mt-4">
                       {hasAccess ? (
                          <Button 
                            variant="secondary" 
                            className="w-full gap-2 font-semibold"
                            onClick={() => window.open(`tel:${load.contactPhone}`, '_self')}
                          >
                            <Phone className="h-4 w-4" /> {load.contactPhone}
                          </Button>
                       ) : (
                          <div className="relative overflow-hidden rounded-lg group cursor-not-allowed border border-border">
                             <div className="blur-[3px] bg-surface p-2.5 text-center text-text-muted select-none font-mono">
                                *** *** ****
                             </div>
                             <div className="absolute inset-0 flex items-center justify-center bg-surface/60">
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-text-muted bg-surface px-3 py-1.5 rounded-full shadow-sm border border-border">
                                  <Lock className="h-3 w-3" /> 
                                  Sakriveno
                                </span>
                             </div>
                          </div>
                       )}
                     </div>
                  </div>
               </div>
            </Card>
          );
        })}
        {filteredLoads.length === 0 && (
          <div className="text-center py-20 bg-surface rounded-xl border border-dashed border-border">
            <p className="text-text-muted">Nema tura koje odgovaraju vašoj pretrazi.</p>
          </div>
        )}
      </div>
    </div>
  );
};