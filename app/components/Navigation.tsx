'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [animateL, setAnimateL] = useState(false);
  const [animateI, setAnimateI] = useState(false);
  const [animateN, setAnimateN] = useState(false);
  const [animateS, setAnimateS] = useState(false);
  const [animateE, setAnimateE] = useState(false);
  const [animateT, setAnimateT] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => setAnimateL(true), 100);
    setTimeout(() => setAnimateI(true), 200);
    setTimeout(() => setAnimateN(true), 300);
    setTimeout(() => setAnimateS(true), 500);
    setTimeout(() => setAnimateE(true), 600);
    setTimeout(() => setAnimateT(true), 700);
    
    setTimeout(() => {
      setBouncing(true);
      setInterval(() => setBouncing(prev => !prev), 2000);
    }, 1500);
  }, []);

  const links = [
    { href: '/', label: 'خانه' },
    { href: '/projects', label: 'نمونه کارها' },
    { href: '/services', label: 'خدمات' },
    { href: '/about', label: 'درباره ما' },
    { href: '/contact', label: 'تماس با ما' },
  ];

  return (
    <>
      {/* Overlay برای بستن منو */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* هدر - تغییرات فاصله‌ها در حالت اسکرول در این کانتینر مدیریت می‌شود */}
      <div className={`fixed z-50 transition-all duration-500 ease-out ${scrolled ? 'top-0 left-0 right-0' : 'top-4 left-4 right-4'}`}>
        <nav 
          className={`
            relative overflow-hidden transition-all duration-500 ease-out
            ${scrolled 
              ? 'py-2 bg-overlay/10 backdrop-blur-[6px] backdrop-saturate-[120%] border-b border-primary/10 rounded-none shadow-sm' 
              : 'py-3 bg-overlay shadow-2xl rounded-2xl'
            }
          `}
          style={scrolled ? {} : {
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Background Light Effect */}
          <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500 ${scrolled ? 'opacity-20' : 'opacity-100'}`}>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-slower" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          </div>

          {/* خط نورانی بالا */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          {/* خط نورانی پایین */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center">
              
              {/* لوگو */}
              <div dir='ltr' className="w-[30%]">
                <Link href="/" className="group relative inline-block">
                  <div className="flex items-center gap-0">
                    <span className={`text-xl md:text-2xl font-bold text-main inline-block transition-all duration-700 ${animateL ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>L</span>
                    <span className={`text-xl md:text-2xl font-bold text-main inline-block transition-all duration-700 delay-100 ${animateI ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>i</span>
                    <span className={`text-xl md:text-2xl font-bold text-main inline-block transition-all duration-700 delay-200 ${animateN ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>n</span>
                    <span className={`text-xl md:text-2xl font-bold text-primary inline-block relative transition-all duration-700 delay-600 ${animateT ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'} ${bouncing ? 'animate-bounce-subtle' : ''}`}>s</span>
                    <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50 ${bouncing ? 'animate-bounce-delay' : ''}`} />
                    <span className={`text-xl md:text-2xl font-bold text-main inline-block transition-all duration-700 delay-500 ${animateE ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>e</span>
                    <span className={`text-xl md:text-2xl font-bold text-main inline-block transition-all duration-700 delay-500 ${animateE ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
                      t
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                </Link>
              </div>

              {/* منوی دسکتاپ */}
              <div className="hidden md:flex items-center justify-center gap-1 flex-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      relative px-5 py-2 text-sm rounded-full transition-all duration-300
                      ${pathname === link.href 
                        ? 'text-primary bg-primary/20 font-bold shadow-lg shadow-primary/30' // بولدتر و پررنگ‌تر شدن آیتم فعال
                        : 'text-muted font-medium hover:text-main hover:bg-primary/5'
                      }
                    `}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <>
                        <span className="absolute inset-x-4 -bottom-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
                        <span className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
                      </>
                    )}
                  </Link>
                ))}
              </div>

              {/* سمت راست - دکمه تغییر تم و فضای خالی */}
              <div className="w-[30%] hidden md:flex items-center justify-end gap-4">
                <ThemeToggle />
              </div>

              {/* دکمه موبایل و تم */}
              <div className="flex items-center gap-3 md:hidden">
                <ThemeToggle />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all duration-300 group shadow-md"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex flex-col items-center justify-center gap-1.5">
                    <span className={`w-5 h-0.5 bg-primary rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`w-5 h-0.5 bg-primary rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`w-5 h-0.5 bg-primary rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* منوی موبایل */}
      <div className={`
        fixed top-0 right-0 h-full w-72 bg-card shadow-2xl z-50 md:hidden transition-transform duration-500 ease-out
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative p-6 border-b border-primary">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-main">منو</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
            >
              <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative p-6 space-y-2">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`
                block px-5 py-3.5 rounded-xl text-base transition-all duration-300
                ${pathname === link.href 
                  ? 'bg-primary/20 text-primary font-bold shadow-lg shadow-primary/10' 
                  : 'text-muted font-medium hover:bg-primary/5 hover:text-main'
                }
              `}
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                {pathname === link.href && (
                  <span className="w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="h-24" />

      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes bounce-delay {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.15); }
        }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-bounce-delay { animation: bounce-delay 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 6s ease-in-out infinite; }
      `}</style>
    </>
  );
}
