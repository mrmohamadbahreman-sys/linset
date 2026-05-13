'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    categories: 0,
    consultations: 0,
    pendingConsultations: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, categoriesRes, consultationsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/categories'),
        fetch('/api/consultations')
      ]);
      
      const projects = await projectsRes.json();
      const categories = await categoriesRes.json();
      const consultations = await consultationsRes.json();
      
      setStats({
        projects: projects.length,
        categories: categories.length,
        consultations: consultations.length,
        pendingConsultations: consultations.filter((c: any) => c.status === 'pending').length
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'پروژه‌ها', value: stats.projects, icon: '📁', color: 'from-blue-500 to-cyan-500', href: '/admin/projects' },
    { title: 'دسته‌بندی‌ها', value: stats.categories, icon: '🏷️', color: 'from-purple-500 to-pink-500', href: '/admin/categories' },
    { title: 'درخواست‌های مشاوره', value: stats.consultations, icon: '📞', color: 'from-green-500 to-emerald-500', href: '/admin/consultations' },
    { title: 'درخواست‌های جدید', value: stats.pendingConsultations, icon: '🆕', color: 'from-orange-500 to-red-500', href: '/admin/consultations?status=pending' },
  ];

  const recentProjects = [
    { name: 'فروشگاه آنلاین', tech: 'React', status: 'تکمیل شده' },
    { name: 'سایت شرکتی', tech: 'Next.js', status: 'در حال توسعه' },
    { name: 'اپلیکیشن موبایل', tech: 'React Native', status: 'تکمیل شده' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-main mb-6">داشبورد</h1>
      
      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <Link key={idx} href={card.href}>
            <div className="bg-card rounded-2xl p-6 border border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center text-2xl`}>
                  {card.icon}
                </div>
                <span className="text-3xl font-bold text-primary">{card.value}</span>
              </div>
              <h3 className="text-muted text-sm">{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* پروژه‌های اخیر */}
        <div className="bg-card rounded-2xl p-6 border border-primary/20">
          <h2 className="text-lg font-bold text-main mb-4">پروژه‌های اخیر</h2>
          <div className="space-y-3">
            {recentProjects.map((project, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-main rounded-xl">
                <div>
                  <p className="font-medium text-main">{project.name}</p>
                  <p className="text-xs text-muted">{project.tech}</p>
                </div>
                <span className="text-xs text-green-500">{project.status}</span>
              </div>
            ))}
          </div>
          <Link href="/admin/projects" className="inline-block mt-4 text-sm text-primary hover:text-primary-dark">
            مشاهده همه پروژه‌ها →
          </Link>
        </div>

        {/* دسترسی سریع */}
        <div className="bg-card rounded-2xl p-6 border border-primary/20">
          <h2 className="text-lg font-bold text-main mb-4">دسترسی سریع</h2>
          <div className="space-y-3">
            <Link href="/admin/projects" className="flex items-center gap-3 p-3 bg-main rounded-xl hover:bg-primary/5 transition">
              <span className="text-2xl">➕</span>
              <div>
                <p className="font-medium text-main">افزودن پروژه جدید</p>
                <p className="text-xs text-muted">پروژه جدید به نمونه کارها اضافه کنید</p>
              </div>
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-3 p-3 bg-main rounded-xl hover:bg-primary/5 transition">
              <span className="text-2xl">🏷️</span>
              <div>
                <p className="font-medium text-main">مدیریت دسته‌بندی‌ها</p>
                <p className="text-xs text-muted">دسته‌بندی جدید اضافه یا ویرایش کنید</p>
              </div>
            </Link>
            <Link href="/admin/consultations" className="flex items-center gap-3 p-3 bg-main rounded-xl hover:bg-primary/5 transition">
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-medium text-main">درخواست‌های مشاوره</p>
                <p className="text-xs text-muted">پیام‌های دریافتی از کاربران</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}