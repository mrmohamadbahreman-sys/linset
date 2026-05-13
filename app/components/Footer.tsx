'use client';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'خانه' },
    { href: '/about', label: 'درباره ما' },
    { href: '/services', label: 'خدمات' },
    { href: '/projects', label: 'نمونه کارها' },
    { href: '/contact', label: 'تماس با ما' },
  ];

  const services = [
    { href: '/services', label: 'طراحی سایت' },
    { href: '/services', label: 'توسعه اپلیکیشن' },
    { href: '/services', label: 'مشاوره فنی' },
    { href: '/services', label: 'سئو و بهینه‌سازی' },
  ];

  const contactInfo = [
    { icon: '📍', text: 'مشهد، بلوار وکیل آباد، برج تجاری قصر' },
    { icon: '📧', text: 'info@linset.ir', href: 'mailto:info@linset.ir' },
    { icon: '📞', text: '۰۹۱۲ ۳۴۵ ۶۷۸۹', href: 'tel:+989123456789' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Telegram', icon: '✈️', url: '#' },
    { name: 'GitHub', icon: '🐙', url: '#' },
  ];

  return (
    <footer className=" border-t border-primary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* بالا - در موبایل دو ستونه */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* لوگو و توضیحات - در موبایل کل عرض */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <Link href="/" className="text-2xl font-bold text-main inline-block mb-4">
              linset
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-4">
              شرکت برنامه نویسی لیسنت با ۱۰ سال تجربه در زمینه طراحی و توسعه وب، 
              اپلیکیشن و مشاوره فنی در خدمت شماست.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="text-main font-bold text-lg mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-primary transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* خدمات */}
          <div>
            <h3 className="text-main font-bold text-lg mb-4">خدمات ما</h3>
            <ul className="space-y-2">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.href}
                    className="text-muted hover:text-primary transition text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* تماس با ما - در موبایل کل عرض */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-main font-bold text-lg mb-4">تماس با ما</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary text-lg">{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-muted hover:text-primary transition text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-muted text-sm">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* پایین - کپی‌رایت */}
        <div className="pt-6 border-t border-primary text-center">
          <p className="text-muted text-sm">
            © {currentYear} لیسنت - تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}