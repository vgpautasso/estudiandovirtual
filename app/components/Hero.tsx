'use client';

import { Sparkles, Laptop, Clock, FileDown, ArrowDown } from 'lucide-react';

interface HeroProps {
  onHowItWorksClick: () => void;
}

export default function Hero({ onHowItWorksClick }: HeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[92vh] text-center px-4 overflow-hidden">
      
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] select-none"
        style={{
          backgroundImage:
            'linear-gradient(#1F3A34 1px, transparent 1px), linear-gradient(90deg, #1F3A34 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-2xl space-y-8 py-12 flex flex-col items-center">
        
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1F3A34]/10 text-[#1F3A34] text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={12} className="text-[#E8B94D] animate-pulse" />
          Clases particulares de matemática
        </span>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#1F3A34] leading-tight select-none">
          Estudiando{' '}
          <span className="font-[family-name:var(--font-kalam)] font-bold text-[#E8B94D] bg-[#1F3A34] px-4 py-1 rounded-2xl block sm:inline-block transform rotate-[-1.5deg] mt-3 sm:mt-0 shadow-lg shadow-[#1F3A34]/10">
            Virtual
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-2">
          <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/50 border border-[#E4DFCF] text-[#6B6B63] text-sm font-medium">
            <Laptop size={16} className="text-[#1F3A34]" />
            <span>100% Online</span>
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/50 border border-[#E4DFCF] text-[#6B6B63] text-sm font-medium">
            <Clock size={16} className="text-[#1F3A34]" />
            <span>A tu ritmo</span>
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/50 border border-[#E4DFCF] text-[#6B6B63] text-sm font-medium">
            <FileDown size={16} className="text-[#E8B94D]" />
            <span>Pizarra descargable</span>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={onHowItWorksClick}
            className="inline-block py-4 px-10 rounded-full font-bold text-lg bg-[#1F3A34] text-[#F5F1E8] hover:bg-[#16302A] hover:text-[#E8B94D] transition-all duration-300 transform hover:scale-105 active:scale-[0.98] shadow-xl shadow-[#1F3A34]/20 cursor-pointer"
          >
            ¿Cómo funciona?
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce">
        <span className="text-xs font-semibold text-[#6B6B63] tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="text-[#1F3A34]" />
      </div>

    </section>
  );
}