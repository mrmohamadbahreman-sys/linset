'use client';
import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string;
  technology: string;
  desktop_screenshot: string;
  mobile_screenshot: string;
  image_url: string;
  category_slugs: string[];
  category_ids: number[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/categories')
      ]);
      
      const projectsData = await projectsRes.json();
      const categoriesData = await categoriesRes.json();
      
      setProjects(projectsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // فیلتر پروژه‌ها بر اساس کتگوری انتخاب شده
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => 
        project.category_slugs && project.category_slugs.includes(selectedCategory)
      );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">در حال بارگذاری پروژه‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* هدر صفحه */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-main mb-4">
            نمونه کارهای ما
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            نگاهی به پروژه‌های موفق تیم لیسنت | طراحی و توسعه با React، Next.js و وردپرس
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </div>

        {/* فیلتر کتگوری */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`
              px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${selectedCategory === 'all'
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : 'bg-card text-muted hover:bg-primary/10 hover:text-main border border-primary'
              }
            `}
          >
            همه پروژه‌ها
            <span className="mr-1 text-xs opacity-80">({projects.length})</span>
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === cat.slug
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'bg-card text-muted hover:bg-primary/10 hover:text-main border border-primary'
                }
              `}
            >
              {cat.name}
              <span className="mr-1 text-xs opacity-80">
                ({projects.filter(p => p.category_slugs?.includes(cat.slug)).length})
              </span>
            </button>
          ))}
        </div>

        {/* گرید پروژه‌ها */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-primary">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-muted text-lg">هیچ پروژه‌ای در این دسته یافت نشد</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 text-primary hover:text-primary-dark transition inline-flex items-center gap-1"
            >
              مشاهده همه پروژه‌ها
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        )}

        {/* آمار */}
        {projects.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-card rounded-full px-6 py-3 shadow-sm border border-primary">
              <span className="text-muted">تعداد کل پروژه‌ها:</span>
              <span className="text-primary font-bold text-xl">{projects.length}</span>
              <span className="text-border">|</span>
              <span className="text-muted">تعداد دسته‌بندی‌ها:</span>
              <span className="text-primary font-bold text-xl">{categories.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}