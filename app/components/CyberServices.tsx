'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { 
  FiCode, FiSmartphone, FiTrendingUp, FiShield, 
  FiCloud, FiUsers, FiArrowRight 
} from 'react-icons/fi';

const services = [
  {
    id: 1,
    title: 'توسعه وب حرفه‌ای',
    icon: <FiCode className="w-8 h-8" />,
    desc: 'ساخت سایت‌های مدرن با React، Next.js و تکنولوژی‌های روز دنیا',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['پرفورمنس بالا', 'سئو پیشرفته', 'ریسپانسیو کامل'],
    price: 'از ۳۰ میلیون'
  },
  {
    id: 2,
    title: 'اپلیکیشن موبایل',
    icon: <FiSmartphone className="w-8 h-8" />,
    desc: 'توسعه اپلیکیشن‌های کراس پلتفرم با React Native و Flutter',
    gradient: 'from-purple-500 to-pink-500',
    features: ['iOS + Android', 'نوتیفیکیشن', 'آفلاین'],
    price: 'از ۵۰ میلیون'
  },
  {
    id: 3,
    title: 'مشاوره فنی',
    icon: <FiUsers className="w-8 h-8" />,
    desc: 'بهینه‌سازی عملکرد، معماری نرم‌افزار و افزایش سرعت پروژه‌ها',
    gradient: 'from-orange-500 to-red-500',
    features: ['کد ریویو', 'بهینه‌سازی', 'آموزش تیم'],
    price: 'از ۱۵ میلیون'
  },
  {
    id: 4,
    title: 'سئو و دیجیتال مارکتینگ',
    icon: <FiTrendingUp className="w-8 h-8" />,
    desc: 'بهبود رتبه در گوگل و افزایش ترافیک ارگانیک سایت شما',
    gradient: 'from-emerald-500 to-teal-500',
    features: ['تحلیل کلمات کلیدی', 'بک‌لینک', 'گزارش ماهانه'],
    price: 'از ۱۲ میلیون'
  },
  {
    id: 5,
    title: 'امنیت و پشتیبانی',
    icon: <FiShield className="w-8 h-8" />,
    desc: 'امنیت حداکثری و پشتیبانی ۲۴/۷ از پروژه‌های شما',
    gradient: 'from-slate-500 to-gray-500',
    features: ['بروزرسانی امنیتی', 'بکاپ خودکار', 'پشتیبانی فوری'],
    price: 'از ۵ میلیون/ماه'
  },
  {
    id: 6,
    title: 'زیرساخت ابری',
    icon: <FiCloud className="w-8 h-8" />,
    desc: 'میزبانی ابری با مقیاس‌پذیری بالا و uptime 99.9%',
    gradient: 'from-indigo-500 to-purple-500',
    features: ['سرعت بالا', 'مقیاس‌پذیری', 'امنیت'],
    price: 'از ۸ میلیون'
  }
];

export default function CyberServices() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const timeouts = services.map((_, idx) => {
        return setTimeout(() => {
          setVisibleCards(prev => [...prev, idx]);
        }, idx * 120);
      });
      return () => timeouts.forEach(t => clearTimeout(t));
    }
  }, [isInView]);

  return (
    <div ref={sectionRef} className="relative w-full py-24 overflow-hidden">
      {/* بک‌گراند داینامیک */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-primary/10" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slower" />
      </div>

      {/* هدر سکشن */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-primary text-sm font-medium">خدمات تخصصی</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-main mb-4">
          چه خدماتی <span className="text-primary">ارائه می‌دهیم؟</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
        <p className="text-muted mt-6 max-w-2xl mx-auto">
          با تیم متخصص لیسنت، کسب‌وکار خود را به سطح بعدی ببرید
        </p>
      </div>

      {/* گرید کارت‌ها */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`
                relative transform transition-all duration-700 ease-out
                ${visibleCards.includes(idx) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
                }
              `}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {/* افکت گلو در هاور */}
              <div className={`
                absolute -inset-0.5 rounded-2xl blur-xl transition-opacity duration-500
                ${hoveredId === service.id ? 'opacity-100' : 'opacity-0'}
                bg-gradient-to-r ${service.gradient}
              `} />

              {/* کارت اصلی */}
              <div className="relative bg-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* آیکون */}
                <div className={`
                  w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} 
                  flex items-center justify-center text-white mb-5
                  transition-all duration-500
                  ${hoveredId === service.id ? 'scale-110 rotate-6' : 'scale-100'}
                `}>
                  {service.icon}
                </div>

                {/* عنوان */}
                <h3 className="text-xl font-bold text-main mb-2">{service.title}</h3>
                
                {/* توضیحات */}
                <p className="text-muted text-sm leading-relaxed mb-4">{service.desc}</p>

                {/* ویژگی‌ها */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* قیمت و دکمه */}
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <div>
                    <span className="text-xs text-muted">شروع قیمت</span>
                    <p className="text-lg font-bold text-primary">{service.price}</p>
                  </div>
                  <button className="group flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300">
                    <span className="text-sm">جزئیات بیشتر</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* خط نورانی پایین کارت در هاور */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${service.gradient}
                  transition-all duration-500
                  ${hoveredId === service.id ? 'opacity-100' : 'opacity-0'}
                `} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA پایین سکشن */}
      <div className="text-center mt-16 relative z-10">
        <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-primary/10">
          <span className="text-2xl animate-bounce">✨</span>
          <span className="text-main font-medium">نیاز به مشاوره داری؟</span>
          <button className="px-5 py-1.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-all duration-300">
            تماس بگیرید
          </button>
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