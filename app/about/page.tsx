'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  FiStar, FiSearch, FiAward, FiBriefcase, FiUsers, 
  FiHeart, FiArrowRight, FiTarget, FiEye, FiCpu, FiShield,
  FiTrendingUp, FiCheckCircle
} from 'react-icons/fi';

export default function AboutPage() {
  const [animate, setAnimate] = useState(false);
  const [letters, setLetters] = useState([
    { char: 'L', animated: false, pos: -100 },
    { char: 'i', animated: false, pos: -100 },
    { char: 'n', animated: false, pos: -100 },
    { char: 'S', animated: false, pos: 100 },
    { char: 'e', animated: false, pos: 100 },
    { char: 't', animated: false, pos: 100 }
  ]);
  const [shotComplete, setShotComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    setTimeout(() => {
      setLetters(prev => prev.map((letter, i) => ({
        ...letter,
        animated: true,
        pos: 0
      })));
    }, 100);

    setTimeout(() => {
      setAnimate(true);
      setTimeout(() => {
        setShotComplete(true);
        setTimeout(() => {
          setShowContent(true);
        }, 500);
      }, 600);
    }, 2000);
  }, []);

  const stats = [
    { value: '۲+', label: 'سال تجربه', icon: <FiAward className="w-10 h-10" /> },
    { value: '۱۵+', label: 'پروژه موفق', icon: <FiBriefcase className="w-10 h-10" /> },
    { value: '۵+', label: 'تیم متخصص', icon: <FiUsers className="w-10 h-10" /> },
    { value: '۱۰۰%', label: 'رضایت مشتری', icon: <FiHeart className="w-10 h-10" /> }
  ];

  const values = [
    { title: 'نوآوری', desc: 'همیشه به دنبال راه‌های جدید و خلاقانه برای حل مشکلات', icon: <FiCpu className="w-8 h-8" /> },
    { title: 'کیفیت', desc: 'تعهد به ارائه بهترین کیفیت در تمام پروژه‌ها', icon: <FiShield className="w-8 h-8" /> },
    { title: 'شفافیت', desc: 'ارتباط شفاف و صادقانه با مشتریان در تمام مراحل', icon: <FiSearch className="w-8 h-8" /> }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden relative z-10">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slower" />
        </div>

        <div className="relative z-10 text-center" dir='ltr'>
          <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
            {letters.map((letter, idx) => (
              <span
                key={idx}
                className={`
                  text-8xl md:text-9xl lg:text-[12rem] font-black
                  transition-all duration-700 ease-out
                  ${letter.animated ? 'opacity-100 translate-x-0' : 'opacity-0'}
                  ${letter.char === 'S' ? 'text-primary' : 'text-main'}
                `}
                style={{
                  transform: `translateX(${letter.pos}px)`,
                  transitionDelay: `${idx * 80}ms`,
                }}
              >
                {letter.char}
              </span>
            ))}
          </div>

          <div className={`
            w-32 h-0.5 bg-primary mx-auto mt-8 rounded-full
            transition-all duration-1000 delay-700
            ${letters.every(l => l.animated) ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
          `} />
        </div>

        {animate && (
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="absolute inset-0 bg-white animate-flash" />
            <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
              <div className="absolute inset-0 bg-primary/30 rounded-full animate-smoke-1" />
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-smoke-2" />
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-smoke-3" />
            </div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-primary animate-shot-line" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-primary animate-shot-line-h" />
          </div>
        )}

        <div className={`
          absolute bottom-20 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full
          transition-all duration-1000 shadow-lg shadow-primary/50
          ${shotComplete ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
        `} />
      </section>

      {/* محتوا */}
      <div className={`
        transition-all duration-700 transform
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}>
        
        {/* ماموریت و چشم‌انداز */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">داستان لیسنت</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center md:text-right bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mx-auto md:mx-0 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <FiTarget className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-main mb-3">ماموریت ما</h3>
                <p className="text-muted leading-relaxed">
                  توانمندسازی کسب‌وکارهای نوپا با ارائه راهکارهای دیجیتال مقرون‌به‌صرفه و باکیفیت. 
                  ما معتقدیم هر ایده‌ای سزاوار یک پلتفرم عالی برای رشد است.
                </p>
              </div>
              <div className="text-center md:text-right bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mx-auto md:mx-0 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <FiEye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-main mb-3">چشم‌انداز ما</h3>
                <p className="text-muted leading-relaxed">
                  تبدیل شدن به همراه اصلی استارتاپ‌ها و کسب‌وکارهای نوپا در مسیر تحول دیجیتال
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* چرا لیسنت */}
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
                <FiStar className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">ارزش‌های ما</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">چرا لیسنت؟</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
              <p className="text-muted mt-6 max-w-2xl mx-auto">
                ما می‌دانیم که شروع کار سخت است. به همین دلیل کنار شما هستیم
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, idx) => (
                <div key={idx} className="text-center p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-main mb-2">{value.title}</h3>
                  <p className="text-muted text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* آمار */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
                <FiTrendingUp className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">دستاوردها</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">ارقام افتخار</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
              <p className="text-muted mt-6 max-w-2xl mx-auto">
                اعداد و ارقامی که نشان از تعهد و کیفیت کار ما دارند
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center p-6 bg-card rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-muted text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* دعوت به همکاری */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <FiStar className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">
                بیایید با هم رشد کنیم
              </h2>
              <p className="text-muted text-lg mb-8">
                ما اینجا هستیم تا به شما در مسیر تحول دیجیتال کمک کنیم. 
                همین حالا با ما تماس بگیرید و ایده خود را به واقعیت تبدیل کنید.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  شروع همکاری
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-card text-main px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-md border border-primary/20"
                >
                  مشاهده نمونه کارها
                  <FiBriefcase className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.15); }
        }
        @keyframes flash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes smoke-1 {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes smoke-2 {
          0% { transform: scale(0.3); opacity: 0.6; }
          100% { transform: scale(5); opacity: 0; }
        }
        @keyframes smoke-3 {
          0% { transform: scale(0.2); opacity: 0.4; }
          100% { transform: scale(6); opacity: 0; }
        }
        @keyframes shot-line {
          0% { transform: scaleY(0); opacity: 1; }
          100% { transform: scaleY(1); opacity: 0; }
        }
        @keyframes shot-line-h {
          0% { transform: scaleX(0); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 6s ease-in-out infinite; }
        .animate-flash { animation: flash 0.3s ease-out forwards; }
        .animate-smoke-1 { animation: smoke-1 0.8s ease-out forwards; }
        .animate-smoke-2 { animation: smoke-2 0.8s ease-out forwards 0.1s; }
        .animate-smoke-3 { animation: smoke-3 0.8s ease-out forwards 0.2s; }
        .animate-shot-line { animation: shot-line 0.5s ease-out forwards; }
        .animate-shot-line-h { animation: shot-line-h 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}