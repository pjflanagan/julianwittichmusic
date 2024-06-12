import { useEffect, useState } from "react";
import Link from "next/link";

import {
  SocialIconRow,
  EventsList,
  FooterSection,
  Section,
} from "../../components";
import {
  ScrollDownButton,
} from '../../components/scroll-down-button';
import { PostNameMap } from "../../pages/api/content";
import { SUBTITLE, TITLE_FULL } from "../metadata";
import { Event, filterAndOrderDates } from "../../model";

import Style from "./style.module.scss";

export function Main() {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [content, setContent] = useState<PostNameMap>();

  async function fetchEvents() {
    const response = await fetch("/api/events");
    const fullEventsList: Event[] = await response.json();
    const futureEventsList = filterAndOrderDates(fullEventsList);
    setEventsList(futureEventsList);
  }

  async function fetchAboutSectionContent() {
    const response = await fetch("/api/content");
    const newContent: PostNameMap = await response.json();
    setContent(newContent);
  }

  useEffect(() => {
    Promise.all([fetchEvents(), fetchAboutSectionContent()]);
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
      {eventsList.length > 0 && (
        <Section className={Style["events"]} id="events">
          <h2>Events</h2>
          <EventsList eventsList={eventsList} />
        </Section>
      )}
      <Section className={Style["about"]} id="about">
        <h2>About</h2>
        <div dangerouslySetInnerHTML={{ __html: content?.about || '' }} />
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
        <div dangerouslySetInnerHTML={{ __html: content?.contact || '' }} />
      </Section>
      <hr />
      <FooterSection />
    </>
  );
}
