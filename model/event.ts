
import moment from "moment";

type TimezonedDatetime = {
  dateTime: string;
  timeZone: string;
}

export type Event = {
  start: TimezonedDatetime;
  end: TimezonedDatetime;
  summary: string;
  description: string;
  location: string;
}

function chronological(a: Event, b: Event): number {
  return moment(a.end.dateTime).diff(moment(b.end.dateTime));
}

export function filterAndOrderDates(fullEventsList: Event[]): Event[] {
  const currentTime = moment();
  return fullEventsList
    .filter((event) => {
      const eventEndTime = moment(event.end.dateTime);
      return eventEndTime.isAfter(currentTime);
    })
    .sort(chronological);
}
