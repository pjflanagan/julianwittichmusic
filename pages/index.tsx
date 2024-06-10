import React from "react";
import { Canvas } from "../components/canvas";
import { Sidebar } from "../components/sidebar";
import { Slideshow } from "../components/slideshow";
import { Main } from "../content";

export default function Home() {
  return (
    <div>
      <main>
        <Canvas />
        <Slideshow />
        <Sidebar>
          <Main />
        </Sidebar>
        {/* <!-- TODO: Google Analytics --> */}
      </main>
    </div>
  );
}
