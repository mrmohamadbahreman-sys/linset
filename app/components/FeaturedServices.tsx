'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { FiArrowRight, FiCode, FiSmartphone, FiGlobe } from 'react-icons/fi';

const featuredServices = [
  {
    id: 1,
    slug: 'web-development',
    title: 'توسعه وب حرفه\u200cای',
    description: 'طراحی و پیاده‌سازی سایت‌های مدرن، ریسپانسیو و بهینه با آخرین تکنولوژی‌ها',
    icon: <FiCode className="w-7 h-7" />,
    image: '/images/services/service1.png',
    features: ['React/Next.js', 'Tailwind CSS', 'TypeScript', 'SEO']
  },
  {
    id: 2,
    slug: 'mobile-app',
    title: 'توسعه اپلیکیشن موبایل',
    description: 'ساخت اپلیکیشن‌های کراس پلتفرم برای iOS و Android با بهترین عملکرد',
    icon: <FiSmartphone className="w-7 h-7" />,
    image: '/images/services/mobile.webp',
    features: ['React Native', 'Flutter', 'UI/UX', 'App Store']
  }
];

export default function FeaturedServices() {
  const [visible, setVisible] = useState([false, false]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      // سرویس اول - از چپ به راست (با تاخیر کمتر)
      setTimeout(() => setVisible(prev => [true, prev[1]]), 150);
      // سرویس دوم - از راست به چپ (با تاخیر بیشتر)
      setTimeout(() => setVisible(prev => [prev[0], true]), 450);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20  overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* هدر */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <FiGlobe className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">خدمات ویژه</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-main mb-3">خدمات ویژه لیسنت</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted mt-4 max-w-2xl mx-auto">
            خدمات تخصصی که می‌تواند کسب‌وکار شما را متحول کند
          </p>
        </div>

        {/* دو کارت سرویس */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* سرویس اول - از چپ به راست */}
          <div
            className={`transform transition-all duration-1000 ease-out ${
              visible[0] 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                <img
                  src={featuredServices[0].image}
                  alt={featuredServices[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
                  {featuredServices[0].icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-main mb-2 group-hover:text-primary transition-colors duration-300">
                  {featuredServices[0].title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {featuredServices[0].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {featuredServices[0].features.map((feat, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {feat}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/services/${featuredServices[0].slug}`}
                  className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 group/link"
                >
                  <span className="text-sm font-medium">مشاهده جزئیات</span>
                  <FiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* سرویس دوم - از راست به چپ */}
          <div
            className={`transform transition-all duration-1000 ease-out ${
              visible[1] 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`}
          >
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                <img
                  src={featuredServices[1].image}
                  alt={featuredServices[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
                  {featuredServices[1].icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-main mb-2 group-hover:text-primary transition-colors duration-300">
                  {featuredServices[1].title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {featuredServices[1].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {featuredServices[1].features.map((feat, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {feat}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/services/${featuredServices[1].slug}`}
                  className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 group/link"
                >
                  <span className="text-sm font-medium">مشاهده جزئیات</span>
                  <FiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}