import {
  SocialIconRow,
  EventsList,
  FooterSection,
  Section,
} from "../../components";
import {
  ScrollDownButton,
} from '../../components/scroll-down-button';
import { SUBTITLE, TITLE_FULL } from "../metadata";
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
