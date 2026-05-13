'use client';
import { useEffect, useState } from 'react';

const typingServices = [
  { name: 'توسعه موبایل', letters: ['ت', 'و', 'س', 'ع', 'ه', ' ', 'م', 'و', 'ب', 'ا', 'ی', 'ل'] },
  { name: 'طراحی سایت', letters: ['ط', 'ر', 'ا', 'ح', 'ی', ' ', 'س', 'ا', 'ی', 'ت'] },
  { name: 'برنامه نویسی', letters: ['ب', 'ر', 'ن', 'ا', 'م', 'ه', ' ', 'ن', 'و', 'ی', 'س', 'ی'] },
  { name: 'سئو و بهینه سازی', letters: ['س', 'ئ', 'و', ' ', 'و', ' ', 'ب', 'ه', 'ی', 'ن', 'ه', ' ', 'س', 'ا', 'ز', 'ی'] },
  { name: 'مشاوره فنی', letters: ['م', 'ش', 'ا', 'و', 'ر', 'ه', ' ', 'ف', 'ن', 'ی'] },
];

const keyboardRows = [
  ['ق', 'ص', 'ض', 'ع', 'ث', 'چ', 'ج', 'ح', 'خ', 'ه'],
  ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک', 'گ'],
  ['و', 'ئ', 'ر', 'ذ', 'د', 'ف', 'آ', 'ز', 'ط']
];

export default function HeroServices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedLetters, setTypedLetters] = useState<number[]>([]);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    const currentService = typingServices[currentIndex];
    const targetWord = currentService.name;
    
    let timeout: NodeJS.Timeout;
    
    if (!isDeleting) {
      if (displayText.length < targetWord.length) {
        timeout = setTimeout(() => {
          const newText = targetWord.slice(0, displayText.length + 1);
          setDisplayText(newText);
          setTypedLetters(prev => [...prev, displayText.length]);
          
          const currentLetter = targetWord[displayText.length];
          setActiveKeys(prev => [...prev, currentLetter]);
          
          setTimeout(() => {
            setActiveKeys(prev => prev.filter(k => k !== currentLetter));
          }, 300);
        }, 150);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
          setTypedLetters(prev => prev.slice(0, -1));
        }, 80);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % typingServices.length);
        setTypedLetters([]);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  const getLetterColor = (letter: string) => {
    const currentService = typingServices[currentIndex];
    const currentWord = currentService.name;
    const currentTypingLetter = currentWord[typedLetters.length];
    
    if (currentTypingLetter === letter) {
      return 'bg-primary text-white shadow-lg scale-110 ring-2 ring-primary/50';
    }
    
    const typedLettersArray = currentWord.slice(0, typedLetters.length).split('');
    if (typedLettersArray.includes(letter)) {
      return 'bg-primary/40 text-white';
    }
    
    return 'bg-main text-muted border border-primary/20';
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-transparent to-primary/5 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slower" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* عنوان */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur rounded-full px-4 py-1.5 mb-6 border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-medium text-primary">خدمات تخصصی لیسنت</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-main mb-4">
            خدمات <span className="text-primary">ما</span>
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-lg text-muted mt-6 max-w-2xl mx-auto">
            راهکارهای تخصصی و مدرن برای رشد کسب‌وکار شما
          </p>
        </div>

        {/* بخش دو ستونه کیبورد و تایپ */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-8">
          
          {/* سمت چپ - متن در حال تایپ */}
          <div className="flex-1 w-full">
            <div className="bg-card rounded-2xl p-8 shadow-2xl">
              <div className="text-lg text-muted mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                ما ارائه می‌دهیم:
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-main leading-relaxed">
                {displayText}
                <span className="animate-pulse text-primary text-4xl md:text-5xl">|</span>
              </div>
              <div className="mt-8 flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse delay-150" />
                <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse delay-300" />
              </div>
            </div>
          </div>

          {/* سمت راست - کیبورد مجازی */}
          <div className="flex-1 w-full">
            <div className="bg-card rounded-2xl p-6 shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs text-primary">کیبورد مجازی</span>
                </div>
              </div>
              
              {keyboardRows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex justify-center gap-2 mb-2">
                  {row.map((key, colIdx) => (
                    <div
                      key={colIdx}
                      className={`
                        w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-bold text-sm
                        transition-all duration-200
                        ${getLetterColor(key)}
                      `}
                    >
                      {key}
                    </div>
                  ))}
                </div>
              ))}
              
              <div className="flex justify-center mt-4">
                <div className="w-48 h-10 rounded-lg bg-main border border-primary/20 flex items-center justify-center text-xs text-muted">
                  فاصله
                </div>
              </div>
              
              <div className="text-center text-xs text-muted mt-6">
                کیبورد در حال تایپ خدمات ما...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}