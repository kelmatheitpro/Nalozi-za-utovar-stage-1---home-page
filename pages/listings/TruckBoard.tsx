import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Card, Input, Button, Badge } from '../../components/UIComponents';
import { Filter, MapPin, Phone, Lock, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TruckBoard = () => {
  const { trucks, canViewContact, currentUser } = useStore();
  const [filter, setFilter] = useState({ origin: '', destination: '', date: '' });

  const filteredTrucks = trucks.filter(t => {
    const matchOrigin = t.originCountry.toLowerCase().includes(filter.origin.toLowerCase()) || t.originCity.toLowerCase().includes(filter.origin.toLowerCase());
    const matchDest = !t.destinationCountry || t.destinationCountry.toLowerCase().includes(filter.destination.toLowerCase()) || 'any'.includes(filter.destination.toLowerCase());
    const matchDate = filter.date ? t.dateFrom.startsWith(filter.date) : true;
    return matchOrigin && matchDest && matchDate;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Pretraga Kamiona</h1>
        <Link to="/post-truck"><Button>Objavi Kamion</Button></Link>
      </div>

      {/* Filter Bar */}
      <Card className="p-5 sticky top-4 z-20 shadow-lg border-brand-100 ring-1 ring-slate-100">
        <div className="grid md:grid-cols-4 gap-4 items-end">
          <Input 
            label="Trenutna Lokacija" 
            placeholder="Grad ili Država" 
            value={filter.origin}
            onChange={(e) => setFilter({...filter, origin: e.target.value})}
            className="bg-slate-50"
          />
          <Input 
            label="Željena Destinacija" 
            placeholder="Grad ili Država" 
            value={filter.destination}
            onChange={(e) => setFilter({...filter, destination: e.target.value})}
            className="bg-slate-50"
          />
          <Input 
            label="Datum utovara" 
            type="date"
            value={filter.date}
            onChange={(e) => setFilter({...filter, date: e.target.value})}
            className="bg-slate-50"
          />
          <Button variant="outline" className="w-full flex gap-2" onClick={() => setFilter({origin:'', destination:'', date:''})}>
            <Filter className="h-4 w-4" /> Poništi filtere
          </Button>
        </div>
      </Card>

      <div className="space-y-4 pt-2">
        {filteredTrucks.map(truck => {
          const hasAccess = canViewContact(truck);
          return (
            <Card key={truck.id} className="hover:shadow-md transition-all duration-300 group">
               <div className="p-5 flex flex-col md:flex-row gap-6">
                  {/* Info */}
                  <div className="flex-1 space-y-4">
                     <div className="flex items-center gap-3">
                        <Badge variant="success">Slobodan kamion</Badge>
                        <span className="text-sm text-slate-500 font-medium flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5"/> Od: {new Date(truck.dateFrom).toLocaleDateString()}
                        </span>
                     </div>
                     <div className="flex items-center gap-4 sm:gap-8">
                        <div>
                           <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Lokacija</div>
                           <p className="font-bold text-lg text-slate-900">{truck.originCity}</p>
                           <p className="text-sm text-slate-500">{truck.originCountry}</p>
                        </div>

                         <div className="flex-1 flex flex-col items-center justify-center px-4">
                           <div className="w-full h-px bg-slate-200 relative border-t border-dashed border-slate-300">
                             <div className="absolute right-0 -top-1.5 text-slate-300"><ArrowRight className="h-4 w-4"/></div>
                           </div>
                        </div>

                        <div className="text-right">
                           <div className="flex items-center justify-end gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Ide za</div>
                           <p className="font-bold text-lg text-slate-900">{truck.destinationCity || 'Bilo gde'}</p>
                           <p className="text-sm text-slate-500">{truck.destinationCountry}</p>
                        </div>
                     </div>
                     <div className="flex flex-wrap gap-2 text-sm text-slate-600 pt-2">
                        <span className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">{truck.truckType}</span>
                        <span className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">{truck.capacity}</span>
                     </div>
                     {truck.description && <p className="text-sm text-slate-500 italic border-l-2 border-slate-200 pl-3">"{truck.description}"</p>}
                  </div>

                  {/* Company & Contact */}
                   <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between bg-slate-50/30 md:bg-transparent -mx-5 md:mx-0 px-5 md:px-0 pb-2 md:pb-0">
                     <div className="pt-2 md:pt-0">
                        <p className="font-semibold text-slate-900">{truck.companyName}</p>
                        <p className="text-xs text-slate-400 mt-1">Objavljeno {new Date(truck.createdAt).toLocaleTimeString()}</p>
                     </div>
                     
                     <div className="mt-4">
                       {hasAccess ? (
                          <Button variant="secondary" className="w-full gap-2 font-semibold">
                            <Phone className="h-4 w-4" /> Pozovi
                          </Button>
                       ) : (
                          <div className="relative overflow-hidden rounded-lg group cursor-not-allowed">
                             <div className="blur-[3px] bg-slate-100 p-2.5 text-center text-slate-400 select-none font-mono">
                                +381 64 123 456
                             </div>
                             <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
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
         {filteredTrucks.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-500">Nema kamiona koji odgovaraju vašoj pretrazi.</p>
          </div>
        )}
      </div>
    </div>
  );
};