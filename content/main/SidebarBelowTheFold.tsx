import { Suspense } from "react";
import {
  SocialIconRow,
  EventsList,
  FooterSection,
  Section,
} from "../../components";
import {
  ScrollDownButton,
} from '../../components/scroll-down-button';
import { HomePageProps } from '../../pages/index';
import { SUBTITLE, TITLE_FULL } from "../metadata";
import { useLoadContactSection } from "./useLoadContactSection";
import { useLoadEventsSection } from "./useLoadEventsSection";

import Style from "./style.module.scss";

export default function SidebarBelowTheFold({ aboutSection }: HomePageProps) {

  // CONSIDER: loading animation
  const { eventsList, eventsDefaultSection } = useLoadEventsSection();
  const { contactSection } = useLoadContactSection();

  return (
    <>
      <Section className={Style["intro"]} id="intro">
        <div className={Style["intro-content"]}>
          <div className={Style["logo-holder"]}>
            <img src="/img/logo/logo.png" width="84" alt={`${TITLE_FULL} Logo`} />
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
      <Suspense fallback={<div>Loading...</div>}>
        <Section className={Style["events"]} id="events">
          <h2>Events</h2>
          {eventsList.length === 0 && eventsDefaultSection && (
            <div dangerouslySetInnerHTML={{ __html: eventsDefaultSection || '' }} />
          )}
          <EventsList eventsList={eventsList} />
        </Section>
        <Section className={Style["about"]} id="about">
          <h2>About</h2>
          <div dangerouslySetInnerHTML={{ __html: aboutSection || '' }} />
        </Section>
        <Section className={Style["contact"]} id="contact">
          <h2>Contact</h2>
          <div dangerouslySetInnerHTML={{ __html: contactSection || '' }} />
        </Section>
      </Suspense>
      <hr />
      <FooterSection />
    </>
  );
}
