'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'نام کاربری یا رمز عبور اشتباه است');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      
      {/* بک‌گراند دکوراتیو */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* کارت لاگین */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md p-8 border border-primary">
        
        {/* لوگو */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <span className="text-3xl font-bold text-primary">L</span>
          </div>
          <h1 className="text-2xl font-bold text-main">خوش آمدید</h1>
          <p className="text-muted text-sm mt-1">لطفاً وارد حساب کاربری خود شوید</p>
        </div>
        
        {/* خطا */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-center text-sm border border-red-200">
            <svg className="w-5 h-5 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
        
        {/* فرم */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-main mb-2">نام کاربری</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pr-10 pl-12 py-3 bg-bg-main border border-primary rounded-xl text-main placeholder:text-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                placeholder="نام کاربری"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-main mb-2">رمز عبور</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-12 py-3 bg-bg-main border border-primary rounded-xl text-main placeholder:text-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                placeholder="••••••"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 mt-6"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                در حال بررسی...
              </div>
            ) : (
              'ورود به پنل مدیریت'
            )}
          </button>
        </form>
        
        {/* فوتر */}
        <div className="mt-6 pt-6 text-center border-t border-primary">
          <p className="text-light text-sm">
            برای تست: <span className="text-primary font-medium">admin</span> / <span className="text-primary font-medium">admin123</span>
          </p>
          <Link href="/" className="inline-block mt-4 text-sm text-primary hover:text-primary-dark transition">
            ← بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.15); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}