'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectCard from './components/ProjectCard';
import HeroBanner from './components/HeroBanner';
import SpecialServices from './components/TiltCard';
import FeaturedServices from './components/FeaturedServices';
import CyberServices from './components/CyberServices';
import CTASection from './components/CTASection';





interface Project {
  id: number;
  title: string;
  description: string;
  technology: string;
  desktop_screenshot: string;
  mobile_screenshot: string;
  image_url: string;
  category_slugs: string[];
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then((data: Project[]) => {
        setProjects(data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
            <div className="-mt-16 md:-mt-24">

        <HeroBanner />
      </div>
      {/* Projects Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">نمونه کارهای برتر</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted mt-6">افتخارات ما در همکاری با برندهای مطرح</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-2xl border border-primary/20">
              <p className="text-muted">هیچ پروژه‌ای یافت نشد</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          )}
          
          {projects.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/projects" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition">
                مشاهده همه پروژه‌ها
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>



      <SpecialServices />

      {/* Services Section */}
      <section className="relative">
  <CyberServices />
</section>
   
  
  


      <FeaturedServices />


      {/* CTA Section */}
      <CTASection />

    </>
  );
}