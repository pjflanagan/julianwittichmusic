import React from "react";
import Head from "next/head";
import { SEO_DESCRIPTION, SEO_KEYWORDS, SUBTITLE, SUBTITLE_SHORT, TITLE } from '../content/metadata';
import "../styles/index.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        
        {/* SEO */}
        <meta name="description" content={SEO_DESCRIPTION} />
        <meta name="keywords" content={SEO_KEYWORDS} />
        {/* NOTE: this has to match $background */}
        <meta name="theme-color" content="#282828" />

        <link rel="icon" href="favicon.ico" sizes="16x16" type="image/x-icon" />
        <link rel="icon" href="favicon.png" sizes="32x32" type="image/png" />
        <title>{TITLE} | {SUBTITLE_SHORT}</title>

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={SUBTITLE} />
        <meta
          property="og:image"
          content="http://julianwittich.com/img/photo/JW-slideshow-bw.jpg"
        />
        <meta property="og:url" content="https://julianwittich.com/" />

        <meta property="og:type" content="website" />
        <meta
          property="og:image:secure_url"
          content="https://julianwittich.com/img/photo/JW-slideshow-bw.jpg"
        />
      </Head>
      <Component {...pageProps} />
      {/* TODO: Google Analytics */}
    </>
  );
}
