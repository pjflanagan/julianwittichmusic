import Link from "next/link";
import moment from "moment";
import { Event } from "../../pages/api/events";

import Style from "./style.module.scss";

type FormattedEvent = {
  title: string;
  time: string;
  date: string;
  location: string;
  link?: string;
};

function stripHTMLFormatting(htmlString: string): string {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.textContent || div.innerText || "";
}

function formatEvent(event: Event): FormattedEvent {
  return {
    title: event.summary,
    time: moment(event.start.dateTime).format("h:mma"),
    date: moment(event.start.dateTime).format("MMM D"),
    location: event.location,
    link: event.description ? stripHTMLFormatting(event.description) : undefined,
  };
}

type EventsListProps = {
  eventsList: Event[];
};

export function EventsList({ eventsList }: EventsListProps) {
  return (
    <div className={Style["events-list"]}>
      {eventsList.map((event, i) => {
        console.log(event);
        const formattedEvent = formatEvent(event);
        return (
          <div key={i} className={Style["event"]}>
            <div className={Style["date-time"]}>
              <div className={Style["date"]}>{formattedEvent.date}</div>
              <div className={Style["time"]}>{formattedEvent.time}</div>
            </div>
            <div className={Style["event-location"]}>
              <div className={Style["location"]}>{formattedEvent.location}</div>
              <div className={Style["title"]}>{formattedEvent.title}</div>
            </div>
            {formattedEvent.link && (
              <div className={Style["link"]}>
                <Link href={formattedEvent.link} target="_blank">
                  <div className={Style["link-button"]}>
                    {/* TODO: one of those open arrow icons */}
                    Info
                  </div>
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
