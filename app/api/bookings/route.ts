import { NextResponse } from 'next/server';
import { calendar } from '@/lib/googleCalendar';
import { prisma } from '@/lib/prisma';

interface BookingRequestBody {
  studentName: string;
  studentEmail: string;
  startTime: string;
}

export async function POST(request: Request) {
  try {
    const body: BookingRequestBody = await request.json();
    const { studentName, studentEmail, startTime } = body;

    if (!studentName || !studentEmail || !startTime) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos: nombre, email y horario son obligatorios.' },
        { status: 400 }
      );
    }

    const slotStart = new Date(startTime);
    if (isNaN(slotStart.getTime())) {
      return NextResponse.json(
        { success: false, error: 'El horario enviado no es válido.' },
        { status: 400 }
      );
    }

    const now = new Date();
    if (slotStart < now) {
      return NextResponse.json(
        { success: false, error: 'No se puede reservar un horario que ya pasó.' },
        { status: 400 }
      );
    }

    const slotEnd = new Date(slotStart);
    slotEnd.setHours(slotEnd.getHours() + 1);

    const existingEvents = await calendar.events.list({
      calendarId: 'primary',
      timeMin: slotStart.toISOString(),
      timeMax: slotEnd.toISOString(),
      singleEvents: true,
    });

    const hasConflict = (existingEvents.data.items || []).length > 0;
    if (hasConflict) {
      return NextResponse.json(
        { success: false, error: 'Ese horario ya no está disponible. Por favor elegí otro.' },
        { status: 409 }
      );
    }

    const eventResponse = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody: {
        summary: `Clase de matemática - ${studentName}`,
        description: `Reserva realizada por ${studentEmail}`,
        start: { dateTime: slotStart.toISOString() },
        end: { dateTime: slotEnd.toISOString() },
        attendees: [{ email: studentEmail }],
        conferenceData: {
          createRequest: {
            requestId: `booking-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
    });

    const createdEvent = eventResponse.data;
    const meetLink = createdEvent.hangoutLink || '';
    const googleEventId = createdEvent.id || '';

    try {
      await prisma.booking.create({
        data: {
          studentName,
          studentEmail,
          startTime: slotStart,
          endTime: slotEnd,
          googleEventId,
          meetLink,
        },
      });
    } catch (dbError) {
      await calendar.events.delete({ calendarId: 'primary', eventId: googleEventId });
      throw new Error('Error al guardar en la base de datos.');
    }

    return NextResponse.json({
      success: true,
      booking: {
        studentName,
        studentEmail,
        startTime: slotStart.toISOString(),
        endTime: slotEnd.toISOString(),
        meetLink,
      },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}