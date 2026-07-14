'use client';

import { useState, useRef } from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import BookingForm from './components/BookingForm';

export default function Home() {
  const [showBooking, setShowBooking] = useState(false);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-[#F5F1E8] text-[#2B2B28] font-[family-name:var(--font-poppins)] selection:bg-[#1F3A34] selection:text-[#F5F1E8] scroll-smooth">
      
      <Hero onHowItWorksClick={handleScrollToHowItWorks} />

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