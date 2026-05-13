import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'تماس با ما | لیسنت',
  description: 'راه‌های ارتباطی با تیم لیسنت | مشاوره رایگان، پشتیبانی ۲۴/۷',
  keywords: 'تماس با ما, مشاوره برنامه نویسی, پشتیبانی, لیسنت',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* هدر صفحه */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-main mb-4">تماس با ما</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            ما اینجا هستیم تا به شما کمک کنیم. هر سوالی دارید، با ما در میان بگذارید.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* اطلاعات تماس */}
          <div className="lg:col-span-1 space-y-6">
            {/* کارت اطلاعات */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-primary">
              <h2 className="text-xl font-bold text-main mb-6">اطلاعات تماس</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-main">ایمیل</h3>
                    <a href="mailto:info@linset.ir" className="text-muted hover:text-primary transition">
                      info@linset.ir
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-main">تلفن</h3>
                    <a href="tel:+989123456789" className="text-muted hover:text-primary transition">
                      ۰۹۱۲ ۳۴۵ ۶۷۸۹
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-main">آدرس</h3>
                    <p className="text-muted">مشهد، بلوار وکیل آباد، برج تجاری قصر</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ساعات کاری */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-primary">
              <h2 className="text-xl font-bold text-main mb-4">ساعات کاری</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted">شنبه تا چهارشنبه</span>
                  <span className="text-main font-medium">۹:۰۰ - ۱۸:۰۰</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">پنج‌شنبه</span>
                  <span className="text-main font-medium">۹:۰۰ - ۱۳:۰۰</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">جمعه</span>
                  <span className="text-muted">تعطیل</span>
                </div>
              </div>
            </div>

            {/* شبکه‌های اجتماعی */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-primary">
              <h2 className="text-xl font-bold text-main mb-4">ما را دنبال کنید</h2>
              <div className="flex gap-4">
                {[
                  { name: 'LinkedIn', icon: '💼', url: '#' },
                  { name: 'Instagram', icon: '📷', url: '#' },
                  { name: 'Telegram', icon: '✈️', url: '#' },
                  { name: 'GitHub', icon: '🐙', url: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* فرم تماس */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-primary">
              <h2 className="text-2xl font-bold text-main mb-6">ارسال پیام</h2>
              
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-main mb-2">نام و نام خانوادگی *</label>
                    <input
                      type="text"
                      placeholder="نام خود را وارد کنید"
                      className="w-full px-4 py-3 bg-bg-main border border-primary rounded-xl text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-main mb-2">ایمیل *</label>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 bg-bg-main border border-primary rounded-xl text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-main mb-2">موضوع *</label>
                  <input
                    type="text"
                    placeholder="موضوع پیام خود را وارد کنید"
                    className="w-full px-4 py-3 bg-bg-main border border-primary rounded-xl text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-main mb-2">پیام شما *</label>
                  <textarea
                    rows={6}
                    placeholder="پیام خود را بنویسید..."
                    className="w-full px-4 py-3 bg-bg-main border border-primary rounded-xl text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  ارسال پیام
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* نقشه */}
        <div className="mt-12">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-primary">
            <h2 className="text-xl font-bold text-main mb-4 text-center">موقعیت ما روی نقشه</h2>
            <div className="w-full h-64 bg-bg-main rounded-xl flex items-center justify-center border border-primary">
              <div className="text-center">
                <div className="text-5xl mb-2">📍</div>
                <p className="text-muted">مشهد، بلوار وکیل آباد، برج تجاری قصر</p>
                <p className="text-light text-sm mt-2">طبقه ۵، واحد ۵۰۲</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}