'use client';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiArrowRight, FiMessageCircle, FiPhoneCall } from 'react-icons/fi';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      {/* پس‌زمینه با افکت شیشه‌ای و گرادیانت */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20" />
      
      {/* دایره‌های تزئینی متحرک */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* محتوای اصلی */}
      <div className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          {/* نشانگر / برچسب */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-primary/20"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary text-sm font-medium">پیشنهاد ویژه</span>
          </motion.div>

          {/* تیتر اصلی */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-main mb-4"
          >
            آماده شروع <span className="text-primary">همکاری</span> هستید؟
          </motion.h2>

          {/* زیرنویس */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto"
          >
            بیایید ایده شما را به واقعیت تبدیل کنیم. تیم ما آماده شنیدن ایده‌های شماست.
          </motion.p>

          {/* دکمه‌ها */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {/* دکمه اصلی */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10">شروع همکاری</span>
              <FiArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Link>

            {/* دکمه دوم - تماس تلفنی */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-card text-main px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/10 hover:text-primary transition-all duration-300 shadow-md border border-primary/20"
            >
              <FiPhoneCall className="w-4 h-4" />
              <span>مشاوره تلفنی رایگان</span>
            </Link>
          </motion.div>

          {/* آمار یا گارانتی */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-primary/10 flex flex-wrap justify-center gap-6 text-sm text-muted"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>پشتیبانی ۲۴/۷</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>تضمین کیفیت</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>مشاوره رایگان اولیه</span>
            </div>
          </motion.div>
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