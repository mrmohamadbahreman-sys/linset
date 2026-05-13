'use client';
import { useEffect, useState } from 'react';

interface WaveDividerProps {
  position?: 'top' | 'bottom';
  flip?: boolean;
}

export default function WaveDivider({ position = 'bottom', flip = false }: WaveDividerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={`relative w-full overflow-hidden ${position === 'top' ? '-mt-1' : '-mb-1'}`}>
      {/* پس‌زمینه محو پشت موج */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <svg
        className={`w-full h-20 md:h-32 lg:h-40 ${flip ? 'scale-x-[-1]' : ''}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* گرادیانت اصلی */}
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;0.3;0" dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="30%" stopColor="var(--primary-light)" stopOpacity="0.4">
              <animate attributeName="stop-opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="70%" stopColor="var(--primary)" stopOpacity="0.3">
              <animate attributeName="stop-opacity" values="0.1;0.4;0.1" dur="7s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="var(--primary-dark)" stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;0.3;0" dur="9s" repeatCount="indefinite" />
            </stop>
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-1 0"
              to="1 0"
              dur="15s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* گرادیانت دوم با حرکت مخالف */}
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;0.2;0" dur="7s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.25">
              <animate attributeName="stop-opacity" values="0.1;0.35;0.1" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="var(--accent-light)" stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;0.2;0" dur="8s" repeatCount="indefinite" />
            </stop>
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="1 0"
              to="-1 0"
              dur="18s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* گرادیانت سوم با رنگ طلایی */}
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;0.15;0" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.2">
              <animate attributeName="stop-opacity" values="0.05;0.25;0.05" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#d97706" stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;0.15;0" dur="7s" repeatCount="indefinite" />
            </stop>
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-0.5 0"
              to="0.5 0"
              dur="10s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* گرادیانت چهارم برای نئون گلو */}
          <radialGradient id="waveGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3">
              <animate attributeName="stop-opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* لایه موج اصلی - ضخیم و برجسته */}
        <path
          d="M0,64 C300,44 600,84 900,64 C1050,54 1150,64 1200,64 L1200,120 L0,120 Z"
          fill="url(#waveGradient1)"
          className="wave-path-1"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,64 C300,44 600,84 900,64 C1050,54 1150,64 1200,64 L1200,120 L0,120 Z;
              M0,74 C300,94 600,34 900,54 C1050,64 1150,74 1200,64 L1200,120 L0,120 Z;
              M0,64 C300,44 600,84 900,64 C1050,54 1150,64 1200,64 L1200,120 L0,120 Z
            "
          />
        </path>

        {/* لایه دوم موج - نازک و سریع */}
        <path
          d="M0,74 C280,94 580,44 880,74 C1080,94 1180,74 1200,74 L1200,120 L0,120 Z"
          fill="url(#waveGradient2)"
          opacity="0.8"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,74 C280,94 580,44 880,74 C1080,94 1180,74 1200,74 L1200,120 L0,120 Z;
              M0,64 C280,44 580,94 880,64 C1080,44 1180,64 1200,74 L1200,120 L0,120 Z;
              M0,74 C280,94 580,44 880,74 C1080,94 1180,74 1200,74 L1200,120 L0,120 Z
            "
          />
        </path>

        {/* لایه سوم موج - موج طلایی */}
        <path
          d="M0,84 C200,74 400,94 600,84 C800,74 1000,94 1200,84 L1200,120 L0,120 Z"
          fill="url(#waveGradient3)"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="
              M0,84 C200,74 400,94 600,84 C800,74 1000,94 1200,84 L1200,120 L0,120 Z;
              M0,94 C200,104 400,74 600,94 C800,104 1000,84 1200,94 L1200,120 L0,120 Z;
              M0,84 C200,74 400,94 600,84 C800,74 1000,94 1200,84 L1200,120 L0,120 Z
            "
          />
        </path>

        {/* هایلایت نئونی روی قله موج */}
        <ellipse cx="50%" cy="60" rx="40%" ry="8" fill="url(#waveGlow)" opacity="0.4">
          <animate attributeName="rx" values="40%;45%;40%" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
        </ellipse>
      </svg>

      {/* ذرات درخشان روی موج */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary animate-float-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${40 + Math.random() * 30}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.4 + Math.random() * 0.5
            }}
          />
        ))}
      </div>

      {/* خطوط موج‌وار نازک */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,60 Q300,30 600,60 T1200,60"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="0.5"
            opacity="0.3"
          >
            <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0,60 Q300,30 600,60 T1200,60;M0,70 Q300,40 600,70 T1200,70;M0,60 Q300,30 600,60 T1200,60" />
          </path>
          <path
            d="M0,75 Q300,45 600,75 T1200,75"
            fill="none"
            stroke="var(--accent-light)"
            strokeWidth="0.3"
            opacity="0.2"
          >
            <animate attributeName="d" dur="12s" repeatCount="indefinite" values="M0,75 Q300,45 600,75 T1200,75;M0,65 Q300,35 600,65 T1200,65;M0,75 Q300,45 600,75 T1200,75" />
          </path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes float-star {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          25% {
            opacity: 0.8;
            transform: scale(1.5);
          }
          100% {
            transform: translateY(-50px) translateX(${Math.random() * 60 - 30}px) scale(0);
            opacity: 0;
          }
        }
        .animate-float-star {
          animation: float-star linear infinite;
        }
      `}</style>
    </div>
  );
}