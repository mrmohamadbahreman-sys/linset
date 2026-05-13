'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
  price: string;
  benefits: string[];
}

const servicesData: Service[] = [
  {
    id: 1,
    slug: 'web-development',
    title: 'توسعه وب حرفه‌ای',
    description: 'طراحی و پیاده‌سازی سایت‌های مدرن، ریسپانسیو و بهینه با آخرین تکنولوژی‌ها',
    fullDescription: `توسعه وب به فرآیند طراحی، پیاده‌سازی و نگهداری وب‌سایت‌ها و برنامه‌های تحت وب گفته می‌شود. امروزه داشتن یک وب‌سایت حرفه‌ای برای هر کسب‌وکاری ضروری است.

**وب‌سایت چیست؟**
وب‌سایت مجموعه‌ای از صفحات مرتبط است که از طریق اینترنت قابل دسترسی هستند. وب‌سایت‌ها می‌توانند فروشگاهی، شرکتی، خبری، آموزشی و... باشند.

**چرا به وب‌سایت حرفه‌ای نیاز داریم؟**
- افزایش اعتبار برند شما
- دسترسی ۲۴ ساعته مشتریان
- فروش آنلاین محصولات
- ارتباط مستقیم با مخاطبان

**تکنولوژی‌های ما:**
ما با استفاده از React، Next.js، Tailwind CSS و TypeScript وب‌سایت‌های فوق‌العاده سریع و بهینه (با نمره ۹۰+ در گوگل پیج اسپید) طراحی می‌کنیم.`,
    icon: '💻',
    image: '/images/services/service1.png',
    features: ['React/Next.js', 'Tailwind CSS', 'TypeScript', 'SEO Optimization', 'PWA', 'پشتیبانی ۲۴/۷'],
    price: 'از ۳۰ میلیون تومان',
    benefits: [
      'افزایش سرعت سایت تا ۹۵٪',
      'بهبود رتبه در گوگل',
      'طراحی ریسپانسیو برای تمام دستگاه‌ها',
      'امنیت بالا در برابر حملات'
    ]
  },
  {
    id: 2,
    slug: 'mobile-app',
    title: 'توسعه اپلیکیشن موبایل',
    description: 'ساخت اپلیکیشن‌های کراس پلتفرم برای iOS و Android با بهترین عملکرد',
    fullDescription: `اپلیکیشن موبایل یا برنامه کاربردی تلفن همراه، نرم‌افزاری است که برای اجرا روی گوشی‌های هوشمند و تبلت‌ها طراحی می‌شود.

**اپلیکیشن موبایل چیست؟**
اپلیکیشن موبایل یک نرم‌افزار است که کاربران می‌توانند آن را روی گوشی خود نصب کنند و از امکانات آن استفاده نمایند. اپلیکیشن‌ها می‌توانند فروشگاهی، اجتماعی، آموزشی، خدماتی و... باشند.

**چرا به اپلیکیشن موبایل نیاز داریم؟**
- حضور همیشه در جیب مشتری
- تجربه کاربری بهتر و روان‌تر
- امکان ارسال نوتیفیکیشن و اطلاع‌رسانی فوری
- دسترسی به امکانات گوشی مثل دوربین، GPS و...

**تکنولوژی‌های ما:**
ما با استفاده از React Native و Flutter اپلیکیشن‌های کراس پلتفرم توسعه می‌دهیم که همزمان روی iOS و Android اجرا می‌شوند.`,
    icon: '📱',
    image: '/images/services/mobile.webp',
    features: ['React Native', 'Flutter', 'UI/UX Design', 'App Store Deployment', 'Push Notification', 'درآمدزایی'],
    price: 'از ۵۰ میلیون تومان',
    benefits: [
      'پوشش هر دو سیستم‌عامل iOS و Android با یک کد',
      'تجربه کاربری روان و حرفه‌ای',
      'امکان آپدیت لحظه‌ای',
      'دریافت نوتیفیکیشن پیشرفته'
    ]
  }
];

