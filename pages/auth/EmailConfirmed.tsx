import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../../components/UIComponents';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export const EmailConfirmed = () => {
  useEffect(() => {
    // Ako korisnik dolazi direktno sa email linka, možda treba da sačeka da se auth state ažurira
    const timer = setTimeout(() => {
      console.log('EmailConfirmed page loaded - user should see confirmation message');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors text-sm mb-6">
            <ArrowLeft className="h-4 w-4" />
            Nazad na početnu
          </Link>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-8 w-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white dark:text-black font-black text-lg leading-none">T</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-bold tracking-tight text-text-main">Teret</span>
              <span className="text-xl font-bold tracking-tight text-brand-500">Link</span>
            </div>
          </div>
        </div>

        <Card className="p-8 border-border shadow-2xl bg-surface/80 backdrop-blur-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-brand-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-text-main mb-2">Email uspešno potvrđen!</h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              Vaš email je uspešno potvrđen i vaš nalog je kreiran. Vaša prijava se trenutno pregleda od strane administratora. 
              Bićete obavešteni putem email-a kada vaš nalog bude odobren i možete početi da koristite platformu.
            </p>

            <div className="space-y-3">
              <Link to="/login" className="block">
                <Button variant="primary" className="w-full">
                  Idite na prijavu
                </Button>
              </Link>
              <Link to="/" className="block">
                <Button variant="outline" className="w-full">
                  Nazad na početnu
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-text-muted">
            Imate pitanja? Kontaktirajte nas na{' '}
            <a href="mailto:support@teretlink.com" className="text-brand-500 hover:text-brand-400">
              support@teretlink.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};