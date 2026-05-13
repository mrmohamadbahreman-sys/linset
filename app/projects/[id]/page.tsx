'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Page {
  name: string;
  screenshot: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technology: string;
  site_url: string;
  github_url: string;
  desktop_screenshot: string;
  mobile_screenshot: string;
  image_url: string;
  pages: Page[];
  category_slugs: string[];
}

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(0);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const projectRes = await fetch(`/api/projects/${params.id}`);
      const projectData = await projectRes.json();
      setProject(projectData);
      
      const allProjectsRes = await fetch('/api/projects');
      const allProjects = await allProjectsRes.json();
      
      if (projectData.category_slugs && projectData.category_slugs.length > 0) {
        const related = allProjects.filter((p: Project) => 
          p.id !== projectData.id && 
          p.category_slugs?.some((cat: string) => projectData.category_slugs.includes(cat))
        ).slice(0, 3);
        setRelatedProjects(related);
      }
      
      if (projectData.pages && projectData.pages.length > 0) {
        setSelectedPage(0);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'react': 'from-primary to-primary-dark',
      'next': 'from-primary to-primary-dark',
      'vue': 'from-primary to-primary-dark',
      'angular': 'from-primary to-primary-dark',
      'wordpress': 'from-primary to-primary-dark',
      'laravel': 'from-primary to-primary-dark',
      'python': 'from-primary to-primary-dark'
    };
    return colors[tech?.toLowerCase()] || 'from-primary to-primary-dark';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-card rounded-2xl p-8 border border-primary">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-muted mb-4">پروژه مورد نظر یافت نشد</p>
          <Link href="/projects" className="text-primary hover:text-primary-dark transition">
            بازگشت به نمونه کارها
          </Link>
        </div>
      </div>
    );
  }

  const currentScreenshot = project.pages?.[selectedPage]?.screenshot || project.desktop_screenshot || project.image_url;

  return (
    <div className="min-h-screen">
      
      {/* هدر با تصویر پس‌زمینه */}
      <div className="relative h-[45vh] md:h-[55vh] overflow-hidden mx-20 rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-10" />
        <img
          src={currentScreenshot || '/images/placeholder-large.jpg'}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
          <div>
            <div className="mb-4">
              <span className={`inline-block bg-gradient-to-r ${getTechColor(project.technology)} text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg`}>
                {project.technology?.toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</h1>
            <Link href="/projects" className="text-white/70 hover:text-white inline-flex items-center gap-2 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              بازگشت به نمونه کارها
            </Link>
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="container mx-auto px-4 max-w-7xl -mt-20 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* سمت راست - نمایش اسکرین‌شات */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden sticky top-24 border border-primary">
              {/* نوار مرورگر */}
              <div className="bg-main px-4 py-3 flex items-center gap-2 border-b border-primary">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-card h-8 rounded-lg px-3 flex items-center text-muted text-sm border border-primary">
                    {project.site_url || 'linset.ir'}
                  </div>
                </div>
              </div>
              
              {/* تصویر */}
              <div className="relative h-[500px] md:h-[550px] overflow-auto">
                <img
                  src={currentScreenshot}
                  alt={project.pages?.[selectedPage]?.name || project.title}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* سمت چپ - اطلاعات */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-xl p-6 sticky top-24 space-y-6 border border-primary">
              
              {/* توضیحات */}
              <div>
                <h2 className="text-xl font-bold text-main mb-3">درباره پروژه</h2>
                <p className="text-muted leading-relaxed">{project.description}</p>
              </div>

              {/* تکنولوژی */}
              <div>
                <h3 className="text-sm font-semibold text-muted mb-2">تکنولوژی</h3>
                <div className={`inline-block bg-gradient-to-r ${getTechColor(project.technology)} text-white px-4 py-2 rounded-full text-sm font-medium shadow-md`}>
                  {project.technology?.toUpperCase()}
                </div>
              </div>

              {/* دسته‌بندی */}
              {project.category_slugs && project.category_slugs.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted mb-2">دسته‌بندی</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.category_slugs.map((cat, idx) => (
                      <Link
                        key={idx}
                        href={`/projects?category=${cat}`}
                        className="text-xs text-muted px-3 py-1 rounded-full border border-primary hover:bg-primary hover:text-white hover:border-primary transition"
                      >
                        {cat === 'ecommerce' ? 'فروشگاهی' : 
                         cat === 'corporate' ? 'شرکتی' :
                         cat === 'personal' ? 'شخصی' :
                         cat === 'news' ? 'خبری' :
                         cat === 'educational' ? 'آموزشی' : cat}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* لینک‌ها */}
              {(project.site_url || project.github_url) && (
                <div className="flex gap-3">
                  {project.site_url && (
                    <a
                      href={project.site_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary text-white text-center px-4 py-3 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 shadow-md"
                    >
                      مشاهده سایت زنده
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-main text-muted px-4 py-3 rounded-xl font-medium hover:bg-primary/10 hover:text-main transition-all duration-300 text-center border border-primary"
                    >
                      گیت‌هاب
                    </a>
                  )}
                </div>
              )}

              {/* صفحات سایت */}
              {project.pages && project.pages.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted mb-3">صفحات سایت</h3>
                  <div className="space-y-2">
                    {project.pages.map((page, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedPage(idx)}
                        className={`
                          w-full text-right px-4 py-3 rounded-xl transition-all duration-300 flex justify-between items-center
                          ${selectedPage === idx 
                            ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                            : 'hover:bg-primary/5 text-muted border border-primary'
                          }
                        `}
                      >
                        <span className="font-medium">{page.name}</span>
                        {selectedPage === idx && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* پروژه‌های مرتبط */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <div className="border-t border-primary pt-12">
              <h2 className="text-2xl font-bold text-center text-main mb-8">
                پروژه‌های مشابه
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((relProject) => (
                  <Link
                    key={relProject.id}
                    href={`/projects/${relProject.id}`}
                    className="group block bg-card rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-primary"
                  >
                    <div className="h-40 overflow-hidden bg-main">
                      <img
                        src={relProject.desktop_screenshot || relProject.image_url || '/images/placeholder.jpg'}
                        alt={relProject.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-main group-hover:text-primary transition">
                        {relProject.title}
                      </h3>
                      <p className="text-xs text-muted mt-1">{relProject.technology?.toUpperCase()}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-muted hover:text-primary transition"
                >
                  مشاهده همه پروژه‌ها
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}