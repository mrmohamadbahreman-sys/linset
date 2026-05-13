'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-main border border-primary hover:bg-primary/10 transition-all duration-300"
      aria-label="تغییر تم"
    >
      {isDark ? (
        <>
          <span className="text-base">🌙</span>
          <span className="text-sm text-muted hidden sm:inline">دارک</span>
        </>
      ) : (
        <>
          <span className="text-base">☀️</span>
          <span className="text-sm text-muted hidden sm:inline">لایت</span>
        </>
      )}
    </button>
  );
}