export default function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const slug = params.slug as string;
    const found = servicesData.find(s => s.slug === slug);
    setService(found || null);
    
    // انیمیشن لود
    setTimeout(() => setLoading(false), 800);
    setTimeout(() => setAnimated(true), 900);
  }, [params.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          topic: service?.title || 'درخواست مشاوره'
        })
      });
      
      if (res.ok) {
        setSent(true);
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => setSent(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('خطا در ارسال درخواست');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="text-center">
          {/* انیمیشن لود خاص */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <div className="absolute inset-2 bg-primary/30 rounded-full animate-pulse" />
            <div className="absolute inset-4 bg-primary rounded-full animate-bounce" />
          </div>
          <p className="text-primary font-medium animate-pulse">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🔍</div>
          <h1 className="text-2xl font-bold text-main mb-2">خدمت مورد نظر یافت نشد</h1>
          <p className="text-muted mb-6">خدمت درخواستی شما وجود ندارد</p>
          <Link href="/services" className="text-primary hover:text-primary-dark transition">
            ← بازگشت به لیست خدمات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        
        {/* صفحه دو ستونه با انیمیشن fade-in */}
        <div className={`flex flex-col lg:flex-row gap-8 transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* سمت راست - محتوای اصلی */}
          <div className="flex-1">
            {/* هدر با انیمیشن */}
            <div className="mb-8">
              <Link href="/services" className="text-primary hover:text-primary-dark transition inline-flex items-center gap-1 mb-6 group">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                بازگشت به خدمات
              </Link>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center text-5xl shadow-lg animate-float">
                  {service.icon}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-main">{service.title}</h1>
              </div>
              
              <p className="text-lg text-muted leading-relaxed">{service.description}</p>
            </div>

            {/* تصویر */}
            <div className="rounded-2xl overflow-hidden mb-8 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-auto hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* توضیحات کامل */}
            <div className="bg-card rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <div className="whitespace-pre-line text-muted leading-relaxed">
                {service.fullDescription.split('\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h2 key={idx} className="text-xl font-bold text-main mt-6 mb-3 first:mt-0">
                        {paragraph.replace(/\*\*/g, '')}
                      </h2>
                    );
                  }
                  if (paragraph.trim() === '') return null;
                  return (
                    <p key={idx} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* مزایا */}
            <div className="mt-8 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-8 shadow-xl">
              <h2 className="text-xl font-bold text-main mb-6 flex items-center gap-2">
                <span className="text-2xl">✨</span> مزایای {service.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-main">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ویژگی‌ها */}
            <div className="mt-8 bg-card rounded-2xl p-8 shadow-xl">
              <h2 className="text-xl font-bold text-main mb-6 flex items-center gap-2">
                <span className="text-2xl">📋</span> ویژگی‌های فنی
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="px-4 py-2 bg-main rounded-full text-sm text-muted shadow-md hover:shadow-lg transition-all duration-300">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* قیمت */}
            <div className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl text-center shadow-xl">
              <p className="text-muted mb-1">شروع قیمت</p>
              <p className="text-4xl font-bold text-primary">{service.price}</p>
              <p className="text-xs text-muted mt-2">(قیمت نهایی بر اساس نیاز شما محاسبه می‌شود)</p>
            </div>
          </div>

          {/* سمت چپ - فرم درخواست مشاوره (Fix شده) */}
          <div className="lg:w-96">
            <div className="sticky top-24">
              <div className="bg-card rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg animate-float">
                    📞
                  </div>
                  <h3 className="text-xl font-bold text-main">درخواست مشاوره</h3>
                  <p className="text-sm text-muted mt-1">برای {service.title}</p>
                </div>

                {sent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-main font-medium text-lg">درخواست شما ثبت شد</p>
                    <p className="text-sm text-muted mt-2">به زودی با شما تماس می‌گیریم</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="نام و نام خانوادگی"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-main rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="شماره تماس"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-main rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="توضیحات بیشتر (اختیاری)"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-main rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      {sending ? 'در حال ارسال...' : 'درخواست مشاوره رایگان'}
                    </button>
                    <p className="text-xs text-center text-muted">
                      پس از ثبت درخواست، کارشناسان ما ظرف ۲۴ ساعت با شما تماس می‌گیرند
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA پایین صفحه */}
      <section className="py-16 mt-12 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-main mb-4">آماده شروع همکاری هستید؟</h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            همین حالا با ما تماس بگیرید یا درخواست خود را ثبت کنید
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl">
              تماس با ما
            </Link>
            <Link href="/projects" className="bg-card text-main px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-md">
              مشاهده نمونه کارها
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .shadow-inner {
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
}