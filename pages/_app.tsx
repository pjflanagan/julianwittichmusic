import React from "react";
import "../styles/index.scss";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        {/* <!-- NOTE: this has to match $background --> */}
        <meta name="theme-color" content="#282828" />

        <link rel="icon" href="favicon.ico" sizes="16x16" type="image/x-icon" />
        <link rel="icon" href="favicon.png" sizes="32x32" type="image/png" />
        <title>Julian Wittich | Jazz Bassist</title>

        <meta property="og:title" content="Julian Wittich" />
        <meta property="og:description" content="NYC Based Jazz Bassist" />
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

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* <!-- <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      rel="stylesheet"
    /> --> */}
        {/* <!-- <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400&family=Limelight&display=swap"
      rel="stylesheet"
    /> --> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />

        {/* <!-- TODO: add a bunch of keywords --> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
