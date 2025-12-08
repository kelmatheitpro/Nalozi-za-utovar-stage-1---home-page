import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { UserStatus } from '../../types';
import { Card, Button, Badge } from '../../components/UIComponents';
import { Package, Truck, Activity, Lock, TrendingUp, Plus, ArrowUpRight } from 'lucide-react';

export const Overview = () => {
  const { currentUser, loads, trucks } = useStore();

  const myLoads = loads.filter(l => l.userId === currentUser?.id);
  const myTrucks = trucks.filter(t => t.userId === currentUser?.id);

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main tracking-tight">Kontrolna Tabla</h1>
          <p className="text-text-muted text-sm">Dobrodošli nazad, {currentUser?.name}</p>
        </div>
        <div className="flex gap-3">
           <Link to="/post-load">
             <Button variant="primary" size="sm" className="gap-2 shadow-glow uppercase tracking-wide"><Plus className="h-3.5 w-3.5"/> Nova Tura</Button>
           </Link>
           <Link to="/post-truck">
             <Button variant="outline" size="sm" className="gap-2 uppercase tracking-wide"><Plus className="h-3.5 w-3.5"/> Novi Kamion</Button>
           </Link>
        </div>
      </div>

      {/* Status Alerts */}
      {currentUser?.status === UserStatus.PENDING && (
        <div className="rounded-md border border-amber-500/50 bg-amber-500/10 p-4 flex gap-4 items-start">
           <div className="h-8 w-8 bg-amber-500/30 rounded flex items-center justify-center text-amber-500 shrink-0">
              <Lock className="h-4 w-4" />
           </div>
           <div>
             <h3 className="font-bold text-amber-500 text-sm">Nalog čeka odobrenje</h3>
             <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1 leading-relaxed max-w-2xl font-medium">
               Vaša dokumentacija se proverava. Kontakt detalji drugih korisnika su sakriveni dok nalog ne bude odobren.
             </p>
           </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Aktivne Ture', val: myLoads.length, icon: Package, color: 'text-brand-500', bg: 'bg-brand-500/10', border: 'border-brand-500/20' },
          { label: 'Moji Kamioni', val: myTrucks.length, icon: Truck, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
          { label: 'Pregledi', val: '128', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
          { label: 'Paket', val: currentUser?.plan, icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', capitalize: true }
        ].map((stat, i) => (
          <Card key={i} className={`p-4 flex items-center justify-between hover:bg-surfaceHighlight transition-colors border-border`}>
             <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</p>
                <p className={`text-2xl font-bold text-text-main mt-1 ${stat.capitalize ? 'capitalize' : ''}`}>{stat.val}</p>
             </div>
             <div className={`h-10 w-10 rounded ${stat.bg} ${stat.color} border ${stat.border} flex items-center justify-center`}>
                <stat.icon className="h-5 w-5" />
             </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
           <div className="flex items-center justify-between px-1">
              <h3 className="font-bold text-text-main text-sm uppercase tracking-wide">Moje Ture</h3>
              <Link to="/loads" className="text-[10px] text-brand-500 hover:text-brand-400 font-bold uppercase tracking-widest flex items-center gap-1">Pogledaj Sve <ArrowUpRight className="h-3 w-3"/></Link>
           </div>
           {myLoads.length === 0 ? (
             <Card className="p-8 text-center text-text-muted border-dashed border-border bg-transparent">
                Nema aktivnih tura.
             </Card>
           ) : (
             myLoads.slice(0, 3).map(load => (
               <Card key={load.id} className="p-4 flex items-center justify-between group cursor-pointer hover:border-brand-500/30 transition-colors" noPadding>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="info">TURA</Badge>
                      <span className="text-[10px] text-text-muted font-mono">{new Date(load.dateFrom).toLocaleDateString()}</span>
                    </div>
                    <p className="font-bold text-text-main text-sm flex items-center gap-2">
                       {load.originCity} <span className="text-text-muted">→</span> {load.destinationCity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text-main font-mono">{load.price ? `${load.price} ${load.currency}` : '-'}</p>
                    <p className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{load.truckType}</p>
                  </div>
               </Card>
             ))
           )}
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between px-1">
              <h3 className="font-bold text-text-main text-sm uppercase tracking-wide">Moji Kamioni</h3>
              <Link to="/trucks" className="text-[10px] text-brand-500 hover:text-brand-400 font-bold uppercase tracking-widest flex items-center gap-1">Pogledaj Sve <ArrowUpRight className="h-3 w-3"/></Link>
           </div>
           {myTrucks.length === 0 ? (
             <Card className="p-8 text-center text-text-muted border-dashed border-border bg-transparent">
                Nema aktivnih kamiona.
             </Card>
           ) : (
             myTrucks.slice(0, 3).map(truck => (
               <Card key={truck.id} className="p-4 flex items-center justify-between group cursor-pointer hover:border-brand-500/30 transition-colors" noPadding>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="success">KAMION</Badge>
                      <span className="text-[10px] text-text-muted font-mono">{new Date(truck.dateFrom).toLocaleDateString()}</span>
                    </div>
                    <p className="font-bold text-text-main text-sm flex items-center gap-2">
                       {truck.originCity} <span className="text-text-muted">→</span> {truck.destinationCity || 'Bilo gde'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text-main font-mono">{truck.capacity}</p>
                    <p className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{truck.truckType}</p>
                  </div>
               </Card>
             ))
           )}
        </div>
      </div>
    </div>
  );
};