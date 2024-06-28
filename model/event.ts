
import moment, { Moment } from "moment-timezone";

type TimezonedDatetime = {
  dateTime: string;
  timeZone: string;
}

export type Event = {
  start: TimezonedDatetime;
  end: TimezonedDatetime;
  summary: string; // title (should be location)
  description: string;
  location: string; // link to event
}

export function getTimezonedDate(timezonedDatetime: TimezonedDatetime): Moment {
  return moment(timezonedDatetime.dateTime).tz(timezonedDatetime.timeZone);
}

function chronological(a: Event, b: Event): number {
  return getTimezonedDate(a.end).diff(getTimezonedDate(b.end));
}

export function filterAndOrderDates(fullEventsList: Event[]): Event[] {
  const currentTime = moment();
  return fullEventsList
    .filter((event) => {
      // this function is run on a server in the eastern timezone (same as the google calendar)
      // so we don't apply the timezone when filtering
      const eventEndTime = moment(event.end.dateTime);
      return eventEndTime.isAfter(currentTime);
    })
    .sort(chronological);
}
