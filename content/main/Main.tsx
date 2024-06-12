import { useEffect, useState } from "react";
import Link from "next/link";

import {
  SocialIconRow,
  EventsList,
  FooterSection,
  Section,
  ScrollDownButton,
} from "../../components";
import { SUBTITLE, TITLE_FULL } from "../metadata";
import { Event, filterAndOrderDates } from "../../model";

import Style from "./style.module.scss";

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
      <Section className={Style["intro"]} id="intro">
        <div className={Style["intro-content"]}>
          <div className={Style["logo-holder"]}>
            <img src="/img/logo/logo.png" width="84" />
          </div>
          <h1>{TITLE_FULL}</h1>
          <h4>{SUBTITLE}</h4>
          <SocialIconRow />
        </div>
        <div className={Style["scroll-down-button-holder"]}>
          <ScrollDownButton color="dark" sourceId="sidebar" targetId="events" />
        </div>
      </Section>
      <hr className={Style["intro-divider"]} />
      <Section className={Style["events"]} id="events">
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
      </Section>
      <Section className={Style["bio"]} id="about">
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
      </Section>
      <Section className={Style["contact"]} id="contact">
        <h2>Contact</h2>
        <p>
          For inquiries, feel free to send Julian an{" "}
          <Link href="mailto:julianw017@gmail.com">email</Link>.
        </p>
      </Section>
      <hr />
      <FooterSection />
    </>
  );
}
