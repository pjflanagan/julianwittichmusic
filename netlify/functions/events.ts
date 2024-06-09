
import { Handler } from '@netlify/functions';

const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
// const CALENDAR_ID = `a4u4bvsa491isjkc9q2g6f8j60@group.calendar.google.com`;
const CALENDAR_ID = 'pjflanagan1@gmail.com';

const CALENDAR_EVENTS_ENDPOINT = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}`;

export async function fetchEvents() {
  const response = await fetch(CALENDAR_EVENTS_ENDPOINT);
  return await response.json();
}

const handler: Handler = async (_event, _context) => {
  const events = await fetchEvents();

  return {
    statusCode: 200,
    body: JSON.stringify(events.items)
  };
}

export { handler };