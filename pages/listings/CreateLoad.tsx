import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, Input, Button, Select } from '../../components/UIComponents';
import { UserStatus } from '../../types';

export const CreateLoad = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  // TODO: Implement createLoad function with Supabase
  const createLoad = (data: any) => {
    console.log('Creating load:', data);
    // This will be implemented with SupabaseService.createLoad
  };

  const [form, setForm] = useState({
    originCountry: '',
    originCity: '',
    destinationCountry: '',
    destinationCity: '',
    dateFrom: '',
    truckType: 'Cerada / Tautliner',
    capacity: '',
    price: 0,
    currency: 'EUR',
    description: ''
  });

  if (profile?.status !== UserStatus.APPROVED) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <h2 className="text-2xl font-bold text-text-main">Nalog čeka odobrenje</h2>
        <p className="text-text-muted mt-2 max-w-md">Morate imati odobren nalog da biste objavljivali ture. Molimo sačekajte odobrenje administratora.</p>
        <Button className="mt-6" onClick={() => navigate('/dashboard')}>Nazad</Button>
      </div>
    );
  }

  if (profile?.plan === 'free') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <h2 className="text-2xl font-bold text-text-main">Potreban je upgrade plana</h2>
        <p className="text-text-muted mt-2 max-w-md">Sa FREE planom možete samo pregledati ture. Za objavljovanje potreban je STANDARD ili PRO plan.</p>
        <div className="flex gap-3 mt-6">
          <Button onClick={() => navigate('/pricing')} variant="primary">Pogledaj planove</Button>
          <Button onClick={() => navigate('/dashboard')} variant="outline">Nazad</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLoad(form);
    navigate('/loads');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-text-main">Objavi novu turu</h1>
      <Card className="p-8 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <h3 className="font-semibold text-text-main border-b border-border pb-2">Mesto utovara</h3>
               <Input label="Država" required value={form.originCountry} onChange={e => setForm({...form, originCountry: e.target.value})} />
               <Input label="Grad" required value={form.originCity} onChange={e => setForm({...form, originCity: e.target.value})} />
               <Input label="Datum utovara" type="date" required value={form.dateFrom} onChange={e => setForm({...form, dateFrom: e.target.value})} />
            </div>
            <div className="space-y-4">
               <h3 className="font-semibold text-text-main border-b border-border pb-2">Mesto istovara</h3>
               <Input label="Država" required value={form.destinationCountry} onChange={e => setForm({...form, destinationCountry: e.target.value})} />
               <Input label="Grad" required value={form.destinationCity} onChange={e => setForm({...form, destinationCity: e.target.value})} />
            </div>
          </div>

          <div className="space-y-4 pt-4">
             <h3 className="font-semibold text-text-main border-b border-border pb-2">Detalji tereta</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select 
                  label="Vrsta vozila"
                  value={form.truckType}
                  onChange={e => setForm({...form, truckType: e.target.value})}
                  options={[
                    { value: 'Cerada / Tautliner', label: 'Cerada / Tautliner' },
                    { value: 'Hladnjača', label: 'Hladnjača' },
                    { value: 'Mega', label: 'Mega' },
                    { value: 'Kombi', label: 'Kombi' },
                    { value: 'Otvoreni / Platforma', label: 'Otvoreni / Platforma' },
                  ]}
                />
                <Input label="Kapacitet / Težina" placeholder="npr. 24t, 33 palete" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} />
             </div>
             
             <div className="grid grid-cols-2 gap-6">
                <Input label="Cena (Opciono)" type="number" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} />
                <Select 
                  label="Valuta"
                  value={form.currency}
                  onChange={e => setForm({...form, currency: e.target.value})}
                  options={[{ value: 'EUR', label: 'EUR' }, { value: 'USD', label: 'USD' }, { value: 'RSD', label: 'RSD' }]}
                />
             </div>
             
             <Input label="Opis / Napomene" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>

          <div className="pt-4 flex justify-end gap-3">
             <Button type="button" variant="outline" onClick={() => navigate('/loads')}>Otkaži</Button>
             <Button type="submit">Objavi</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};