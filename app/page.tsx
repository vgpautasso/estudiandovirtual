'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import BookingForm from './components/BookingForm';

function subscribeToTheme(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener('theme-change', onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener('theme-change', onChange);
  };
}

function getThemeSnapshot(): 'light' | 'dark' {
  return window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
}

function getServerThemeSnapshot(): 'light' | 'dark' {
  return 'light';
}

export default function Home() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const [showBooking, setShowBooking] = useState(false);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  const handleThemeToggle = () => {
    window.localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    window.dispatchEvent(new Event('theme-change'));
  };

  const handleScrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const handleReserve = () => {
    setShowBooking(true);
    setTimeout(() => {
      bookingRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 150);
  };

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-page text-ink font-[family-name:var(--font-poppins)] selection:bg-primary-bg selection:text-on-primary scroll-smooth transition-colors duration-300"
    >
      
      <Hero
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onHowItWorksClick={handleScrollToHowItWorks}
      />

      <div ref={howItWorksRef} className="scroll-mt-12">
        <HowItWorks onReserve={handleReserve} />
      </div>

      <div
        ref={bookingRef}
        className={`max-w-5xl mx-auto px-4 scroll-mt-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showBooking 
            ? 'opacity-100 translate-y-0 max-h-[1200px] pb-24 pt-8 pointer-events-auto visible' 
            : 'opacity-0 translate-y-8 max-h-0 py-0 pointer-events-none invisible overflow-hidden'
        }`}
      >
        <BookingForm />
      </div>
    </div>
  );
}