'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RiCloudyLine, RiCustomerService2Fill, RiLineChartLine, RiCheckboxCircleLine } from 'react-icons/ri';

const services = [
  {
    id: 'hosting',
    icon: <RiCloudyLine className="w-10 h-10" />,
    title: 'هاست ابری',
    duration: 'یک سال رایگان',
    description: 'میزبانی فوق سریع با uptime 99.9%',
    gradient: 'from-orange-500 to-red-500',
    iconBg: 'from-orange-500/20 to-red-500/20',
    glow: '#f97316',
    originalPrice: '۴,۸۰۰,۰۰۰ تومان',
    features: [
      'فضای ذخیره‌سازی ۱۰ گیگابایت',
      'پهنای باند نامحدود',
      'گواهی SSL رایگان',
      'پشتیبانی ۲۴/۷'
    ]
  },
  {
    id: 'support',
    icon: <RiCustomerService2Fill className="w-10 h-10" />,
    title: 'پشتیبانی ویژه',
    duration: 'یک سال رایگان',
    description: 'پشتیبانی اختصاصی و اولویت پاسخگویی',
    gradient: 'from-blue-500 to-cyan-500',
    iconBg: 'from-blue-500/20 to-cyan-500/20',
    glow: '#3b82f6',
    originalPrice: '۶,۵۰۰,۰۰۰ تومان',
    features: [
      'پاسخگویی تلفنی و آنلاین',
      'رفع باگ‌های احتمالی',
      'آموزش مدیریت سایت',
      'اولویت در پشتیبانی'
    ]
  },
  {
    id: 'seo',
    icon: <RiLineChartLine className="w-10 h-10" />,
    title: 'سئو تخصصی',
    duration: 'سه ماه رایگان',
    description: 'بهینه‌سازی برای رتبه اول گوگل',
    gradient: 'from-purple-500 to-pink-500',
    iconBg: 'from-purple-500/20 to-pink-500/20',
    glow: '#a855f7',
    originalPrice: '۸,۹۰۰,۰۰۰ تومان',
    features: [
      'بهینه‌سازی تکنیکال سئو',
      'تحلیل و تحقیق کلمات کلیدی',
      'بهینه‌سازی سرعت سایت',
      'گزارش ماهیانه عملکرد'
    ]
  }
];

// کارت تکی بدون بردر
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* سایه گلو (رنگی و نرم) */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition duration-500"
        style={{ background: `radial-gradient(circle at 30% 30%, ${service.glow}, transparent 70%)` }}
      />

      {/* کارت اصلی بدون بردر */}
      <div className="relative bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* گرادینت رنگی محو (در هاور دیده شود) */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

        <div className="p-6 text-center">
          {/* آیکون با دایره پس‌زمینه */}
          <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center text-primary mb-5 transition-transform duration-300 group-hover:scale-110`}>
            {service.icon}
          </div>

          {/* برچسب مدت */}
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
            🎁 {service.duration}
          </div>

          <h3 className="text-xl font-bold text-main mb-2">{service.title}</h3>
          <p className="text-muted text-sm leading-relaxed mb-4">{service.description}</p>

          {/* ویژگی‌ها */}
          <ul className="space-y-2 text-right mb-5">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-muted">
                <RiCheckboxCircleLine className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* قیمت */}
          <div className="border-t border-primary/10 pt-4">
            <div className="text-3xl font-bold text-primary mb-0">رایگان</div>
            <div className="text-light text-xs line-through">{service.originalPrice}</div>
          </div>

          {/* دکمه اکشن (هاور ظاهر می‌شود) */}
          <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 mt-2">
            <Link
              href="/contact"
              className={`block w-full py-2.5 mt-3 bg-gradient-to-r ${service.gradient} text-white rounded-xl font-medium text-sm transition-transform hover:scale-105`}
            >
              دریافت این فرصت
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// سکشن اصلی
export default function SpecialServices() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* دایره‌های تزئینی در پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* هدر سکشن */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-primary text-sm">🎁 پیشنهاد ویژه لینست</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-main mb-4"
          >
            با خیال راحت شروع کنید
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 80 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-muted mt-6 max-w-2xl mx-auto"
          >
            برای حمایت از کسب‌وکارهای تازه تأسیس، این پکیج‌های ویژه را آماده کرده‌ایم
          </motion.p>
        </div>

        {/* گرید کارت‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>

        {/* بخش پایینی (CTA) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-card/60 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm">
            <span className="text-2xl">✨</span>
            <span className="text-main font-medium">این فرصت رو از دست نده!</span>
            <Link 
              href="/contact"
              className="px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
            >
              دریافت مشاوره رایگان
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}