import { NextResponse } from 'next/server';
import { fromZonedTime } from 'date-fns-tz';
import { calendar } from '@/lib/googleCalendar';

interface BusyEvent {
  start: string;
  end: string;
}

const TIME_ZONE = 'America/Argentina/Buenos_Aires';
const WORK_HOURS = [8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21];
const DAYS_AHEAD = 7;

export async function GET() {
  try {
    const now = new Date();
    const rangeEnd = new Date(now);
    rangeEnd.setDate(now.getDate() + DAYS_AHEAD);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: rangeEnd.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const googleEvents = response.data.items || [];

    const busyEvents: BusyEvent[] = googleEvents.map((event) => ({
      start: event.start?.dateTime || event.start?.date || '',
      end: event.end?.dateTime || event.end?.date || '',
    }));

    const availableSlots: string[] = [];

    for (let i = 0; i < DAYS_AHEAD; i++) {
      const currentDay = new Date(now);
      currentDay.setDate(now.getDate() + i);

      const dayOfWeek = currentDay.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      const year = currentDay.getFullYear();
      const month = currentDay.getMonth();
      const day = currentDay.getDate();

      for (const hour of WORK_HOURS) {
        const wallClockDate = new Date(year, month, day, hour, 0, 0);

        const slotStart = fromZonedTime(wallClockDate, TIME_ZONE);

        if (slotStart < now) continue;

        const slotEnd = new Date(slotStart);
        slotEnd.setHours(slotEnd.getHours() + 1);

        const isBusy = busyEvents.some((busyEvent) => {
          const busyStart = new Date(busyEvent.start);
          const busyEnd = new Date(busyEvent.end);
          return slotStart < busyEnd && slotEnd > busyStart;
        });

        if (!isBusy) {
          availableSlots.push(slotStart.toISOString());
        }
      }
    }

    return NextResponse.json({ success: true, availableSlots });
  } catch (error) {
    console.error('Error calculating available slots:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}