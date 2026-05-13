'use client';
import { useEffect, useRef } from 'react';

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkRef = useRef(true);

  useEffect(() => {
    // تشخیص تم (لایت یا دارک)
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      isDarkRef.current = isDark;
    };
    
    checkTheme();
    
    //监听 تم تغییر
    const observer = new MutationObserver(() => {
      checkTheme();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;

    // حلقه‌های نورانی (رنگ‌ها با تم تغییر می‌کنن)
    const rings: { radius: number; speed: number; angle: number; x: number; y: number; getColor: () => string }[] = [];
    for (let i = 0; i < 8; i++) {
      rings.push({
        radius: 80 + i * 30,
        speed: 0.002 + i * 0.0005,
        angle: Math.PI * 2 * (i / 8),
        x: width / 2 + (Math.sin(i) * 100),
        y: height / 2 + (Math.cos(i) * 80),
        getColor: () => {
          const baseColor = isDarkRef.current ? 210 : 35;
          return `hsla(${baseColor + i * 15}, 70%, ${isDarkRef.current ? 60 : 45}%, 0.12)`;
        }
      });
    }

    // ذرات ستاره‌ای
    const stars: { x: number; y: number; size: number; speed: number; angle: number; getColor: () => string }[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2.5,
        speed: 0.2 + Math.random() * 0.6,
        angle: Math.random() * Math.PI * 2,
        getColor: () => {
          const hue = isDarkRef.current ? 200 + Math.random() * 40 : 30 + Math.random() * 40;
          return `hsla(${hue}, 75%, ${isDarkRef.current ? 65 : 50}%, ${0.4 + Math.random() * 0.4})`;
        }
      });
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawGrid = () => {
      const gridSize = 50;
      const offsetX = time * 10;
      const offsetY = time * 7;
      const opacity = isDarkRef.current ? 0.08 : 0.04;

      // خطوط عمودی
      for (let x = offsetX % gridSize; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity + Math.sin(time + x * 0.01) * 0.03})`;
        ctx.stroke();
      }
      
      // خطوط افقی
      for (let y = offsetY % gridSize; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity + Math.cos(time + y * 0.01) * 0.03})`;
        ctx.stroke();
      }
    };

    const drawRings = () => {
      for (const ring of rings) {
        ring.angle += ring.speed;
        const x = width / 2 + Math.sin(ring.angle) * ring.radius * 0.7;
        const y = height / 2 + Math.cos(ring.angle * 0.7) * ring.radius * 0.5;
        
        ctx.beginPath();
        ctx.ellipse(x, y, ring.radius, ring.radius * 0.6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.getColor();
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    };

    const drawStars = () => {
      for (const star of stars) {
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        
        if (star.x < -30) star.x = width + 30;
        if (star.x > width + 30) star.x = -30;
        if (star.y < -30) star.y = height + 30;
        if (star.y > height + 30) star.y = -30;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.getColor();
        ctx.shadowBlur = 8;
        ctx.shadowColor = isDarkRef.current ? '#3b82f6' : '#f59e0b';
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const drawExtraGlow = () => {
      for (let i = 0; i < 30; i++) {
        const x = (Math.sin(time * 0.3 + i) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.5 + i * 2) * 0.4 + 0.5) * height;
        const size = 1.5 + Math.sin(time * 2 + i) * 0.8;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        const hue = isDarkRef.current ? 200 : 40;
        ctx.fillStyle = `hsla(${hue}, 70%, ${isDarkRef.current ? 60 : 50}%, 0.15)`;
        ctx.fill();
      }
    };

    const animate = () => {
      if (!ctx) return;
      
      // پس‌زمینه بر اساس تم (از متغیرهای CSS استفاده می‌کنیم)
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      if (isDarkRef.current) {
        bgGradient.addColorStop(0, '#0a0a1a');
        bgGradient.addColorStop(0.5, '#0f172a');
        bgGradient.addColorStop(1, '#020617');
      } else {
        bgGradient.addColorStop(0, '#f5f5f4');
        bgGradient.addColorStop(0.5, '#e7e5e4');
        bgGradient.addColorStop(1, '#f5f5f4');
      }
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      drawGrid();
      drawRings();
      drawStars();
      drawExtraGlow();
      
      time += 0.008;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />;
}