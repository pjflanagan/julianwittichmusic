import React from "react";
import { Canvas } from "../components/canvas";
import { Sidebar } from "../components/sidebar";
import { Slideshow } from "../components/slideshow";
import { Main } from "../content";
import { SiteContent, fetchSiteContent } from "./api/content";
import { Event, filterAndOrderDates } from "../model";
import { fetchEventsApi } from "./api/events";

export type HomePageProps = {
  eventsList: Event[];
  content: SiteContent;
}

export async function getServerSideProps() {
  async function fetchEvents(): Promise<Event[]> {
    const events = await fetchEventsApi();
    return filterAndOrderDates(events);
  }

  const [eventsList, content] = await Promise.all([fetchEvents(), fetchSiteContent()]);

  return {
    props: {
      eventsList,
      content
    }
  }
}

export default function Home(props: HomePageProps) {
  return (
    <div>
      <main>
        <Canvas />
        <Slideshow title={props.content.name} />
        <Sidebar>
          <Main {...props} />
        </Sidebar>
      </main>
    </div>
  );
}
