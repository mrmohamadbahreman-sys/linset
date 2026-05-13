'use client';
import { useState, useEffect, useRef } from 'react';

export default function ConsultWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', topic: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);

  // بستن ویجت با کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', topic: '' });
        setTimeout(() => {
          setSuccess(false);
          setIsOpen(false);
        }, 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'خطا در ارسال درخواست');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50">
      {/* دکمه باز کردن ویجت */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-14 h-14 bg-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          <span className="text-2xl">💬</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        </button>
      )}

      {/* فرم ویجت */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-card rounded-2xl shadow-2xl border border-primary/20 overflow-hidden animate-slideUp">
          {/* هدر */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-primary/20">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-main">مشاوره رایگان</h3>
                <p className="text-xs text-muted">همین حالا با ما صحبت کنید</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-primary/10 transition"
              >
                <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* فرم */}
          <div className="p-4">
            {success ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-main font-medium">درخواست شما ثبت شد</p>
                <p className="text-xs text-muted mt-1">به زودی با شما تماس می‌گیریم</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="نام و نام خانوادگی"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-main border border-primary/20 rounded-xl text-sm focus:outline-none focus:border-primary transition"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="شماره تماس"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-main border border-primary/20 rounded-xl text-sm focus:outline-none focus:border-primary transition"
                    required
                  />
                </div>
                <div>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-2.5 bg-main border border-primary/20 rounded-xl text-sm focus:outline-none focus:border-primary transition"
                    required
                  >
                    <option value="">موضوع مشاوره را انتخاب کنید</option>
                    <option value="طراحی سایت">طراحی سایت</option>
                    <option value="توسعه اپلیکیشن">توسعه اپلیکیشن</option>
                    <option value="سئو و بهینه‌سازی">سئو و بهینه‌سازی</option>
                    <option value="مشاوره فنی">مشاوره فنی</option>
                    <option value="سایر">سایر</option>
                  </select>
                </div>
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'در حال ارسال...' : 'درخواست مشاوره'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}