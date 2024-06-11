import Link from "next/link";
import moment from "moment";
import { Event } from "../../pages/api/events";
import { Icon } from "../icon";
import Style from "./style.module.scss";

type FormattedEvent = {
  title?: string;
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
    title: event.description && stripHTMLFormatting(event.description),
    time: moment(event.start.dateTime).format("h:mma"),
    date: moment(event.start.dateTime).format("MMM D"),
    location: event.summary,
    link: event.location,
  };
}

type EventsListProps = {
  eventsList: Event[];
};

export function EventsList({ eventsList }: EventsListProps) {
  return (
    <div className={Style["events-list"]}>
      {eventsList.map((event, i) => {
        const formattedEvent = formatEvent(event);
        const eventElem = (
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
                <div className={Style["link-button"]}>
                  <Icon name="open_in_new" />
                </div>
              </div>
            )}
          </div>
        );
        if (formattedEvent.link) {
          return (
            <Link key={i} href={formattedEvent.link} target="_blank">
              {eventElem}
            </Link>
          );
        }
        return eventElem;
      })}
    </div>
  );
}
