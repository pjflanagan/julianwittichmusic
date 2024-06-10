
import type { NextApiRequest, NextApiResponse } from 'next'

const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
const CALENDAR_ID = '8e350f17a74a7dbd84eb59af5b9c2e85e64dcd8e6c2d6ecf1dddff69b194a6ad@group.calendar.google.com';

const CALENDAR_EVENTS_ENDPOINT = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}`;

export async function fetchFutureEvents() {
  const response = await fetch(CALENDAR_EVENTS_ENDPOINT, {
    method: 'GET',
    // body: JSON.stringify({
    //   timeMin: Date.now(),
    // })
  });
  return await response.json();
}

type Event = {[key: string]: any}
type ResponseData = Event[];

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const events = await fetchFutureEvents();

  // TODO: error handling

  res.status(200).json(events.items);
}
