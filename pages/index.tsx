import React from "react";
import { Canvas } from "../components/canvas";
import { Sidebar } from "../components/sidebar";
import { Slideshow } from "../components/slideshow";
import { fetchBloggerPost } from "./api/content";
import { TITLE_FULL } from "../content/metadata";
import { Main } from "../content";

export type HomePageProps = {
  aboutSection: string;
}

export async function getServerSideProps() {
  const aboutSection = await fetchBloggerPost('about');

  return {
    props: {
      aboutSection
    }
  }
}

export default function Home(props: HomePageProps) {
  return (
    <div>
      <main>
        <Canvas />
        <Slideshow title={TITLE_FULL} />
        <Sidebar>
          <Main {...props} />
        </Sidebar>
      </main>
    </div>
  );
}
