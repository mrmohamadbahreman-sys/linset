'use client';
import { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import HeroServices from '../components/HeroServices';
import { 
  FiCode, FiSmartphone, FiMonitor, FiTrendingUp, 
  FiUsers, FiShield, FiArrowRight, FiAward, 
  FiBriefcase, FiCpu, FiGlobe, FiStar 
} from 'react-icons/fi';

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: JSX.Element;
  image: string;
  features: string[];
  price: string;
  color: string;
}

const servicesList: Service[] = [
  {
    id: 1,
    title: 'توسعه وب حرفه‌ای',
    slug: 'web-development',
    description: 'طراحی سایت‌های مدرن و ریسپانسیو با تکنولوژی‌های روز مثل React و Next.js',
    icon: <FiCode className="w-6 h-6" />,
    image: '/images/services/service1.png',
    features: ['React/Next.js', 'Tailwind CSS', 'TypeScript', 'ریسپانسیو', 'سبک و سریع'],
    price: 'از ۱۵ میلیون',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'اپلیکیشن موبایل',
    slug: 'mobile-app',
    description: 'ساخت اپلیکیشن‌های اندروید و iOS با React Native با هزینه مناسب',
    icon: <FiSmartphone className="w-6 h-6" />,
    image: '/images/services/mobile.webp',
    features: ['React Native', 'کراس پلتفرم', 'UI جذاب', 'نوتیفیکیشن', 'فروشگاهی'],
    price: 'از ۳۰ میلیون',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 3,
    title: 'طراحی UI/UX',
    slug: 'ui-ux-design',
    description: 'طراحی رابط کاربری جذاب و تجربه کاربری روان برای محصولات دیجیتال شما',
    icon: <FiMonitor className="w-6 h-6" />,
    image: '/images/services/UIUX.webp',
    features: ['Figma', 'طراحی سفارشی', 'کاربرپسند', 'تستی', 'پروتوتایپ'],
    price: 'از ۸ میلیون',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 4,
    title: 'سئو و بهینه‌سازی',
    slug: 'seo',
    description: 'بهبود رتبه سایت در گوگل و افزایش بازدید با روش‌های اصولی',
    icon: <FiTrendingUp className="w-6 h-6" />,
    image: '/images/services/seo.webp',
    features: ['SEO اصولی', 'کلمات کلیدی', 'افزایش بازدید', 'گزارش ماهانه', 'مشاوره رایگان'],
    price: 'از ۵ میلیون',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    title: 'مشاوره فنی',
    slug: 'consulting',
    description: 'مشاوره در انتخاب تکنولوژی مناسب و معماری پروژه‌های نرم‌افزاری',
    icon: <FiUsers className="w-6 h-6" />,
    image: '/images/services/talk.webp',
    features: ['انتخاب تکنولوژی', 'بهینه‌سازی', 'معماری نرم‌افزار', 'برآورد هزینه', 'جلسه آنلاین'],
    price: 'از ۳ میلیون',
    color: 'from-slate-500 to-gray-500'
  },
  {
    id: 6,
    title: 'پشتیبانی فنی',
    slug: 'support',
    description: 'پشتیبانی و بروزرسانی مداوم سایت و اپلیکیشن شما با کمترین هزینه',
    icon: <FiShield className="w-6 h-6" />,
    image: '/images/services/tech.webp',
    features: ['پشتیبانی ماهانه', 'امنیت', 'بکاپ', 'رفع باگ', 'بروزرسانی'],
    price: 'از ۲ میلیون/ماه',
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function ServicesPage() {
  const [visibleCards, setVisibleCards] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => setVisibleCards(true), 300);
  }, []);

  const stats = [
    { value: '۲+', label: 'سال تجربه', icon: <FiAward className="w-8 h-8" /> },
    { value: '۱۵+', label: 'پروژه موفق', icon: <FiBriefcase className="w-8 h-8" /> },
    { value: '۵+', label: 'تیم متخصص', icon: <FiCpu className="w-8 h-8" /> },
    { value: '۱۰۰%', label: 'تعهد و کیفیت', icon: <FiStar className="w-8 h-8" /> }
  ];

  const reasons = [
    { icon: <FiGlobe className="w-8 h-8" />, title: 'هزینه مناسب', desc: 'قیمت‌های رقابتی متناسب با کیفیت کار' },
    { icon: <FiTrendingUp className="w-8 h-8" />, title: 'سرعت بالا', desc: 'تحویل پروژه در کمترین زمان ممکن' },
    { icon: <FiUsers className="w-8 h-8" />, title: 'پشتیبانی رایگان', desc: '۳ ماه پشتیبانی رایگان بعد از تحویل' },
    { icon: <FiMonitor className="w-8 h-8" />, title: 'طراحی مدرن', desc: 'استفاده از آخرین استانداردهای طراحی' },
    { icon: <FiShield className="w-8 h-8" />, title: 'تضمین کیفیت', desc: 'تضمین رضایت شما از کار انجام شده' },
    { icon: <FiCode className="w-8 h-8" />, title: 'مشاوره رایگان', desc: 'مشاوره اولیه بدون هیچ هزینه‌ای' }
  ];

  return (
    <div className="min-h-screen">
      
      {/* بخش Hero با کیبورد */}
      <HeroServices />

      {/* Services Grid */}
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <FiCode className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">خدمات تخصصی</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">خدمات ما</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted mt-6 max-w-2xl mx-auto">
            ما اینجا هستیم تا ایده‌های شما را با هزینه مناسب به واقعیت تبدیل کنیم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group block transition-all duration-700 ${
                visibleCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                
                <div className="relative h-52 overflow-hidden bg-linear-to-br from-primary/20 to-primary/10">
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                    {service.icon}
                  </div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur rounded-full px-3 py-1 text-white text-xs">
                    {service.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-main mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        +{service.features.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-end pt-4 border-t border-primary/10">
                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300">
                      <span className="text-sm font-medium">مشاهده جزئیات</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className={`absolute inset-x-0 bottom-0 h-1 bg-linear-to-r ${service.color} transition-all duration-500 ${hoveredId === service.id ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* آمار */}
      <section className="py-16 bg-linear-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
              <FiAward className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">دستاوردها</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-main mb-4">چرا لیسنت؟</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted mt-6 max-w-2xl mx-auto">
              ما یک تیم جوان، خلاق و پرانرژی هستیم که عاشق خلق چیزهای جدیدیم
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group text-center p-6 bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* چرا ما را انتخاب کنید */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
              <FiStar className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">مزایای همکاری</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">چرا ما را انتخاب کنید؟</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted mt-6 max-w-2xl mx-auto">
              دلایلی که ما را به شریک دیجیتال شما تبدیل می‌کند
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((item, idx) => (
              <div key={idx} className="bg-card rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-main mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-card rounded-2xl p-10 max-w-3xl mx-auto shadow-xl">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-float">
              <FiCode className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-main mb-4">
              آماده همکاری با ما هستید؟
            </h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              همین حالا با ما تماس بگیرید و از مشاوره رایگان بهره‌مند شوید
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              شروع همکاری
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.15); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 6s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}