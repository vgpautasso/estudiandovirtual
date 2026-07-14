'use client';

import { CalendarDays, Presentation, FileDown } from 'lucide-react';

interface HowItWorksProps {
  onReserve: () => void;
}

export default function HowItWorks({ onReserve }: HowItWorksProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-center">
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E8B94D] bg-[#1F3A34] px-3 py-1 rounded-full">
          Metodología
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F3A34]">
          ¿Cómo es una clase?
        </h2>
        <p className="text-[#6B6B63] text-sm sm:text-base max-w-md mx-auto">
          Un proceso simple, ágil y diseñado para que te enfoques únicamente en aprender.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative w-full mb-16">

        <div className="relative p-6 rounded-2xl bg-white/40 border border-[#E4DFCF] backdrop-blur-sm space-y-4 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
          <div className="absolute -top-4 -left-3 w-8 h-8 rounded-full bg-[#1F3A34] text-[#F5F1E8] font-bold flex items-center justify-center text-sm shadow-md">
            1
          </div>
          <div className="p-3 w-12 h-12 rounded-xl bg-[#1F3A34]/10 text-[#1F3A34] flex items-center justify-center group-hover:bg-[#1F3A34] group-hover:text-[#F5F1E8] transition-colors duration-300">
            <CalendarDays size={24} />
          </div>
          <h3 className="font-bold text-lg text-[#1F3A34]">Reservás tu horario</h3>
          <p className="text-sm text-[#6B6B63] leading-relaxed">
            Elegís la hora que te quede cómoda en el calendario de abajo. El sistema te genera y envía el enlace de Google Meet al instante.
          </p>
        </div>

        <div className="relative p-6 rounded-2xl bg-white/40 border border-[#E4DFCF] backdrop-blur-sm space-y-4 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
          <div className="absolute -top-4 -left-3 w-8 h-8 rounded-full bg-[#1F3A34] text-[#F5F1E8] font-bold flex items-center justify-center text-sm shadow-md">
            2
          </div>
          <div className="p-3 w-12 h-12 rounded-xl bg-[#1F3A34]/10 text-[#1F3A34] flex items-center justify-center group-hover:bg-[#1F3A34] group-hover:text-[#F5F1E8] transition-colors duration-300">
            <Presentation size={24} />
          </div>
          <h3 className="font-bold text-lg text-[#1F3A34]">Pizarra Interactiva</h3>
          <p className="text-sm text-[#6B6B63] leading-relaxed">
            Resolvemos los ejercicios juntos en una pizarra digital en tiempo real. Prestá atención sin preocuparte por tomar apuntes a las corridas.
          </p>
        </div>

        <div className="relative p-6 rounded-2xl bg-white/40 border border-[#E4DFCF] backdrop-blur-sm space-y-4 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
          <div className="absolute -top-4 -left-3 w-8 h-8 rounded-full bg-[#E8B94D] text-[#1F3A34] font-bold flex items-center justify-center text-sm shadow-md">
            3
          </div>
          <div className="p-3 w-12 h-12 rounded-xl bg-[#1F3A34]/10 text-[#1F3A34] flex items-center justify-center group-hover:bg-[#1F3A34] group-hover:text-[#F5F1E8] transition-colors duration-300">
            <FileDown size={24} className="group-hover:text-[#E8B94D]" />
          </div>
          <h3 className="font-bold text-lg text-[#1F3A34]">Pizarra Descargable</h3>
          <p className="text-sm text-[#6B6B63] leading-relaxed">
            Al finalizar, te llevás un archivo PDF descargable con todo el desarrollo de la clase listo para estudiar y repasar cuando quieras.
          </p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onReserve}
          className="inline-block py-4 px-12 rounded-full font-bold text-lg bg-[#1F3A34] text-[#F5F1E8] hover:bg-[#16302A] hover:text-[#E8B94D] transition-all duration-300 transform hover:scale-105 active:scale-[0.98] shadow-xl shadow-[#1F3A34]/20 cursor-pointer animate-pulse hover:animate-none"
        >
          Reservar una clase
        </button>
      </div>
    </section>
  );
}