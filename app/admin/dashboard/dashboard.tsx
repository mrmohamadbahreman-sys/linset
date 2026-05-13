'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({ projects: 0, categories: 0, consultations: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
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
        consultations: consultations.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    { title: 'پروژه‌ها', value: stats.projects, icon: '📁', color: 'from-blue-500 to-blue-600', link: '/admin/projects' },
    { title: 'دسته‌بندی‌ها', value: stats.categories, icon: '🏷️', color: 'from-green-500 to-green-600', link: '/admin/categories' },
    { title: 'درخواست مشاوره', value: stats.consultations, icon: '📞', color: 'from-purple-500 to-purple-600', link: '/admin/consultations' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">داشبورد</h1>
        <p className="text-stone-500 mt-1">خلاصه اطلاعات پنل مدیریت</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className={`bg-gradient-to-r ${card.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80 text-sm">{card.title}</p>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
              <span className="text-3xl opacity-80">{card.icon}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-stone-800 mb-4">دسترسی سریع</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/projects/new" className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition">
            <span className="text-2xl">➕</span>
            <span className="text-stone-700">افزودن پروژه جدید</span>
          </Link>
          <Link href="/admin/categories/new" className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition">
            <span className="text-2xl">🏷️</span>
            <span className="text-stone-700">افزودن دسته‌بندی</span>
          </Link>
          <Link href="/admin/consultations" className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition">
            <span className="text-2xl">📞</span>
            <span className="text-stone-700">مشاهده درخواست‌ها</span>
          </Link>
        </div>
      </div>
    </div>
  );
}