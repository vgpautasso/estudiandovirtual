import { NextResponse } from 'next/server';
import { calendar } from '@/lib/googleCalendar';

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

    const events = response.data.items || [];

    return NextResponse.json({ success: true, events });
  } catch (error: any) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}