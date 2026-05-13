'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  const [activeWord, setActiveWord] = useState(0);
  
  const rotatingWords = [
    'رویاهایتان ✨',
    'ایده‌هایتان 💡',
    'کسب‌وکارتان 🚀',
    'برندتان ⭐'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      
      {/* ===== دایره‌های متحرک با framer-motion ===== */}
      
      {/* دایره ۱ - حرکت رفت و برگشتی افقی */}
      <motion.div
        className="absolute w-100 h-100 bg-primary/10 rounded-full blur-3xl"
        style={{ top: '5%', left: '-10%' }}
        animate={{
          x: ['0%', '30%', '0%'],
          y: ['0%', '-10%', '0%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* دایره ۲ - حرکت عمودی */}
      <motion.div
        className="absolute w-87.5 h-87.5 bg-primary/15 rounded-full blur-3xl"
        style={{ top: '-15%', right: '-5%' }}
        animate={{
          y: ['0%', '40%', '0%'],
          x: ['0%', '-10%', '0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* دایره ۳ - حرکت مورب */}
      <motion.div
        className="absolute w-75 h-75 bg-accent/10 rounded-full blur-3xl"
        style={{ bottom: '5%', left: '-8%' }}
        animate={{
          x: ['0%', '25%', '0%'],
          y: ['0%', '-20%', '0%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* دایره ۴ - حرکت دایره‌ای */}
      <motion.div
        className="absolute w-95 h-95 bg-primary/12 rounded-full blur-3xl"
        style={{ bottom: '-10%', right: '-5%' }}
        animate={{
          x: ['0%', '-20%', '0%', '20%', '0%'],
          y: ['0%', '-15%', '-30%', '-15%', '0%'],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />


         {/* دایره ۵ - حرکت چرخشی بزرگ */}
         <motion.div
        className="absolute top-1/2 left-1/2 w-125 h-125 rounded-full border border-primary/10 border-t-primary/50 border-r-primary/30"
        initial={{ x: '-50%', y: '-50%', rotate: 0 }}
        animate={{ x: '-50%', y: '-50%', rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* دایره ۶ - حرکت چرخشی معکوس */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-87.5 h-87.5 rounded-full border border-primary/10 border-b-primary/60 border-l-transparent border-dashed"
        initial={{ x: '-50%', y: '-50%', rotate: 0 }}
        animate={{ x: '-50%', y: '-50%', rotate: -360 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />


      {/* دایره ۷ - حرکت نوسانی کوچک */}
      <motion.div
        className="absolute w-37.5 h-37.5 bg-primary/20 rounded-full blur-2xl"
        style={{ top: '30%', left: '15%' }}
        animate={{
          scale: [1, 1.2, 1],
          x: ['0%', '10%', '0%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* ===== محتوای اصلی ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        
        {/* لوگو با انیمیشن */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-primary/20 mb-8"
        >
          <div className="w-10 h-10 bg-linear-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-primary font-bold text-xl">L</span>
          </div>
          <div>
            <span className="text-primary font-bold text-xl">لینست</span>
            <span className="text-main text-lg"> | Linset</span>
          </div>
        </motion.div>

        {/* تیتر اصلی */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
            <span className="text-main">ما </span>
            
            {/* کلمه چرخان */}
            <span className="relative inline-block mx-1 align-middle">
              <span className="relative inline-block min-w-45 md:min-w-65 text-center">
                {rotatingWords.map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: idx === activeWord ? 1 : 0,
                      y: idx === activeWord ? 0 : 20,
                      display: idx === activeWord ? 'inline-block' : 'none'
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background: 'linear-gradient(135deg, #2563EB, #60A5FA)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      fontWeight: 'bold',
                      position: idx === activeWord ? 'relative' : 'absolute',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              
              {/* خط زیر کلمه */}
              <motion.div
                className="absolute -bottom-3 left-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent rounded-full"
                animate={{
                  width: ['0%', '100%', '0%'],
                  left: ['50%', '0%', '50%'],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </span>
            
            <span className="text-main"> را به واقعیت تبدیل می‌کنیم</span>
          </h1>
        </motion.div>

        {/* توضیحات */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          تیم متخصص <span className="text-primary font-semibold">لینست</span> با بهره‌گیری از جدیدترین تکنولوژی‌ها،
          ایده‌های شما را به محصولی قدرتمند و مقیاس‌پذیر تبدیل می‌کند.
        </motion.p>

        {/* دکمه‌ها */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="px-8 py-3 bg-primary text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            شروع پروژه جدید
          </Link>
          <Link
            href="/projects"
            className="px-8 py-3 bg-card text-main rounded-xl font-semibold border-2 border-border hover:border-primary hover:text-primary transition-all duration-300"
          >
            مشاهده نمونه کارها
          </Link>
        </motion.div>
      </div>

      {/* اسکرول ایندیکاتور */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted tracking-wider">بیشتر بدانید</span>
          <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
            <div className="w-1.5 h-2.5 bg-primary rounded-full mt-2" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}