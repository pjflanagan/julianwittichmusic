import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { SocialIconRow } from "../../components";
import { EventsList } from '../../components';
import { Event } from "../../pages/api/events";
import Style from "./style.module.scss";

function chronological(a: Event, b: Event): number {
  return moment(a.end.dateTime).diff(moment(b.end.dateTime));
}

function filterAndOrderDates(fullEventsList: Event[]): Event[] {
  const currentTime = moment();
  return fullEventsList.filter((event) => {
    const eventEndTime = moment(event.end.dateTime);
    return eventEndTime.isAfter(currentTime);
  }).sort(chronological);
}

export function Main() {
  const [eventsList, setEventsList] = useState<Event[]>([]);

  async function fetchEvents() {
    const response = await fetch("/api/events");
    const fullEventsList: Event[] = await response.json();
    const futureEventsList = filterAndOrderDates(fullEventsList);
    setEventsList(futureEventsList);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div className={Style["section"]} id={Style["intro"]}>
        <div className={Style["intro-content"]}>
          <div className={Style["logo-holder"]}>
            <img src="/img/logo/logo.png" width="84" />
          </div>
          <h1>Julian B. Wittich</h1>
          <h4>Jazz Bassist performing in NYC</h4>
          <SocialIconRow />
        </div>
      </div>
      <hr className={Style["intro"]} />
      <div className={Style["section"]} id={Style["events"]}>
        <h2>Events</h2>
        <p>
          You can find Julian performing in{" "}
          <Link
            href="https://maps.app.goo.gl/xh3V6TjgnDdKoPpJ6"
            target="_blank"
          >
            Washington Square Park
          </Link>{" "}
          all summer long.
        </p>
        <EventsList eventsList={eventsList} />
      </div>
      <div className={Style["section"]} id={Style["bio"]}>
        <h2>About</h2>
        <p>
          Julian Wittich (b. 1999) is a jazz bassist and composer based in both
          Amsterdam and Taipei. Born and raised in Taipei, Taiwan, Wittich began
          his musical studies with the violin at 7 years old. He soon discovered
          his appetite for various styles of music, teaching himself to play the
          electric bass at age 13 and eventually the double bass at age 17.
        </p>
        <p>
          Currently studying at the Conservatorium van Amsterdam with some of
          Europe's most in demand jazz bassists, including Frans van der Hoeven,
          Clemens van der Feen, and John Clayton. Since coming back to Taiwan in
          March 2020, he has been making a name for himself in Taiwan's jazz
          scene, and has also been working with established pop artists in Asia,
          including JJ Lin and 9m88.
        </p>
        {/* <!-- <iframe
                style="border-radius: 12px"
                src="https://open.spotify.com/embed/artist/64mWZmWHfA6SoxqoibbwbR?utm_source=generator"
                width="100%"
                height="152"
                frameborder="0"
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe> --> */}
        <iframe
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/artist/64mWZmWHfA6SoxqoibbwbR?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder={0}
          allowFullScreen={false}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
      <div className={Style["section"]} id={Style["contact"]}>
        <h2>Contact</h2>
        <p>
          For inquiries, feel free to send Julian an{" "}
          <Link href="mailto:julianw017@gmail.com">email</Link>.
        </p>
      </div>
      <hr />
      <div className={Style["section"]} id={Style["footer"]}>
        <p>
          Website by{" "}
          <Link
            href="https://pjflanagan.me"
            target="_blank"
            title="Peter Flanagan"
          >
            Peter Flanagan
          </Link>
        </p>
        <p>
          F Cut Violin by Cristian Scarlat from{" "}
          <Link
            href="https://thenounproject.com/browse/icons/term/f-cut-violin/"
            target="_blank"
            title="F Cut Violin Icons"
          >
            Noun Project
          </Link>
          (
          <Link
            href="https://creativecommons.org/licenses/by/3.0/"
            target="_blank"
          >
            CC BY 3.0
          </Link>
          )
        </p>
        <p>
          Icons from{" "}
          <Link href="https://icons8.com/" target="_blank" title="Icons8">
            Icons8
          </Link>
        </p>
      </div>
    </>
  );
}
