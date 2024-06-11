import React, { useEffect, useRef } from "react";
import { SocialIconRow } from "../social-icon-row";
import Style from './style.module.scss';

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
    <div className={Style['slideshow']} ref={slideshowRef}>
      <div className={Style['header']}>
        <div className={Style['logo-header']}>
          <img src="/img/logo/logo.png" width="28" height="38" />
        </div>
        <div className={Style['title-holder']}>Julian B. Wittich</div>
        <SocialIconRow />
      </div>
    </div>
  );
}
