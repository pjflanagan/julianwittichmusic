import React from "react";
import { Canvas } from "../components/canvas";
import { Sidebar } from "../components/sidebar";
import { Slideshow } from "../components/slideshow";
import { Main } from "../content";
import { PostNameMap, fetchBlogPost } from "./api/content";
import { Event, filterAndOrderDates } from "../model";
import { fetchEventsApi } from "./api/events";

export type HomePageProps = {
  eventsList: Event[];
  content: PostNameMap;
}

export async function getServerSideProps() {
  async function fetchEvents(): Promise<Event[]> {
    const events = await fetchEventsApi();
    return filterAndOrderDates(events);
  }

  async function fetchAboutSectionContent(): Promise<PostNameMap> {
    const [about, contact] = await Promise.all([fetchBlogPost('about'), fetchBlogPost('contact')]);
    return { about, contact };
  }

  const [eventsList, content] = await Promise.all([fetchEvents(), fetchAboutSectionContent()]);

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
        <Slideshow />
        <Sidebar>
          <Main {...props} />
        </Sidebar>
      </main>
    </div>
  );
}
