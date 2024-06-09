
import type { NextApiRequest, NextApiResponse } from 'next'

const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
// const CALENDAR_ID = `a4u4bvsa491isjkc9q2g6f8j60@group.calendar.google.com`;
const CALENDAR_ID = 'pjflanagan1@gmail.com';

const CALENDAR_EVENTS_ENDPOINT = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}`;

export async function fetchEvents() {
  const response = await fetch(CALENDAR_EVENTS_ENDPOINT);
  return await response.json();
}

// TODO: define
type ResponseData = any;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const events = await fetchEvents();

  res.status(200).json(events.items);
}
