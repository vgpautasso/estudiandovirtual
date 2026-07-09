import { NextResponse } from 'next/server';
import { calendar } from '@/lib/googleCalendar';

interface CleanEvent {
  start: string;
  end: string;
}

export async function GET() {
  try {
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: nextWeek.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const googleEvents = response.data.items || [];

    const cleanedEvents: CleanEvent[] = googleEvents.map((event) => {
      const startStr = event.start?.dateTime || event.start?.date || '';
      const endStr = event.end?.dateTime || event.end?.date || '';

      return {
        start: startStr,
        end: endStr,
      };
    });

    return NextResponse.json({ success: true, cleanedEvents });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}