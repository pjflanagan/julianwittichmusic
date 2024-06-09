import React, { useEffect, useRef } from "react";
import Link from "next/link";

const PARALLAX_RATE = 1/4;


export function Slideshow() {
  const slideshowRef = useRef<HTMLDivElement>(null);

  function getScrollTop() {
    return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
  }

  function scroll() {
    if (!slideshowRef.current) {
      return;
    }
    slideshowRef.current.style.top = `${-getScrollTop() * PARALLAX_RATE}px`;
  }

  useEffect(() => {
    window.addEventListener('scroll', scroll);

  })

  return (
    <div className="slideshow" id="slideshow" ref={slideshowRef}>
      <div className="header">
        <div className="logo-holder">
          <img src="/img/logo/logo.png" width="28" height="38" />
        </div>
        <div className="title-holder">Julian B. Wittich</div>

        <div className="social-icon-row">
          <Link
            target="_blank"
            href="https://open.spotify.com/artist/64mWZmWHfA6SoxqoibbwbR?si=WggJ-PvlTq-3A-EVLXcg8Q"
          >
            <img
              className="social-icon"
              width="24"
              src="/img/icon/icons8-spotify-48.png"
            />
          </Link>
          <Link
            target="_blank"
            href="https://www.youtube.com/@julianwittich5893"
          >
            <img
              className="social-icon"
              width="24"
              src="/img/icon/icons8-youtube-48.png"
            />
          </Link>
          <Link
            target="_blank"
            href="https://www.instagram.com/julianwittich?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          >
            <img
              className="social-icon"
              width="24"
              src="/img/icon/icons8-instagram-48.png"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
