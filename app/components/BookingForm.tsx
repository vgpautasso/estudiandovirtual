'use client';

import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface GroupedSlots {
  [dateKey: string]: string[];
}

export default function BookingForm() {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [groupedSlots, setGroupedSlots] = useState<GroupedSlots>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function fetchSlots() {
      try {
        const response = await fetch('/api/available-slots');
        const data = await response.json();

        if (data.success && data.availableSlots) {
          const groups: GroupedSlots = {};
          data.availableSlots.forEach((slotStr: string) => {
            const dateKey = slotStr.split('T')[0];
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(slotStr);
          });
          setGroupedSlots(groups);
        } else {
          setMessage({ type: 'error', text: 'No se pudieron cargar los horarios disponibles.' });
        }
      } catch {
        setMessage({ type: 'error', text: 'Error de conexión al buscar horarios.' });
      } finally {
        setLoading(false);
      }
    }
    fetchSlots();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail || !selectedSlot) {
      setMessage({ type: 'error', text: 'Completá todos los campos.' });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName, studentEmail, startTime: selectedSlot }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: 'success',
          text: 'Clase reservada. Revisá tu correo para la invitación de Google Meet.',
        });
        setStudentName('');
        setStudentEmail('');
        setSelectedSlot('');

        const updatedGroups = { ...groupedSlots };
        Object.keys(updatedGroups).forEach((dateKey) => {
          updatedGroups[dateKey] = updatedGroups[dateKey].filter((s) => s !== selectedSlot);
        });
        setGroupedSlots(updatedGroups);
      } else {
        setMessage({ type: 'error', text: data.error || 'Hubo un problema al reservar.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error al procesar la reserva. Intentá de nuevo.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto rounded-3xl bg-[#F5F1E8] overflow-hidden text-[#2B2B28] border border-[#E4DFCF] shadow-2xl transition-all duration-500">
      <div className="bg-[#1F3A34] text-center py-10 px-8 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
        <h3 className="font-[family-name:var(--font-kalam)] text-4xl sm:text-5xl text-[#F5F1E8]">
          Elegí tu clase
        </h3>
        <p className="text-sm sm:text-base text-[#9CB3AC] mt-2 font-medium tracking-wide">
          Horarios disponibles, próximos 7 días
        </p>
      </div>

      <div className="p-8 sm:p-10 bg-white/40 backdrop-blur-sm">
        {message && (
          <div
            className={`p-4 mb-6 rounded-xl text-sm font-semibold border transition-all ${
              message.type === 'success'
                ? 'bg-[#EAF3DE] text-[#3B6D11] border-[#C0DD97]'
                : 'bg-[#FAECE7] text-[#993C1D] border-[#F0997B]'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Tu nombre completo"
              className="w-full px-4 py-3.5 bg-white border border-[#D8D2C0] rounded-xl text-base outline-none focus:border-[#1F3A34] focus:ring-2 focus:ring-[#1F3A34]/10 transition-all placeholder-[#A19D90]"
            />
            <input
              type="email"
              required
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              className="w-full px-4 py-3.5 bg-white border border-[#D8D2C0] rounded-xl text-base outline-none focus:border-[#1F3A34] focus:ring-2 focus:ring-[#1F3A34]/10 transition-all placeholder-[#A19D90]"
            />
          </div>

          <div className="max-h-96 overflow-y-auto pr-2 space-y-6 scrollbar-thin">
            {Object.keys(groupedSlots).length === 0 ? (
              <p className="text-[#6B6B63] text-sm italic text-center py-6">
                No hay horarios disponibles por el momento.
              </p>
            ) : (
              Object.keys(groupedSlots)
                .sort()
                .map((dateKey) => {
                  const parsedDate = parseISO(`${dateKey}T00:00:00`);
                  return (
                    <div key={dateKey} className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#1F3A34] border-b border-dashed border-[#C8C1AC] pb-1.5 capitalize">
                        {format(parsedDate, "EEEE, d 'de' MMMM", { locale: es })}
                      </p>
                      <div className="grid grid-cols-4 gap-2.5">
                        {groupedSlots[dateKey].map((slotStr) => {
                          const slotDate = parseISO(slotStr);
                          const isSelected = selectedSlot === slotStr;
                          return (
                            <button
                              key={slotStr}
                              type="button"
                              onClick={() => setSelectedSlot(slotStr)}
                              className={`relative py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 transform active:scale-95 ${
                                isSelected
                                  ? 'bg-[#1F3A34] text-[#E8B94D] border-[#1F3A34] shadow-md scale-[1.03]'
                                  : 'bg-white text-[#2B2B28] border-[#D8D2C0] hover:border-[#1F3A34] hover:bg-[#F5F1E8]/30'
                              }`}
                            >
                              {format(slotDate, 'HH:mm')} hs
                              {isSelected && (
                                <span
                                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E8B94D] flex items-center justify-center"
                                  aria-hidden="true"
                                >
                                  <svg
                                    width="9"
                                    height="9"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.5 5L4 7.5L8.5 2.5"
                                      stroke="#1F3A34"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || !selectedSlot}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform active:scale-[0.99] shadow-lg ${
              submitting || !selectedSlot
                ? 'bg-[#D8D2C0] text-[#8A8575] cursor-not-allowed shadow-none'
                : 'bg-[#1F3A34] text-[#F5F1E8] hover:bg-[#16302A] hover:shadow-[#1F3A34]/10'
            }`}
          >
            {submitting ? 'Procesando tu lugar...' : 'Confirmar clase'}
          </button>
        </form>
      </div>
    </div>
  );
}