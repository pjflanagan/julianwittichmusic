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

import Style from "./style.module.scss";

export function Main({ eventsList = [], content }: HomePageProps) {
  return (
    <>
      <Section className={Style["intro"]} id="intro">
        <div className={Style["intro-content"]}>
          <div className={Style["logo-holder"]}>
            <img src="/img/logo/logo.png" width="84" />
          </div>
          <h1>{content.name}</h1>
          <h4>{content.description}</h4>
          <SocialIconRow />
        </div>
        <div className={Style["scroll-down-button-holder"]}>
          <ScrollDownButton color="dark" sourceId="sidebar" targetId="events" />
        </div>
      </Section>
      <hr className={Style["intro-divider"]} />
      <Section className={Style["events"]} id="events">
        <h2>Events</h2>
        {eventsList.length === 0 && (
          <div dangerouslySetInnerHTML={{ __html: content.events || '' }} />
        )}
        <EventsList eventsList={eventsList} />
      </Section>
      <Section className={Style["about"]} id="about">
        <h2>About</h2>
        <div dangerouslySetInnerHTML={{ __html: content?.about || '' }} />
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
