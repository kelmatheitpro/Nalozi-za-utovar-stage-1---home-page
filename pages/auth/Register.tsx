import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Select, Card } from '../../components/UIComponents';
import { CompanyCategory } from '../../types';
import { TermsOfService } from '../../components/TermsOfService';
import { BALKAN_COUNTRIES, getPhoneCodeByCountry } from '../../utils/countries';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal data
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    jobTitle: '',
    directPhone: '',
    mobilePhone: '',
    personalPhoneCountryCode: '+381',
    
    // Company data
    companyName: '',
    registrationNumber: '',
    category: CompanyCategory.CARRIER,
    country: 'Srbija',
    city: '',
    address: '',
    phone: '',
    companyPhoneCountryCode: '+381',
    companyEmail: '',
    fax: '',
    faxCountryCode: '+381',
    website: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-update phone codes when country changes
    if (name === 'country') {
      const phoneCode = getPhoneCodeByCountry(value);
      setFormData({ 
        ...formData, 
        [name]: value,
        companyPhoneCountryCode: phoneCode,
        faxCountryCode: phoneCode
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Lozinke se ne poklapaju');
      return;
    }

    if (formData.password.length < 6) {
      setError('Lozinka mora imati najmanje 6 karaktera');
      return;
    }

    if (!acceptedTerms) {
      setError('Morate prihvatiti opšte uslove korišćenja');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signUp(formData.email, formData.password, {
        name: formData.name,
        jobTitle: formData.jobTitle,
        directPhone: formData.directPhone,
        mobilePhone: formData.mobilePhone,
        phoneCountryCode: formData.personalPhoneCountryCode,
        company: {
          name: formData.companyName,
          registrationNumber: formData.registrationNumber,
          category: formData.category,
          country: formData.country,
          city: formData.city,
          address: formData.address,
          phone: formData.phone,
          phoneCountryCode: formData.companyPhoneCountryCode,
          email: formData.companyEmail,
          fax: formData.fax,
          faxCountryCode: formData.faxCountryCode,
          website: formData.website,
        }
      });
      
      // Registration successful, but email needs to be confirmed
      setEmailSent(true);
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Provide user-friendly error messages in Serbian
      let errorMessage = 'Greška pri registraciji';
      
      if (error.message?.includes('User already registered')) {
        errorMessage = 'Korisnik sa ovom email adresom već postoji';
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Neispravna email adresa';
      } else if (error.message?.includes('Password')) {
        errorMessage = 'Lozinka mora imati najmanje 6 karaktera';
      } else if (error.message?.includes('firmi')) {
        errorMessage = 'Nalog je kreiran, ali podaci o firmi nisu sačuvani. Možete ih dodati kasnije u profilu.';
      } else if (error.message?.includes('row-level security')) {
        errorMessage = 'Greška u sistemu. Molimo pokušajte ponovo za nekoliko sekundi.';
      } else if (error.message?.includes('AbortError') || error.message?.includes('signal is aborted')) {
        errorMessage = 'Registracija je možda uspešna. Proverite vaš email za potvrdu i pokušajte da se prijavite.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[100px]"></div>
        
        <div className="w-full max-w-md relative z-10">
          <Card className="p-8 border-border shadow-2xl bg-surface/80 backdrop-blur-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-2">Proverite vaš email</h2>
              <p className="text-text-muted mb-6 leading-relaxed">
                Poslali smo vam email na <strong>{formData.email}</strong> sa linkom za potvrdu naloga. 
                Kliknite na link u email-u da potvrdite vašu registraciju.
              </p>
              <div className="space-y-3">
                <p className="text-xs text-text-muted">
                  Ne vidite email? Proverite spam folder ili pokušajte ponovo za nekoliko minuta.
                </p>
                <Link to="/login" className="block">
                  <Button variant="primary" className="w-full">
                    Nazad na prijavu
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
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[100px]"></div>
        
        <div className="w-full max-w-md relative z-10">
          <Card className="p-8 border-border shadow-2xl bg-surface/80 backdrop-blur-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-brand-500" />
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-2">Registracija uspešna!</h2>
              <p className="text-text-muted mb-6 leading-relaxed">
                Vaš nalog je kreiran i čeka odobrenje administratora. 
                Bićete obavešteni putem email-a kada bude odobren.
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
        </div>
      </div>
    );
  }

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
             <div className="h-full bg-brand-500 transition-all duration-500 shadow-[0_0_10px_#4ade80]" style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}></div>
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
                   <Input name="jobTitle" label="Pozicija u firmi" value={formData.jobTitle} onChange={handleChange} placeholder="npr. Direktor, Špediter..." />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <Input name="email" label="Email Adresa" type="email" required value={formData.email} onChange={handleChange} />
                   <div className="grid grid-cols-3 gap-2">
                     <Select 
                       name="personalPhoneCountryCode" 
                       label="Kod" 
                       value={formData.personalPhoneCountryCode} 
                       onChange={handleChange}
                       options={BALKAN_COUNTRIES.map(c => ({ value: c.phoneCode, label: c.phoneCode }))}
                     />
                     <div className="col-span-2">
                       <Input name="directPhone" label="Direktan telefon" value={formData.directPhone} onChange={handleChange} placeholder="11 123 4567" />
                     </div>
                   </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <Input name="mobilePhone" label="Mobilni telefon" value={formData.mobilePhone} onChange={handleChange} placeholder="64 123 4567" />
                   <div></div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <Input 
                     name="password" 
                     label="Lozinka" 
                     type="password" 
                     required 
                     value={formData.password} 
                     onChange={handleChange}
                     placeholder="Najmanje 6 karaktera"
                   />
                   <Input 
                     name="confirmPassword" 
                     label="Potvrdi Lozinku" 
                     type="password" 
                     required 
                     value={formData.confirmPassword} 
                     onChange={handleChange}
                     placeholder="Ponovi lozinku"
                   />
                </div>
                
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
                   <Select 
                     name="country" 
                     label="Država" 
                     required 
                     value={formData.country} 
                     onChange={handleChange}
                     options={BALKAN_COUNTRIES.map(c => ({ value: c.name, label: c.name }))}
                   />
                   <Input name="city" label="Grad" required value={formData.city} onChange={handleChange} />
                </div>
                
                <Input name="address" label="Adresa" required value={formData.address} onChange={handleChange} />
                
                <div className="grid grid-cols-2 gap-6">
                   <div className="grid grid-cols-3 gap-2">
                     <Select 
                       name="companyPhoneCountryCode" 
                       label="Kod" 
                       value={formData.companyPhoneCountryCode} 
                       onChange={handleChange}
                       options={BALKAN_COUNTRIES.map(c => ({ value: c.phoneCode, label: c.phoneCode }))}
                     />
                     <div className="col-span-2">
                       <Input name="phone" label="Telefon firme" required value={formData.phone} onChange={handleChange} placeholder="11 123 4567" />
                     </div>
                   </div>
                   <Input name="companyEmail" label="Email Firme" type="email" required value={formData.companyEmail} onChange={handleChange} />
                </div>

                <div className="pt-6 flex gap-4">
                   <Button type="button" variant="outline" className="flex-1 uppercase tracking-wide text-xs" onClick={() => setStep(1)}>Nazad</Button>
                   <Button 
                     type="button" 
                     variant="primary" 
                     className="flex-1 uppercase tracking-wide text-xs"
                     onClick={() => setStep(3)}
                   >
                     Nastavi
                   </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                   <h3 className="text-lg font-bold text-white">Dodatni Podaci</h3>
                   <p className="text-xs text-zinc-500 uppercase tracking-wide">Opciono</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="grid grid-cols-3 gap-2">
                     <Select 
                       name="faxCountryCode" 
                       label="Kod" 
                       value={formData.faxCountryCode} 
                       onChange={handleChange}
                       options={BALKAN_COUNTRIES.map(c => ({ value: c.phoneCode, label: c.phoneCode }))}
                     />
                     <div className="col-span-2">
                       <Input name="fax" label="Faks" value={formData.fax} onChange={handleChange} placeholder="11 123 4567" />
                     </div>
                   </div>
                   <Input name="website" label="Web sajt" value={formData.website} onChange={handleChange} placeholder="www.firma.rs" />
                </div>
                
                {/* Terms of Service */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white">Opšti uslovi korišćenja</h4>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowTerms(!showTerms)}
                      className="text-xs"
                    >
                      {showTerms ? 'Sakrij' : 'Prikaži'} uslove
                    </Button>
                  </div>
                  
                  {showTerms && <TermsOfService />}
                  
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 text-brand-500 focus:ring-brand-500 border-border rounded"
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-text-muted leading-relaxed">
                      Prihvatam <button 
                        type="button" 
                        onClick={() => setShowTerms(true)}
                        className="text-brand-500 hover:text-brand-400 underline"
                      >
                        opšte uslove korišćenja
                      </button> sistema TeretLink
                    </label>
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                   <Button type="button" variant="outline" className="flex-1 uppercase tracking-wide text-xs" onClick={() => setStep(2)}>Nazad</Button>
                   <Button 
                     type="submit" 
                     variant="primary" 
                     className="flex-1 uppercase tracking-wide text-xs shadow-glow"
                     disabled={loading || !acceptedTerms}
                   >
                     {loading ? 'Registracija...' : 'Završi Registraciju'}
                   </Button>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 mt-4">
                    <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-red-500 text-sm">{error}</span>
                  </div>
                )}
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};