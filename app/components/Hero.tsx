'use client';

import { Sparkles, Laptop, Clock, FileDown, ArrowDown, Moon, Sun } from 'lucide-react';

interface HeroProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onHowItWorksClick: () => void;
}

export default function Hero({ theme, onThemeToggle, onHowItWorksClick }: HeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[92vh] text-center px-4 overflow-hidden">
      
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] select-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <button
        type="button"
        onClick={onThemeToggle}
        aria-label={`Activar modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
        aria-pressed={theme === 'dark'}
        className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-ink shadow-sm transition-colors hover:bg-page focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
        <span>Modo {theme === 'light' ? 'oscuro' : 'claro'}</span>
      </button>

      <div className="relative max-w-2xl space-y-8 py-12 flex flex-col items-center">
        
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={12} className="text-accent animate-pulse" />
          Clases particulares de matemática
        </span>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-primary leading-tight select-none">
          Estudiando{' '}
          <span className="font-[family-name:var(--font-kalam)] font-bold text-accent bg-primary-bg px-4 py-1 rounded-2xl block sm:inline-block transform rotate-[-1.5deg] mt-3 sm:mt-0 shadow-lg shadow-primary/10">
            Virtual
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-2">
          <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-surface-muted border border-border text-muted text-sm font-medium">
            <Laptop size={16} className="text-primary" />
            <span>100% Online</span>
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-surface-muted border border-border text-muted text-sm font-medium">
            <Clock size={16} className="text-primary" />
            <span>A tu ritmo</span>
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-surface-muted border border-border text-muted text-sm font-medium">
            <FileDown size={16} className="text-accent" />
            <span>Pizarra descargable</span>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={onHowItWorksClick}
            className="inline-block py-4 px-10 rounded-full font-bold text-lg bg-primary-bg text-on-primary hover:bg-primary-hover hover:text-accent transition-all duration-300 transform hover:scale-105 active:scale-[0.98] shadow-xl shadow-primary/20 cursor-pointer"
          >
            ¿Cómo funciona?
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce">
        <span className="text-xs font-semibold text-muted tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="text-primary" />
      </div>

    </section>
  );
}