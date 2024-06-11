
import type { NextApiRequest, NextApiResponse } from 'next'

import { Event } from '../../model';

const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
const CALENDAR_ID = '8e350f17a74a7dbd84eb59af5b9c2e85e64dcd8e6c2d6ecf1dddff69b194a6ad@group.calendar.google.com';
const CALENDAR_EVENTS_ENDPOINT = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}`;

type ResponseData = Event[];

export async function fetchFutureEvents() {
  const response = await fetch(CALENDAR_EVENTS_ENDPOINT, {
    method: 'GET',
    // body: JSON.stringify({
    //   timeMin: Date.now(),
    // })
  });
  return await response.json();
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let items = [];
  try {
    const events = await fetchFutureEvents();
    if (events.error) {
      throw events.error.message;
    }
    items = events.items;
  } catch(e) {
    console.error('Error fetching Google Calendar API: ', e)
  }

  res.status(200).json(items);
}
