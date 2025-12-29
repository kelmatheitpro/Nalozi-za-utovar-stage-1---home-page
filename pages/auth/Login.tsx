import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Button, Input, Card } from '../../components/UIComponents';
import { ArrowLeftRight } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Pogrešan email ili korisnik ne postoji.');
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    login(demoEmail).then(() => navigate('/dashboard'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <Link to="/" className="mx-auto inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 bg-brand-400 rounded-sm flex items-center justify-center text-black shadow-glow">
                <ArrowLeftRight className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold text-text-main">Nalozi<span className="text-text-muted">.</span></span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-text-main">Dobrodošli nazad</h2>
          <p className="mt-2 text-text-muted text-sm">
            Nemate nalog? <Link to="/register" className="text-brand-500 hover:text-brand-400 font-medium">Registrujte se</Link>
          </p>
        </div>

        <Card className="p-8 border-border shadow-2xl bg-surface/80 backdrop-blur-xl">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Email adresa"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ime@firma.com"
              error={error}
            />
            <div className="space-y-1">
               <div className="flex justify-between">
                  <label className="block text-sm font-medium text-text-muted">Lozinka</label>
                  <Link to="/forgot-password" className="text-xs text-brand-500 hover:text-brand-400">Zaboravljena lozinka?</Link>
               </div>
               <Input
                 type="password"
                 placeholder="••••••••"
                 disabled
               />
            </div>
            <Button type="submit" className="w-full h-11 text-sm font-bold shadow-glow uppercase tracking-wide" size="md" variant="primary">Prijavi se</Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-[10px] font-bold text-text-muted text-center uppercase tracking-widest mb-4">Brzi Demo Pristup</p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin('admin@loadboardx.com')}>
                Admin
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin('carrier@example.com')}>
                Prevoznik
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};