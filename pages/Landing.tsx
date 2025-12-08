
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Check, Package, Zap, BarChart, ArrowLeftRight, Shield, Bell, Map, Search, ChevronRight, Play, LayoutGrid, Smartphone, Mail, Sun, Moon, Users, Globe, Clock, HelpCircle, FileText, Navigation, Filter, Sliders, X, MousePointer2, ShieldCheck, Box, Wifi, Home, User, Plus, Battery, Quote, Star, TrendingUp } from 'lucide-react';
import { Button, Badge, Card, cn } from '../components/UIComponents';
import { useStore } from '../context/StoreContext';

export const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0); // 0: Alarms, 1: Matching, 2: Analytics
  const { theme, toggleTheme } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { 
      title: 'Email & SMS Alarmi', 
      desc: 'Budite obavešteni istog trenutka kada se pojavi tura koja vam odgovara.',
      icon: Bell
    },
    { 
      title: 'Pametno Povezivanje', 
      desc: 'Sistem automatski prepoznaje prazne kamione i nudi im teret u blizini.',
      icon: Zap
    },
    { 
      title: 'Istorija i Analitika', 
      desc: 'Pratite cene i kretanja na tržištu kroz detaljnu statistiku.',
      icon: BarChart
    }
  ];

  const testimonials = [
    {
      name: "Marko Jovanović",
      role: "Direktor",
      company: "Balkan Trans Logistike",
      quote: "Nalozi za utovar su nam uštedeli sate telefoniranja. Pronašli smo povratne ture za 80% naših kamiona u prva tri meseca korišćenja.",
      metric: "Profit ↑ 30%",
      rating: 5
    },
    {
      name: "Jelena Stanković",
      role: "Menadžer Transporta",
      company: "EuroŠped Line",
      quote: "Najbolja platforma za domaći transport. Verifikacija firmi nam uliva poverenje da radimo samo sa ozbiljnim partnerima.",
      metric: "Ušteda 15h/ned",
      rating: 5
    },
    {
      name: "Dejan Ilić",
      role: "Vlasnik",
      company: "Ilić Prevoz",
      quote: "Kao mali prevoznik, teško sam dolazio do direktnih klijenata. Ova platforma mi je omogućila da popunim kamion bez posrednika.",
      metric: "Novi Klijenti",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-text-main selection:bg-brand-500/30 selection:text-brand-500 overflow-x-hidden transition-colors duration-300">
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-background/90 backdrop-blur-md border-border py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
             <div className="h-6 w-6 bg-brand-400 rounded-sm flex items-center justify-center text-black shadow-glow">
                <ArrowLeftRight className="h-3.5 w-3.5" />
             </div>
             <span className="text-lg font-bold tracking-tight text-text-main">Nalozi<span className="text-text-muted">.</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
             <a href="#features" className="text-xs font-medium text-text-muted hover:text-text-main transition-colors uppercase tracking-widest">Mogućnosti</a>
             <Link to="/pricing" className="text-xs font-medium text-text-muted hover:text-text-main transition-colors uppercase tracking-widest">Cenovnik</Link>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-text-muted hover:text-text-main transition-colors">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/login" className="hidden sm:block text-xs font-medium text-text-muted hover:text-text-main transition-colors uppercase tracking-widest">
              Prijavi se
            </Link>
            <Link to="/register">
              <Button size="sm" variant="primary">
                 REGISTRUJ SE
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-48 px-6 border-b border-border overflow-hidden">
         {/* Traffic Animation Background */}
         <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-[60%] w-[200%] h-px bg-gradient-to-r from-transparent via-text-muted to-transparent border-t border-dashed border-text-muted/50 animate-traffic"></div>
            <div className="absolute top-[65%] w-[200%] h-px bg-gradient-to-r from-transparent via-text-muted to-transparent border-t border-dashed border-text-muted/30 animate-traffic" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
         </div>
         
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500/10 via-background to-background pointer-events-none"></div>
         
         <div className="mx-auto max-w-5xl text-center relative z-10">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-8 animate-fade-in backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">MODERNA BERZA TRANSPORTA</span>
                <span className="text-[10px] text-text-muted">→</span>
             </div>
             
             <h1 className="text-5xl md:text-7xl font-bold text-text-main mb-6 leading-[1.1] tracking-tight animate-slide-up">
                Pronađite savršen teret <br/>
                za svaki <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">kamion.</span>
             </h1>
             
             <p className="text-lg text-text-muted mb-10 leading-relaxed max-w-2xl mx-auto animate-slide-up animation-delay-100 font-light">
               Nalozi za utovar je napredna platforma koja povezuje prevoznike i špeditere. 
               Bez posrednika, bez skrivenih troškova.
             </p>
             
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-200">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button size="md" variant="primary" className="w-full sm:w-auto px-8 uppercase tracking-wide text-xs">
                    Počnite Besplatno
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button size="md" variant="outline" className="w-full sm:w-auto px-8 uppercase tracking-wide text-xs">
                    Prijavi se
                  </Button>
                </Link>
             </div>
         </div>

         {/* Dashboard Image Mockup */}
         <div className="mt-32 mx-auto max-w-6xl relative animate-slide-up animation-delay-300">
            <div className="rounded-xl border border-border bg-surface/80 backdrop-blur-sm p-2 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/5 via-transparent to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
               
               {/* Mock UI Header */}
               <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-surfaceHighlight/50">
                  <div className="flex items-center gap-4">
                     <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                     </div>
                     <div className="h-4 w-px bg-border mx-2"></div>
                     <div className="flex gap-4 text-[10px] font-mono text-text-muted">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> Online</span>
                        <span>v2.4.0</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="text-[10px] font-bold text-text-muted bg-surface px-2 py-1 rounded border border-border">PROFIL: TRANS-LOGISTIK DOO</div>
                  </div>
               </div>
               
               {/* Mock Content */}
               <div className="aspect-[16/9] md:aspect-[21/9] bg-background relative overflow-hidden flex">
                  {/* Mock Sidebar */}
                  <div className="w-48 border-r border-border p-4 space-y-4 hidden md:flex flex-col bg-surface/30">
                     <div className="space-y-1 mb-6">
                        <div className="h-8 w-full bg-brand-500/10 border border-brand-500/20 rounded flex items-center px-3 text-brand-500 text-xs font-bold gap-2">
                           <LayoutGrid className="h-3.5 w-3.5" />
                           Kontrolna Tabla
                        </div>
                        <div className="h-8 w-full hover:bg-surface rounded flex items-center px-3 text-text-muted text-xs font-medium gap-2 transition-colors">
                           <Package className="h-3.5 w-3.5" />
                           Moje Ture
                        </div>
                        <div className="h-8 w-full hover:bg-surface rounded flex items-center px-3 text-text-muted text-xs font-medium gap-2 transition-colors">
                           <Truck className="h-3.5 w-3.5" />
                           Moji Kamioni
                        </div>
                     </div>
                     
                     <div className="mt-auto p-3 bg-surface rounded border border-border">
                        <div className="text-[10px] text-text-muted mb-1">Pretplata</div>
                        <div className="text-xs text-text-main font-bold">Premium Paket</div>
                        <div className="w-full bg-surfaceHighlight h-1 mt-2 rounded-full overflow-hidden">
                           <div className="w-3/4 h-full bg-brand-500"></div>
                        </div>
                     </div>
                  </div>
                  
                  {/* Mock Main Area */}
                  <div className="flex-1 p-6 flex flex-col">
                     {/* Stats Row */}
                     <div className="grid grid-cols-4 gap-4 mb-6">
                        {[
                           { label: 'Aktivne Ture', val: '12', color: 'text-text-main' },
                           { label: 'Slobodni Kamioni', val: '5', color: 'text-brand-500' },
                           { label: 'Zarada (Okt)', val: '€14.2k', color: 'text-text-main' },
                           { label: 'Pregleda', val: '843', color: 'text-text-muted' },
                        ].map((stat, i) => (
                           <div key={i} className="bg-surface border border-border rounded p-3">
                              <div className="text-[9px] uppercase tracking-wider text-text-muted font-bold mb-1">{stat.label}</div>
                              <div className="text-xl font-mono font-bold text-text-main">{stat.val}</div>
                           </div>
                        ))}
                     </div>

                     <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-bold text-text-main">Poslednje Ture</div>
                        <div className="h-6 px-3 bg-brand-500 hover:bg-brand-400 rounded text-black text-[10px] font-bold flex items-center uppercase tracking-wide cursor-pointer transition-colors">
                           + Nova Tura
                        </div>
                     </div>
                     
                     {/* Detailed Table Header */}
                     <div className="grid grid-cols-12 gap-4 px-3 py-2 border-b border-border text-[9px] font-bold text-text-muted uppercase tracking-widest">
                        <div className="col-span-4">Relacija</div>
                        <div className="col-span-2">Datum</div>
                        <div className="col-span-3">Vozilo</div>
                        <div className="col-span-2 text-right">Cena</div>
                        <div className="col-span-1 text-right">Status</div>
                     </div>

                     {/* Mock List Items */}
                     <div className="space-y-2 mt-2">
                        {[
                           { from: 'Beograd', to: 'Minhen', date: 'Danas', type: 'Cerada', price: '1,200 €', status: 'active' },
                           { from: 'Zagreb', to: 'Milano', date: 'Sutra', type: 'Hladnjača', price: '950 €', status: 'pending' },
                           { from: 'Niš', to: 'Ljubljana', date: '20. Okt', type: 'Mega', price: 'Na upit', status: 'active' },
                        ].map((row, i) => (
                           <div key={i} className="grid grid-cols-12 gap-4 items-center h-10 px-3 rounded border border-border bg-surface/50 hover:bg-surfaceHighlight transition-colors group cursor-pointer">
                              <div className="col-span-4 flex items-center gap-2 text-xs text-text-main font-medium">
                                 <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                                 {row.from} <span className="text-text-muted">→</span> {row.to}
                              </div>
                              <div className="col-span-2 text-[10px] text-text-muted">{row.date}</div>
                              <div className="col-span-3">
                                 <span className="bg-background text-text-muted px-1.5 py-0.5 rounded text-[9px] border border-border">{row.type}</span>
                              </div>
                              <div className="col-span-2 text-right text-xs font-mono font-bold text-text-main">{row.price}</div>
                              <div className="col-span-1 text-right">
                                 <div className={`w-2 h-2 rounded-full ml-auto ${row.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-amber-500'}`}></div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="mt-12 text-center relative z-20">
             <p className="text-sm font-bold text-text-main mb-8 uppercase tracking-widest opacity-80">
               Veruju nam vodeće kompanije u regionu
             </p>
             <div className="flex flex-wrap justify-center gap-12 mt-8">
               {['BALKAN TRANS', 'Logistika Pro', 'CargoAgent', 'SPEED', 'EuroŠped', 'TransportLine'].map((name, i) => (
                  <div key={i} className="text-lg font-bold text-text-main transition-colors duration-300 font-mono tracking-tighter cursor-default text-text-muted hover:text-text-main transition-colors relative z-20">{name}</div>
               ))}
            </div>
         </div>
      </section>

      {/* Metrics Strip */}
      <section className="border-b border-border bg-surface/30 py-16">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Realizovanih tura', val: '15,000+', icon: Package },
            { label: 'Registrovanih firmi', val: '2,400+', icon: Users },
            { label: 'Zemalja pokriveno', val: '24', icon: Globe },
            { label: 'Uspešnost', val: '98.5%', icon: Check },
          ].map((stat, i) => (
            <div key={i} className="space-y-2 group">
              <div className="flex justify-center text-brand-500 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-text-main tracking-tight font-mono">{stat.val}</div>
              <div className="text-xs font-bold text-text-muted uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid Section (Bento) */}
      <section id="features" className="py-32 bg-surface border-b border-border bg-dot-pattern">
         <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16">
               <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 bg-brand-400 rounded-full"></div>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">INOVACIJA</span>
               </div>
               <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
                  Logistika bez granica.
               </h2>
               <p className="text-text-muted text-lg font-light">Alati nove generacije koji pretvaraju haotičnu komunikaciju u uređen sistem.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
               {/* Large Card 1: Dispatcher Tool - 3D Glass Stack */}
               <Card className="p-0 overflow-hidden bg-background border-border h-[420px] relative group hover:border-brand-500/30 perspective-1000">
                  {/* Content Container - Fixed to Top-Left */}
                  <div className="absolute top-8 left-8 z-20 pointer-events-none max-w-[280px]">
                     <h3 className="text-xl font-bold text-text-main mb-2">Komandni centar za dispečere</h3>
                     <p className="text-text-muted text-sm leading-relaxed">Zamenite Excel tabele i Viber grupe jednim inteligentnim interfejsom.</p>
                     <div className="mt-6 pointer-events-auto">
                        <Link to="/login">
                           <Button size="sm" variant="outline" className="uppercase text-[10px] tracking-widest group-hover:bg-brand-500 group-hover:text-black group-hover:border-brand-500 transition-all">Isprobaj Demo ↗</Button>
                        </Link>
                     </div>
                  </div>
                  
                  {/* 3D Visual - Absolute Positioned to Bottom-Right */}
                  <div className="absolute top-[25%] -right-8 w-[85%] md:w-[70%] h-full transform-style-3d rotate-y-[-12deg] rotate-x-[5deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-all duration-700 ease-out z-10">
                     {/* Card 1 */}
                     <div className="absolute top-0 w-full bg-surface border border-border rounded-tl-xl shadow-2xl p-4 flex gap-3 opacity-100 z-30 translate-x-4">
                        <div className="w-8 h-8 rounded bg-brand-500/10 flex items-center justify-center text-brand-500"><Truck className="h-4 w-4"/></div>
                        <div className="flex-1">
                           <div className="h-2 w-24 bg-text-main/10 rounded mb-2"></div>
                           <div className="h-2 w-16 bg-text-main/5 rounded"></div>
                        </div>
                        <div className="px-2 py-0.5 bg-brand-500 text-black text-[10px] font-bold rounded h-fit">MATCH</div>
                     </div>
                     {/* Card 2 */}
                     <div className="absolute top-20 w-full bg-surface/80 border border-border rounded-tl-xl shadow-xl p-4 flex gap-3 opacity-80 z-20 scale-95 -translate-x-2">
                         <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500"><Package className="h-4 w-4"/></div>
                        <div className="flex-1">
                           <div className="h-2 w-24 bg-text-main/10 rounded mb-2"></div>
                           <div className="h-2 w-16 bg-text-main/5 rounded"></div>
                        </div>
                     </div>
                     {/* Card 3 */}
                      <div className="absolute top-40 w-full bg-surface/60 border border-border rounded-tl-xl shadow-lg p-4 flex gap-3 opacity-60 z-10 scale-90 -translate-x-8">
                         <div className="w-8 h-8 rounded bg-amber-500/10 flex items-center justify-center text-amber-500"><Bell className="h-4 w-4"/></div>
                        <div className="flex-1">
                           <div className="h-2 w-24 bg-text-main/10 rounded mb-2"></div>
                           <div className="h-2 w-16 bg-text-main/5 rounded"></div>
                        </div>
                     </div>
                  </div>
               </Card>

               {/* Large Card 2: Network - Holographic Plane */}
               <Card className="p-0 overflow-hidden bg-background border-border h-[420px] relative group hover:border-brand-500/30">
                  {/* Text Container - Protected by Gradient */}
                  <div className="absolute top-0 left-0 w-full p-8 z-20 pointer-events-none bg-gradient-to-b from-background via-background/80 to-transparent">
                     <h3 className="text-xl font-bold text-text-main mb-2">Mreža od poverenja</h3>
                     <p className="text-text-muted text-sm leading-relaxed max-w-[280px]">Povežite se sa preko 2,000 verifikovanih firmi širom Balkana i EU.</p>
                     <div className="flex gap-2 mt-6 pointer-events-auto">
                        <Button size="sm" variant="outline" className="uppercase text-[10px] tracking-widest backdrop-blur-md bg-background/50">Pretraži Firme ↗</Button>
                     </div>
                  </div>
                  
                  {/* Massive Graphic - Full Coverage */}
                  <div className="absolute bottom-0 left-0 w-full h-[60%] z-10">
                     <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
                        {/* Background Perspective Grid - hidden in light mode via css variable */}
                        <g opacity="0.1" stroke="var(--grid-line-color)" strokeWidth="1">
                           {[0, 100, 200, 300, 400, 500, 600].map(x => (
                              <line key={`v${x}`} x1={300} y1={0} x2={x} y2={400} />
                           ))}
                           {[400, 350, 310, 280, 260, 240, 220].map((y, i) => (
                              <line key={`h${i}`} x1={0} y1={y} x2={600} y2={y} opacity={1 - i * 0.1} />
                           ))}
                        </g>

                        {/* Connection Network */}
                        <g>
                           {[
                              { start: [300, 280], end: [100, 150], d: '0s' },
                              { start: [300, 280], end: [500, 150], d: '1.2s' },
                              { start: [300, 280], end: [200, 120], d: '2.5s' },
                              { start: [300, 280], end: [400, 120], d: '0.5s' },
                              { start: [300, 280], end: [300, 100], d: '3s' },
                           ].map((line, i) => (
                              <g key={i}>
                                 {/* Static Line */}
                                 <line 
                                    x1={line.start[0]} y1={line.start[1]} 
                                    x2={line.end[0]} y2={line.end[1]} 
                                    stroke="var(--border)" 
                                    strokeWidth="1" 
                                    strokeDasharray="4 4" 
                                 />
                                 {/* Moving Packet - Hardcoded Green */}
                                 <circle r="3" fill="#22C55E">
                                    <animateMotion 
                                       dur="4s" 
                                       repeatCount="indefinite"
                                       path={`M${line.start[0]},${line.start[1]} L${line.end[0]},${line.end[1]}`}
                                       keyPoints="0;1"
                                       keyTimes="0;1"
                                       calcMode="linear"
                                       begin={line.d}
                                    />
                                    <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" begin={line.d} />
                                 </circle>
                                 {/* Target Node - Clean Circle without beams */}
                                 <g transform={`translate(${line.end[0]}, ${line.end[1]})`}>
                                    <circle r="6" fill="var(--surface)" stroke="var(--brand-500)" strokeWidth="2">
                                       <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite" begin={line.d} />
                                       <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" begin={line.d} />
                                    </circle>
                                 </g>
                              </g>
                           ))}
                        </g>

                        {/* Central Hub (Shield) - Centered with Flexbox in ForeignObject */}
                        <foreignObject x="270" y="250" width="60" height="60">
                           <div className="flex items-center justify-center w-full h-full relative">
                              <div className="absolute inset-0 rounded-full bg-brand-500/10 animate-ping"></div>
                              <div className="absolute inset-2 rounded-full border border-border bg-surface flex items-center justify-center z-10">
                                 <ShieldCheck className="w-6 h-6 text-brand-500" />
                              </div>
                           </div>
                        </foreignObject>
                     </svg>
                  </div>
               </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
               
               {/* Small Card 3: Smart Filters (Tag Cloud) */}
               <Card className="p-6 bg-background border-border min-h-[300px] flex flex-col justify-between hover:border-brand-500/30 transition-colors group">
                  <div className="bg-surface border border-border rounded-lg p-6 h-36 mb-6 relative overflow-hidden flex flex-col items-center justify-center gap-2">
                     {/* Search Input Mock */}
                     <div className="w-full h-8 bg-surfaceHighlight rounded border border-border mb-2 flex items-center px-3 gap-2">
                        <Search className="h-3 w-3 text-text-muted" />
                        <div className="h-2 w-16 bg-text-muted/20 rounded"></div>
                     </div>
                     {/* Tags */}
                     <div className="flex flex-wrap gap-2 justify-center">
                        {[
                           { l: 'SRB -> DE', active: true, delay: '0s' },
                           { l: 'Hladnjača', active: false, delay: '1s' },
                           { l: 'Hitno', active: false, delay: '2s' },
                           { l: '< 24t', active: true, delay: '1.5s' },
                        ].map((tag, i) => (
                           <div 
                              key={i}
                              className={cn(
                                 "px-2 py-1 rounded text-[10px] font-bold border transition-all duration-500",
                                 "animate-pulse",
                                 tag.active 
                                    ? "bg-brand-500/20 border-brand-500/50 text-brand-500" 
                                    : "bg-background border-border text-text-muted"
                              )}
                              style={{ animationDelay: tag.delay, animationDuration: '3s' }}
                           >
                              {tag.l}
                           </div>
                        ))}
                     </div>
                     {/* Cursor - Fixed */}
                     <div className="absolute bottom-4 right-8 z-10">
                        <MousePointer2 className="h-5 w-5 fill-text-main text-background animate-bounce" />
                     </div>
                  </div>
                  <div>
                     <h4 className="text-text-main font-bold mb-1">Napredni Filteri</h4>
                     <p className="text-xs text-text-muted">Fino podešavanje pretrage kao na mikseti.</p>
                  </div>
               </Card>

               {/* Small Card 4: Route Estimation (SVG Precision) */}
               <Card className="p-6 bg-background border-border min-h-[300px] flex flex-col justify-between hover:border-brand-500/30 transition-colors group">
                   <div className="bg-surface border border-border rounded-lg h-36 mb-6 flex items-center justify-center relative overflow-hidden">
                     <svg className="w-full h-full p-4" viewBox="0 0 200 100">
                        {/* Path Line */}
                        <path d="M 20 50 Q 100 20 180 50" fill="none" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" />
                        
                        {/* Animated Path */}
                        <path d="M 20 50 Q 100 20 180 50" fill="none" stroke="var(--brand-500)" strokeWidth="2" strokeLinecap="round" className="animate-[draw-loop_3s_ease-in-out_infinite]" strokeDasharray="200" strokeDashoffset="200" />
                        
                        {/* Start Dot */}
                        <circle cx="20" cy="50" r="4" fill="var(--surface)" stroke="var(--text-main)" strokeWidth="2" />
                        
                        {/* End Dot */}
                        <circle cx="180" cy="50" r="4" fill="var(--brand-500)" />
                        
                        {/* Drone/Vehicle moving along path */}
                        <circle r="4" fill="var(--text-main)">
                           <animateMotion repeatCount="indefinite" dur="3s" path="M 20 50 Q 100 20 180 50" keyPoints="0;1;1" keyTimes="0;0.5;1" calcMode="linear" />
                        </circle>
                     </svg>
                     
                     <div className="bg-background border border-border px-2 py-1 rounded text-[10px] font-mono text-text-main absolute top-2 right-2">
                        1,240 km
                     </div>
                  </div>
                  <div>
                     <h4 className="text-text-main font-bold mb-1">Pametno Rutiranje</h4>
                     <p className="text-xs text-text-muted">Precizna kalkulacija rute i troškova.</p>
                  </div>
               </Card>

               {/* Small Card 5: Verification (Laser Scan) */}
               <Card className="p-6 bg-background border-border min-h-[300px] flex flex-col justify-between hover:border-brand-500/30 transition-colors group">
                   <div className="bg-surface border border-border rounded-lg p-4 h-36 mb-6 relative flex flex-col items-center justify-center gap-3 overflow-hidden">
                      <div className="w-16 h-20 bg-background border border-border rounded shadow-sm flex flex-col items-center p-2 relative z-10">
                         <div className="w-8 h-8 rounded-full bg-surfaceHighlight mb-2"></div>
                         <div className="w-10 h-1 bg-surfaceHighlight rounded mb-1"></div>
                         <div className="w-8 h-1 bg-surfaceHighlight rounded"></div>
                         
                         {/* Laser Line */}
                         <div className="absolute left-0 w-full h-0.5 bg-brand-500 shadow-[0_0_10px_#4ade80] animate-scan opacity-80 z-20"></div>
                      </div>
                      
                      <Badge variant="success" className="bg-brand-500/10 text-brand-500 border-brand-500/20 z-10">VERIFIKOVANO</Badge>
                      
                      {/* Grid Background */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none"></div>
                  </div>
                  <div>
                     <h4 className="text-text-main font-bold mb-1">Sigurnost</h4>
                     <p className="text-xs text-text-muted">Biometrijska i dokumentaciona provera.</p>
                  </div>
               </Card>
            </div>
         </div>
      </section>

      {/* Interactive Section (Automation) */}
      <section className="py-32 bg-background border-b border-border relative overflow-hidden">
         <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-20 items-center">
            <div>
               <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 bg-brand-400 rounded-full"></div>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">AUTOMATIZACIJA</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6 leading-tight">
                  <span className="text-gradient-green">Ubrzajte poslovanje.</span><br/>
                  Sistem radi za vas.
               </h2>
               
               <div className="space-y-6 mt-12">
                  {features.map((item, i) => (
                     <div 
                       key={i} 
                       onClick={() => setActiveFeature(i)}
                       className={cn(
                         "group cursor-pointer p-4 rounded-lg transition-all duration-300 border border-transparent",
                         activeFeature === i ? "bg-surface border-border" : "hover:bg-surface hover:border-border"
                       )}
                     >
                        <h4 className={cn(
                          "text-lg font-bold transition-colors mb-2 flex items-center gap-3",
                          activeFeature === i ? "text-text-main" : "text-text-muted group-hover:text-text-main"
                        )}>
                           <item.icon className={cn("h-5 w-5", activeFeature === i ? "text-brand-500" : "text-text-muted")} />
                           {item.title} 
                           {activeFeature === i && <ArrowRight className="h-4 w-4 text-brand-500 animate-pulse ml-auto" />}
                        </h4>
                        <p className={cn(
                          "text-sm transition-colors max-w-md ml-8",
                          activeFeature === i ? "text-text-main" : "text-text-muted"
                        )}>{item.desc}</p>
                     </div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-brand-500/5 blur-[100px] rounded-full"></div>
               <div className="relative bg-surface border border-border rounded-xl overflow-hidden h-[500px] shadow-2xl flex flex-col transition-all duration-500">
                  
                  {/* Dynamic Header */}
                  <div className="p-6 border-b border-border bg-surfaceHighlight/30 flex justify-between items-center">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                     </div>
                     <div className="text-[10px] font-mono text-text-muted uppercase">
                       {activeFeature === 0 ? 'SYSTEM.NOTIFICATIONS' : activeFeature === 1 ? 'SYSTEM.MATCHING' : 'SYSTEM.ANALYTICS'}
                     </div>
                  </div>
                  
                  <div className="flex-1 p-8 relative flex items-center justify-center">
                     
                     {/* Visual 0: Notifications */}
                     {activeFeature === 0 && (
                        <div className="w-full max-w-xs space-y-4 animate-slide-up">
                           {[1, 2].map((i) => (
                             <div key={i} className="bg-background/80 backdrop-blur border border-border rounded-xl p-4 shadow-lg hover:border-brand-500/30 transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                   <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 rounded bg-brand-500/20 flex items-center justify-center">
                                         <Bell className="h-3 w-3 text-brand-500" />
                                      </div>
                                      <span className="text-xs font-bold text-text-main">Nova Tura</span>
                                   </div>
                                   <span className="text-[10px] text-text-muted">pre 2 min</span>
                                </div>
                                <p className="text-sm font-medium text-text-main">Pronađena tura: Beograd <span className="text-text-muted">→</span> Beč</p>
                                <p className="text-xs text-text-muted mt-1">Cerada • 24t • 1,200 €</p>
                             </div>
                           ))}
                             <div className="bg-background/80 backdrop-blur border border-border rounded-xl p-4 shadow-lg flex items-center gap-3 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-surfaceHighlight animate-pulse"></div>
                                <div className="flex-1 space-y-2">
                                   <div className="h-2 w-20 bg-surfaceHighlight rounded"></div>
                                   <div className="h-2 w-32 bg-surfaceHighlight rounded"></div>
                                </div>
                             </div>
                        </div>
                     )}

                     {/* Visual 1: Matching */}
                     {activeFeature === 1 && (
                        <div className="relative w-64 h-64 animate-fade-in">
                           {/* Center Node (Load) */}
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-surface border border-border rounded-full flex items-center justify-center z-20 shadow-glow">
                              <Package className="text-text-main h-8 w-8" />
                              <div className="absolute -bottom-6 text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded">TERET</div>
                           </div>
                           
                           {/* Orbiting Nodes (Trucks) */}
                           <div className="absolute inset-0 animate-spin-slow z-10">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-surfaceHighlight rounded-full flex items-center justify-center border border-border">
                                 <Truck className="h-5 w-5 text-text-muted" />
                              </div>
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-900/40 rounded-full flex items-center justify-center border border-brand-500/50 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                                 <Truck className="h-5 w-5 text-brand-400" />
                              </div>
                           </div>
                           
                           {/* Connection Line - Static for stability */}
                           <div className="absolute top-1/2 left-1/2 w-[2px] h-[90px] bg-gradient-to-b from-transparent via-brand-500/50 to-brand-500 origin-top transform translate-y-10 rounded-full animate-pulse"></div>
                        </div>
                     )}

                     {/* Visual 2: Analytics */}
                     {activeFeature === 2 && (
                        <div className="w-full h-full flex items-end justify-center gap-3 px-8 pb-4 animate-slide-up">
                           {[40, 65, 30, 85, 55, 90, 45].map((h, i) => (
                              <div key={i} className="flex-1 group relative">
                                 <div 
                                    className="w-full bg-surfaceHighlight rounded-t-sm hover:bg-brand-500 transition-all duration-300 relative overflow-hidden" 
                                    style={{ height: `${h}%` }}
                                 >
                                   <div className="absolute bottom-0 left-0 w-full h-1/3 bg-background/10"></div>
                                 </div>
                                 {/* Tooltip */}
                                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface text-text-main border border-border text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                                    {h * 12} €
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>

                  <div className="p-6 bg-surfaceHighlight/20 border-t border-border font-mono text-xs">
                     {activeFeature === 0 && <div className="text-text-muted">> Poslato 3 email-a i 2 SMS poruke.</div>}
                     {activeFeature === 1 && (
                        <>
                           <div className="text-brand-500 mb-2">✓ Podudaranje Pronađeno (98%)</div>
                           <div className="text-text-muted">Povezivanje prevoznika <span className="text-text-main">TransLogistic</span> sa pošiljaocem <span className="text-text-main">MegaTrade</span>...</div>
                        </>
                     )}
                     {activeFeature === 2 && <div className="text-text-muted">> Rast profita od 24% u odnosu na prošli mesec.</div>}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* New Section: Mobile App (Shipper Focus) */}
      <section className="py-32 bg-surface border-b border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-20 items-center">
           <div className="order-2 md:order-1 relative z-10 flex justify-center">
              {/* Creative Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)] -z-20"></div>
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-brand-500/20 via-blue-500/10 to-purple-500/10 rounded-full blur-[80px] -z-10 animate-pulse-slow"></div>
              
              {/* Floating 3D Boxes (Cargo Visuals) */}
              <div className="absolute -top-10 -left-10 animate-float">
                  <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-80">
                      <path d="M50 20 L80 35 L80 70 L50 85 L20 70 L20 35 Z" fill="none" stroke="var(--brand-500)" strokeWidth="1" className="drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]"/>
                      <path d="M20 35 L50 50 L80 35" fill="none" stroke="var(--brand-500)" strokeWidth="1" />
                      <path d="M50 50 L50 85" fill="none" stroke="var(--brand-500)" strokeWidth="1" />
                  </svg>
              </div>
              <div className="absolute bottom-20 -right-5 animate-float-slow" style={{ animationDelay: '1s' }}>
                  <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-60">
                      <path d="M50 20 L80 35 L80 70 L50 85 L20 70 L20 35 Z" fill="none" stroke="var(--text-muted)" strokeWidth="1"/>
                      <path d="M20 35 L50 50 L80 35" fill="none" stroke="var(--text-muted)" strokeWidth="1" />
                      <path d="M50 50 L50 85" fill="none" stroke="var(--text-muted)" strokeWidth="1" />
                  </svg>
              </div>

              {/* Premium Phone Mockup */}
              <div className="group relative w-[320px] h-[640px] bg-zinc-950 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] border-[6px] border-zinc-900 ring-1 ring-white/20 flex flex-col overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-all duration-700 ease-out z-10">
                 {/* Gloss Reflection Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-50 rounded-[2.2rem] opacity-30"></div>
                 
                 {/* Side Buttons */}
                 <div className="absolute top-24 -right-2.5 w-1 h-10 bg-zinc-800 rounded-r-md shadow-sm border-l border-black/50"></div>
                 <div className="absolute top-40 -left-2.5 w-1 h-16 bg-zinc-800 rounded-l-md shadow-sm border-r border-black/50"></div>
                 <div className="absolute top-60 -left-2.5 w-1 h-16 bg-zinc-800 rounded-l-md shadow-sm border-r border-black/50"></div>

                 {/* Notch (iPhone 13 Style) */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-3 shadow-sm border-b border-x border-zinc-900">
                    <div className="w-12 h-1 rounded-full bg-zinc-800/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 ring-1 ring-zinc-800 relative">
                       <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-blue-900/40 rounded-full"></div>
                    </div>
                 </div>
                 
                 <div className="rounded-[2.1rem] overflow-hidden w-full h-full bg-surface dark:bg-[#0c0c0e] relative flex flex-col select-none">
                    
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 w-full h-10 px-6 pt-3 flex justify-between items-start text-[10px] font-medium text-text-muted z-40 mix-blend-difference">
                       <span className="pl-1">9:41</span>
                       <div className="flex gap-1.5 items-center pr-1">
                          <Wifi className="w-3 h-3" />
                          <Battery className="w-3 h-3" />
                       </div>
                    </div>

                    {/* App Header with Profile - Pushed down to clear notch */}
                    <div className="mt-0 h-28 bg-gradient-to-b from-surface/80 to-surface/40 backdrop-blur-xl border-b border-border flex items-end pb-4 justify-between px-5 z-30 pt-12">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 p-[1px]">
                             <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                                <User className="w-5 h-5 text-brand-500" />
                             </div>
                          </div>
                          <div>
                             <span className="block font-bold text-text-main text-sm">Marko P.</span>
                             <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                                <span className="text-[10px] text-brand-500 font-bold uppercase tracking-wider">PREMIUM NALOG</span>
                             </div>
                          </div>
                       </div>
                       <div className="relative p-2.5 bg-surfaceHighlight rounded-full border border-border text-text-muted hover:text-text-main transition-colors">
                          <Bell className="w-4 h-4" />
                          <div className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-background"></div>
                       </div>
                    </div>
                    
                    {/* App Content */}
                    <div className="p-4 space-y-3 flex-1 overflow-hidden relative">
                       <div className="flex justify-between items-center mb-2">
                           <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-1">Moje Objave</h3>
                           <div className="bg-brand-500 text-black text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer shadow-glow">+ OBJAVI</div>
                       </div>
                       
                       {[
                          { 
                             route: 'Beograd -> Berlin', 
                             type: 'Palete', 
                             price: '1,400 €', 
                             status: 'TRAŽI VOZILO',
                             badgeClass: 'bg-brand-500/10 text-brand-500 border-brand-500/20', 
                             time: '1h',
                             isLoad: true 
                          },
                          { 
                             route: 'Zagreb -> Beč', 
                             type: 'Hladnjača', 
                             price: 'Slobodan', 
                             status: 'SLOBODAN', 
                             badgeClass: 'bg-brand-500/10 text-brand-500 border-brand-500/20', 
                             time: '3h',
                             isLoad: false 
                          },
                          { 
                             route: 'Niš -> Sofija', 
                             type: 'Rinfuz', 
                             price: '450 €', 
                             status: 'U TOKU',
                             badgeClass: 'bg-blue-500/10 text-blue-500 border-blue-500/20', 
                             time: '5h',
                             isLoad: true 
                          },
                          { 
                             route: 'Kragujevac -> Bar', 
                             type: 'Kontejner', 
                             price: '800 €', 
                             status: 'TRAŽI VOZILO',
                             badgeClass: 'bg-brand-500/10 text-brand-500 border-brand-500/20', 
                             time: '1d',
                             isLoad: true 
                          },
                       ].map((item, i) => (
                          <div key={i} className="group/item p-3 bg-surfaceHighlight/50 backdrop-blur-sm rounded-xl border border-border flex gap-3 hover:bg-surfaceHighlight transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-sm">
                             {/* Dynamic Icon based on Type */}
                             <div className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-colors",
                                item.isLoad 
                                   ? "bg-blue-500/10 text-blue-500 border-blue-500/20 group-hover/item:bg-blue-500 group-hover/item:text-white"
                                   : "bg-brand-500/10 text-brand-500 border-brand-500/20 group-hover/item:bg-brand-500 group-hover/item:text-black"
                             )}>
                                {item.isLoad ? <Box className="h-5 w-5"/> : <Truck className="h-5 w-5"/>}
                             </div>
                             
                             <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                                <div className="flex justify-between items-start">
                                   <div className="text-xs font-bold text-text-main truncate tracking-tight">{item.route}</div>
                                   <div className="text-xs font-mono font-bold text-text-main whitespace-nowrap ml-2">{item.price}</div>
                                </div>
                                
                                <div className="flex justify-between items-end mt-1">
                                   <div className="flex items-center gap-1.5 text-[9px] text-text-muted">
                                      <span className="bg-surface border border-border px-1.5 rounded">{item.type}</span>
                                      <span className="opacity-75">• {item.time}</span>
                                   </div>
                                   <span className={cn("text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border", item.badgeClass)}>{item.status}</span>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>

                    {/* Navigation Bar - Fixed Alignment */}
                    <div className="h-[72px] bg-surface/90 backdrop-blur-xl border-t border-border/50 absolute bottom-0 w-full z-20 px-2 pb-4 pt-2">
                       <div className="grid grid-cols-5 h-full items-center">
                          {/* Home */}
                          <div className="flex flex-col items-center gap-1 text-brand-500 cursor-pointer hover:scale-110 transition-transform">
                             <Home className="w-5 h-5 stroke-[2.5]" />
                             <span className="text-[8px] font-bold">Početna</span>
                          </div>
                          {/* Search */}
                          <div className="flex flex-col items-center gap-1 text-text-muted hover:text-text-main cursor-pointer transition-colors">
                             <Search className="w-5 h-5" />
                             <span className="text-[8px] font-medium">Pretraga</span>
                          </div>
                          {/* Floating Plus Button Container - Centered */}
                          <div className="relative flex justify-center -top-6">
                             <div className="w-14 h-14 bg-brand-500 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(34,197,94,0.4)] border-[4px] border-surface dark:border-[#0c0c0e] text-black cursor-pointer hover:scale-110 transition-transform active:scale-95">
                                <Plus className="w-7 h-7 stroke-[3]" />
                             </div>
                          </div>
                          {/* Loads */}
                          <div className="flex flex-col items-center gap-1 text-text-muted hover:text-text-main cursor-pointer transition-colors">
                             <Package className="w-5 h-5" />
                             <span className="text-[8px] font-medium">Ture</span>
                          </div>
                          {/* Profile */}
                          <div className="flex flex-col items-center gap-1 text-text-muted hover:text-text-main cursor-pointer transition-colors">
                             <User className="w-5 h-5" />
                             <span className="text-[8px] font-medium">Profil</span>
                          </div>
                       </div>
                    </div>

                    {/* Scanning Animation */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand-500 shadow-[0_0_20px_#4ade80] animate-scan-vertical opacity-50 pointer-events-none z-30"></div>
                 </div>
              </div>
           </div>
           
           <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 mb-6">
                 <Smartphone className="h-5 w-5 text-brand-500" />
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">UVEK UZ VAS</span>
              </div>
              <h2 className="text-4xl font-bold text-text-main mb-6">
                 Kancelarija u vašem džepu.
              </h2>
              <p className="text-lg text-text-muted leading-relaxed mb-8">
                 Bilo da ste u kancelariji ili na putu, Nalozi za utovar su uvek sa vama. 
                 Naša platforma je u potpunosti optimizovana za sve mobilne uređaje, 
                 omogućavajući vam da ugovorite transport u hodu.
                 <br/><br/>
                 <span className="text-text-main font-semibold">Savršeno za firme koje šalju robu:</span> objavite turu direktno sa telefona i pratite ponude u realnom vremenu.
              </p>
              <ul className="space-y-3">
                 {[
                    'Pristup sa bilo kog uređaja',
                    'Instant notifikacije na telefonu',
                    'Brza pretraga tura u pokretu'
                 ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-main">
                       <div className="w-5 h-5 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 text-xs">✓</div>
                       {item}
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </section>

      {/* New Section: How It Works */}
      <section className="py-24 border-b border-border bg-surface/20">
        <div className="mx-auto max-w-7xl px-6 text-center">
           <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-brand-500"></span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">PROCES</span>
              <span className="h-px w-8 bg-brand-500"></span>
           </div>
           <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-16">Kako funkcioniše platforma?</h2>
           
           <div className="grid md:grid-cols-3 gap-12 relative">
             {/* Connector Line (Desktop) */}
             <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-border to-transparent border-t border-dashed border-text-muted opacity-30"></div>

             {[
               { title: '1. Registracija', desc: 'Kreirajte besplatan nalog i verifikujte vašu firmu u nekoliko koraka.', icon: Users },
               { title: '2. Pretraga', desc: 'Koristite pametne filtere da pronađete odgovarajući teret ili kamion.', icon: Search },
               { title: '3. Transport', desc: 'Kontaktirajte partnera direktno i dogovorite detalje transporta.', icon: Truck },
             ].map((step, i) => (
               <div key={i} className="relative z-10 flex flex-col items-center">
                 <div className="w-24 h-24 rounded-2xl bg-surface border border-border shadow-lg flex items-center justify-center mb-6 group hover:border-brand-500 transition-colors duration-300">
                    <step.icon className="h-10 w-10 text-text-muted group-hover:text-brand-500 transition-colors" />
                 </div>
                 <h3 className="text-xl font-bold text-text-main mb-3">{step.title}</h3>
                 <p className="text-text-muted leading-relaxed max-w-xs">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* New Section: FAQ */}
      <section className="py-24 border-b border-border bg-background">
        <div className="mx-auto max-w-4xl px-6">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-text-main mb-4">Često postavljana pitanja</h2>
             <p className="text-text-muted">Imate pitanja? Mi imamo odgovore.</p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-6">
             {[
               { q: 'Da li je korišćenje platforme besplatno?', a: 'Da, registracija je potpuno besplatna. Nudimo i početni paket koji vam omogućava da isprobate osnovne funkcionalnosti bez ikakvih troškova.' },
               { q: 'Kako vršite verifikaciju firmi?', a: 'Svaki nalog prolazi kroz ručnu proveru PIB-a i matičnog broja kako bismo osigurali da na platformi posluju samo legitimne kompanije.' },
               { q: 'Da li mogu otkazati pretplatu?', a: 'Naravno. Pretplatu možete otkazati ili promeniti u bilo kom trenutku direktno iz vašeg naloga, bez penala.' },
               { q: 'Kako da objavim svoju prvu turu?', a: 'Nakon registracije, kliknite na dugme "Nova Tura" na kontrolnoj tabli. Proces je jednostavan i traje manje od minut.' },
             ].map((item, i) => (
               <Card key={i} className="p-6 hover:border-text-muted/30 transition-colors">
                 <h4 className="font-bold text-text-main mb-3 flex items-start gap-3">
                   <HelpCircle className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                   {item.q}
                 </h4>
                 <p className="text-sm text-text-muted leading-relaxed pl-8">{item.a}</p>
               </Card>
             ))}
           </div>
        </div>
      </section>

      {/* Testimonial Section - Redesigned Grid */}
      <section className="py-32 bg-surface border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-50"></div>
        <div className="mx-auto max-w-7xl px-6 relative z-10">
           <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 bg-brand-400 rounded-full"></div>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">ISKUSTVA KORISNIKA</span>
               </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">Reč onih koji nam veruju.</h2>
              <p className="text-text-muted">Pridružite se hiljadama zadovoljnih korisnika.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <Card key={i} className="p-8 relative bg-background/50 backdrop-blur-sm border-border hover:border-brand-500/30 transition-all duration-300 group hover:-translate-y-1 h-full flex flex-col">
                   {/* Background Quote Icon */}
                   <div className="absolute top-6 right-6 text-surfaceHighlight group-hover:text-brand-500/10 transition-colors">
                      <Quote className="h-12 w-12 opacity-50" />
                   </div>
                   
                   <div className="flex items-center gap-1 mb-4">
                      {[...Array(t.rating)].map((_, j) => (
                         <Star key={j} className="h-4 w-4 fill-brand-500 text-brand-500" />
                      ))}
                   </div>
                   
                   <div className="flex-1">
                      <p className="text-text-main font-medium italic mb-8 relative z-10 leading-relaxed">"{t.quote}"</p>
                   </div>
                   
                   <div className="mt-auto border-t border-border pt-6 flex items-end justify-between">
                      <div>
                         <div className="font-bold text-text-main text-sm">{t.name}</div>
                         <div className="text-xs text-text-muted">{t.role}</div>
                         <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">{t.company}</div>
                      </div>
                      <div className="text-right">
                         <div className="flex items-center gap-1 justify-end text-brand-500">
                            <TrendingUp className="h-3 w-3" />
                         </div>
                         <div className="text-xs font-bold text-brand-500 mt-0.5">{t.metric}</div>
                      </div>
                   </div>
                </Card>
              ))}
           </div>
        </div>
      </section>

      {/* New Section: Final CTA - Redesigned */}
      <section className="py-24 px-6 bg-background">
         <div className="mx-auto max-w-5xl">
            <div className="relative rounded-[2.5rem] bg-[#0c0c0e] border border-white/10 overflow-hidden px-6 py-20 md:px-20 md:py-24 text-center shadow-2xl group">
               {/* Background Grid */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
               
               {/* Animated Gradient Orbs */}
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/10 blur-[100px] rounded-full group-hover:bg-brand-500/20 transition-colors duration-700"></div>
               <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full"></div>

               <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                     <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                     <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Bez Obaveza</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                     Pretvorite prazne kilometre u <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">čist profit.</span>
                  </h2>
                  
                  <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                     Pridružite se mreži od 2,400+ prevoznika koji svakodnevno pronalaze ture brže nego ikada.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                     <Link to="/register" className="w-full sm:w-auto">
                       <Button size="lg" variant="primary" className="w-full sm:w-auto h-14 px-8 text-sm font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] uppercase tracking-widest transition-all hover:scale-105">
                         Registruj se besplatno
                       </Button>
                     </Link>
                     <Link to="/contact" className="w-full sm:w-auto">
                       <Button size="lg" variant="white" className="w-full sm:w-auto h-14 px-8 text-sm font-bold uppercase tracking-widest hover:bg-zinc-100">
                         Kontaktirajte nas
                       </Button>
                     </Link>
                  </div>

                  <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                     <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-brand-500" />
                        Popunite Kapacitete
                     </div>
                     <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-brand-500" />
                        Provereni Partneri
                     </div>
                     <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-brand-500" />
                        Automatizacija
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
           <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                 <div className="h-6 w-6 bg-brand-400 rounded-sm flex items-center justify-center text-black">
                   <ArrowLeftRight className="h-3.5 w-3.5" />
                 </div>
                 <span className="font-bold text-text-main text-lg">Nalozi</span>
              </div>
           </div>
           <div>
              <h4 className="font-bold text-text-main mb-6 text-xs uppercase tracking-widest">Platforma</h4>
              <ul className="space-y-4 text-xs font-medium text-text-muted">
                 <li><a href="#" className="hover:text-text-main transition-colors">Ture</a></li>
                 <li><a href="#" className="hover:text-text-main transition-colors">Kamioni</a></li>
                 <li><a href="#" className="hover:text-text-main transition-colors">Cenovnik</a></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold text-text-main mb-6 text-xs uppercase tracking-widest">Kompanija</h4>
              <ul className="space-y-4 text-xs font-medium text-text-muted">
                 <li><a href="#" className="hover:text-text-main transition-colors">O nama</a></li>
                 <li><a href="#" className="hover:text-text-main transition-colors">Kontakt</a></li>
                 <li><a href="#" className="hover:text-text-main transition-colors">Blog</a></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold text-text-main mb-6 text-xs uppercase tracking-widest">Pravno</h4>
              <ul className="space-y-4 text-xs font-medium text-text-muted">
                 <li><a href="#" className="hover:text-text-main transition-colors">Politika privatnosti</a></li>
                 <li><a href="#" className="hover:text-text-main transition-colors">Uslovi korišćenja</a></li>
              </ul>
           </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 text-xs font-medium text-text-muted flex justify-between items-center border-t border-border pt-8">
           <div>© 2025 Nalozi za utovar. Sva prava zadržana.</div>
           <div className="flex gap-6">
              <a href="#" className="hover:text-text-main transition-colors">Facebook</a>
              <a href="#" className="hover:text-text-main transition-colors">Instagram</a>
           </div>
        </div>
      </footer>
    </div>
  );
};
