import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import { Button, Card, Badge } from '../components/UIComponents';

export const Pricing = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-white">
      <div className="bg-background border-b border-white/5 pb-20 pt-16">
         <div className="mx-auto max-w-7xl px-4 text-center">
            <Link to="/" className="inline-flex items-center text-xs text-zinc-500 hover:text-white mb-8 transition-colors uppercase tracking-widest">
               <ArrowLeft className="mr-2 h-3 w-3" /> Nazad na početnu
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Transparentan Cenovnik.</h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
               Izaberite paket koji odgovara veličini vašeg poslovanja.
            </p>
         </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 -mt-12 pb-24">
         <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <Card className="p-8 flex flex-col h-full hover-lift border-white/10 bg-surface/50">
               <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">Početni</h3>
                  <p className="text-zinc-500 text-xs mt-2 uppercase tracking-wide">Za nove korisnike</p>
               </div>
               <div className="mb-6">
                  <span className="text-4xl font-bold text-white">0 €</span>
                  <span className="text-zinc-500">/mes</span>
               </div>
               <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-sm text-zinc-300">
                     <Check className="h-5 w-5 text-brand-400 shrink-0" />
                     <span>Pregled svih tura</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-zinc-300">
                     <Check className="h-5 w-5 text-brand-400 shrink-0" />
                     <span>3 objave mesečno</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-zinc-600 opacity-75">
                     <Check className="h-5 w-5 text-zinc-600 shrink-0" />
                     <span>Bez pristupa kontaktima</span>
                  </li>
               </ul>
               <Link to="/register">
                  <Button variant="outline" className="w-full uppercase text-xs tracking-widest">Registruj se</Button>
               </Link>
            </Card>

            {/* Standard */}
            <Card className="p-8 flex flex-col h-full border-brand-500/50 bg-black relative hover-lift shadow-[0_0_30px_rgba(74,222,128,0.1)]">
               <div className="absolute top-0 right-0 p-4">
                  <Badge variant="brand" className="px-2 py-0.5">POPULARNO</Badge>
               </div>
               <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">Standard</h3>
                  <p className="text-zinc-500 text-xs mt-2 uppercase tracking-wide">Za male firme</p>
               </div>
               <div className="mb-6">
                  <span className="text-4xl font-bold text-white text-gradient-green">29 €</span>
                  <span className="text-zinc-500">/mes</span>
               </div>
               <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-sm text-zinc-300">
                     <Check className="h-5 w-5 text-brand-400 shrink-0" />
                     <span>50 kontakata mesečno</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-zinc-300">
                     <Check className="h-5 w-5 text-brand-400 shrink-0" />
                     <span>20 objava mesečno</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-zinc-300">
                     <Check className="h-5 w-5 text-brand-400 shrink-0" />
                     <span>Prioritetna podrška</span>
                  </li>
               </ul>
               <Link to="/register">
                  <Button variant="primary" className="w-full shadow-glow uppercase text-xs tracking-widest">Izaberi Standard</Button>
               </Link>
            </Card>

            {/* Pro */}
            <Card className="p-8 flex flex-col h-full hover-lift border-white/10 bg-surface/50">
               <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">Premium</h3>
                  <p className="text-zinc-500 text-xs mt-2 uppercase tracking-wide">Bez limita</p>
               </div>
               <div className="mb-6">
                  <span className="text-4xl font-bold text-white">99 €</span>
                  <span className="text-zinc-500">/mes</span>
               </div>
               <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-sm text-zinc-300">
                     <Check className="h-5 w-5 text-brand-400 shrink-0" />
                     <span>Neograničen pristup</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-zinc-300">
                     <Check className="h-5 w-5 text-brand-400 shrink-0" />
                     <span>Neograničene objave</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-zinc-300">
                     <Check className="h-5 w-5 text-brand-400 shrink-0" />
                     <span>Istaknute objave</span>
                  </li>
               </ul>
               <Link to="/register">
                  <Button variant="outline" className="w-full uppercase text-xs tracking-widest">Kontaktiraj Prodaju</Button>
               </Link>
            </Card>
         </div>
      </div>
    </div>
  );
};