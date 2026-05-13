'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaReact, FaVuejs, FaWordpress, FaAngular, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFlutter, SiLaravel } from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import { BiLogoNetlify } from 'react-icons/bi';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    technology: string;
    desktop_screenshot: string;
    mobile_screenshot: string;
    image_url: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const [showMobileView, setShowMobileView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imgError, setImgError] = useState(false);

  // تشخیص موبایل
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // سوئیچ خودکار تصاویر در موبایل
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => setShowMobileView(prev => !prev), 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  // افکت 3D tilt (فقط در دسکتاپ و هاور)
  useEffect(() => {
    if (!isHovered || !cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (mousePosition.y - centerY) / 25;
    const rotateY = (mousePosition.x - centerX) / 25;
    setRotation({ x: rotateX, y: rotateY });
  }, [mousePosition, isHovered, isMobile]);

  // خط اسکن
  useEffect(() => {
    const interval = setInterval(() => setScanLine(prev => (prev + 1) % 100), 50);
    return () => clearInterval(interval);
  }, []);

  // گلیچ رندوم
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.96) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 120);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleRipple = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples(prev => [...prev, { x, y, id: Date.now() }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== Date.now())), 600);
  };

  // تشخیص آیکون مناسب بر اساس تکنولوژی
  const getTechIcon = () => {
    const tech = project.technology?.toLowerCase();
    if (tech === 'react') return <FaReact className="w-7 h-7" />;
    if (tech === 'next') return <SiNextdotjs className="w-7 h-7" />;
    if (tech === 'vue') return <FaVuejs className="w-7 h-7" />;
    if (tech === 'angular') return <FaAngular className="w-7 h-7" />;
    if (tech === 'wordpress') return <FaWordpress className="w-7 h-7" />;
    if (tech === 'reactnative') return <TbBrandReactNative className="w-7 h-7" />;
    if (tech === 'flutter') return <SiFlutter className="w-7 h-7" />;
    if (tech === 'laravel') return <SiLaravel className="w-7 h-7" />;
    if (tech === 'node') return <FaNodeJs className="w-7 h-7" />;
    return <SiTypescript className="w-7 h-7" />;
  };

  const getTechGradient = () => {
    const tech = project.technology?.toLowerCase();
    if (tech === 'react') return 'from-cyan-400 to-blue-500';
    if (tech === 'next') return 'from-gray-700 to-black';
    if (tech === 'vue') return 'from-emerald-400 to-green-600';
    if (tech === 'wordpress') return 'from-blue-500 to-indigo-700';
    return 'from-primary to-primary-dark';
  };

  const shouldShowMobileView = isMobile ? showMobileView : isHovered;
  const imageSrc = project.desktop_screenshot || project.image_url;

  return (
    <Link href={`/projects/${project.id}`}>
      <div
        ref={cardRef}
        className="relative group cursor-pointer"
        style={{
          perspective: '1000px',
          animation: `floatCard ${3 + index * 0.3}s ease-in-out infinite`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setRotation({ x: 0, y: 0 });
        }}
        onMouseMove={handleMouseMove}
        onClick={handleRipple}
      >
        <div
          className="relative rounded-2xl overflow-hidden transition-all duration-300 bg-card"
          style={{
            transform: isHovered && !isMobile
              ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(-12px) scale(1.02)`
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
            transition: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
            boxShadow: isHovered
              ? '0 25px 40px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.05) inset'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* بک‌گراند گرادیانت متحرک (ملایم) */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 30% 20%, var(--primary)30, transparent)`,
              animation: 'gradientShift 8s ease infinite'
            }}
          />

          {/* خط اسکن */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `linear-gradient(to bottom, transparent ${scanLine}%, rgba(0, 255, 255, 0.08) ${scanLine}%, transparent ${scanLine + 8}%)`,
              transition: 'background 0.05s linear'
            }}
          />

          {/* گلیچ */}
          {isGlitching && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute inset-0 bg-cyan-500/15 animate-glitch-1" />
              <div className="absolute inset-0 bg-purple-500/15 animate-glitch-2" />
            </div>
          )}

          {/* تصویر */}
          <div className="relative h-64 overflow-hidden ">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            {!imgError && imageSrc ? (
              <img
                src={imageSrc}
                alt={project.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  shouldShowMobileView ? 'scale-110 blur-[1px]' : 'scale-100'
                }`}
                style={{
                  clipPath: shouldShowMobileView && !isMobile
                    ? 'polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%)'
                    : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                🚀
              </div>
            )}

            {/* تصویر موبایل (فقط در هاور یا حالت موبایل) */}
            {project.mobile_screenshot && (
              <div
                className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-700 ${
                  shouldShowMobileView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
              >
                <div className="relative w-36 h-64 rounded-2xl border-4 border-white/20 shadow-2xl overflow-hidden">
                  <img
                    src={project.mobile_screenshot}
                    alt={`${project.title} mobile`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/30 rounded-b-xl" />
                </div>
              </div>
            )}

            {/* آیکون تکنولوژی - شیک و مدرن */}
            <div className="absolute top-4 right-4 z-20">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTechGradient()} bg-opacity-90 backdrop-blur-sm flex items-center justify-center text-white shadow-lg transition-all duration-300 ${isHovered ? 'rotate-6 scale-110' : ''}`}>
                {getTechIcon()}
              </div>
            </div>

            {/* برچسب وضعیت در موبایل */}
            {isMobile && (
              <div className="absolute bottom-3 left-3 z-20 bg-black/50 backdrop-blur rounded-full px-2 py-0.5 text-white text-[10px]">
                {shouldShowMobileView ? '📱 موبایل' : '💻 دسکتاپ'}
              </div>
            )}
          </div>

          {/* محتوای کارت (عنوان، توضیحات) */}
          <div className="relative z-10 p-5 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent">
            <h3 className="text-xl font-bold text-white mb-1">
              {project.title}
              <span className={`inline-block mr-2 transition-all duration-300 ${isHovered ? 'translate-x-1 opacity-100' : 'opacity-0'}`}>
                →
              </span>
            </h3>
            <p className="text-gray-300 text-sm line-clamp-2">
              {project.description || 'توضیحاتی برای این پروژه وجود ندارد'}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-primary/80">{project.technology?.toUpperCase() || 'پروژه'}</span>
              <div className="flex-1 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: isHovered ? '100%' : '0%' }} />
              </div>
            </div>
          </div>

          {/* ریپل (افکت موج) */}
          {ripples.map(ripple => (
            <div
              key={ripple.id}
              className="absolute rounded-full pointer-events-none z-50"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 0,
                height: 0,
                transform: 'translate(-50%, -50%)',
                animation: 'rippleWave 0.5s ease-out forwards',
                background: `radial-gradient(circle, var(--primary)80 0%, transparent 70%)`
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes floatCard {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes rippleWave {
            0% { width: 0; height: 0; opacity: 0.7; }
            100% { width: 180px; height: 180px; opacity: 0; }
          }
          @keyframes glitch-1 {
            0%, 100% { transform: translate(0); opacity: 0.15; }
            33% { transform: translate(-4px, 1px); opacity: 0.3; }
            66% { transform: translate(4px, -1px); opacity: 0.1; }
          }
          @keyframes glitch-2 {
            0%, 100% { transform: translate(0); opacity: 0.15; }
            33% { transform: translate(4px, -1px); opacity: 0.1; }
            66% { transform: translate(-4px, 1px); opacity: 0.3; }
          }
          .animate-glitch-1 { animation: glitch-1 0.12s infinite; }
          .animate-glitch-2 { animation: glitch-2 0.12s infinite; }
        `}</style>
      </div>
    </Link>
  );
}