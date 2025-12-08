import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Button, Input, Select, Card } from '../../components/UIComponents';
import { CompanyCategory } from '../../types';
import { ArrowLeft } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useStore();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    registrationNumber: '',
    category: CompanyCategory.CARRIER,
    country: '',
    city: '',
    address: '',
    phone: '',
    companyEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      name: formData.name,
      email: formData.email,
      company: {
        name: formData.companyName,
        registrationNumber: formData.registrationNumber,
        category: formData.category,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        phone: formData.phone,
        email: formData.companyEmail,
      }
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
       {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-2xl space-y-8 relative z-10">
         <div className="text-center relative">
          <Link to="/" className="absolute left-0 top-1 inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-medium text-xs uppercase tracking-wide">
            <ArrowLeft className="h-3 w-3" /> Nazad
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-white">Registracija</h2>
          <p className="mt-2 text-zinc-500 text-sm">
            Pridružite se mreži najboljih transportnih firmi.
          </p>
        </div>

        <Card className="p-10 shadow-2xl border-white/10 relative overflow-hidden bg-surface/80 backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-zinc-800">
             <div className="h-full bg-brand-500 transition-all duration-500 shadow-[0_0_10px_#4ade80]" style={{ width: step === 1 ? '50%' : '100%' }}></div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                   <h3 className="text-lg font-bold text-white">Lični Podaci</h3>
                   <p className="text-xs text-zinc-500 uppercase tracking-wide">Kontakt Osoba</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <Input name="name" label="Ime i Prezime" required value={formData.name} onChange={handleChange} />
                   <Input name="email" label="Email Adresa" type="email" required value={formData.email} onChange={handleChange} />
                </div>
                <Input label="Lozinka" type="password" disabled placeholder="Automatski generisano za demo" />
                
                <div className="pt-4">
                   <Button type="button" className="w-full h-11 uppercase tracking-wide text-xs" onClick={() => setStep(2)}>Nastavi</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                   <h3 className="text-lg font-bold text-white">Podaci o Firmi</h3>
                   <p className="text-xs text-zinc-500 uppercase tracking-wide">Verifikacija Poslovanja</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <Input name="companyName" label="Naziv Firme" required value={formData.companyName} onChange={handleChange} />
                   <Input name="registrationNumber" label="PIB / Matični Broj" required value={formData.registrationNumber} onChange={handleChange} />
                </div>
                
                <Select 
                  name="category" 
                  label="Kategorija" 
                  value={formData.category} 
                  onChange={handleChange}
                  options={Object.values(CompanyCategory).map(c => ({ value: c, label: c }))}
                />

                <div className="grid grid-cols-2 gap-6">
                   <Input name="country" label="Država" required value={formData.country} onChange={handleChange} />
                   <Input name="city" label="Grad" required value={formData.city} onChange={handleChange} />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                   <Input name="phone" label="Telefon" required value={formData.phone} onChange={handleChange} />
                   <Input name="companyEmail" label="Email Firme" type="email" required value={formData.companyEmail} onChange={handleChange} />
                </div>

                <div className="pt-6 flex gap-4">
                   <Button type="button" variant="outline" className="flex-1 uppercase tracking-wide text-xs" onClick={() => setStep(1)}>Nazad</Button>
                   <Button type="submit" variant="primary" className="flex-1 uppercase tracking-wide text-xs shadow-glow">Završi Registraciju</Button>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};