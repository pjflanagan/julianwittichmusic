import React, { useEffect, useState } from "react";
import { Icon } from "../";
import Style from "./style.module.scss";
import animateScrollTo from "animated-scroll-to";

const HIDE_BUTTON_SCROLL_DISTANCE = 180;

type ScrollDownButtonProps = {
  sourceId?: string;
  targetId: string;
  // color: TODO: 'light' | 'dark'
};

export function ScrollDownButton({
  sourceId,
  targetId,
  // color = 'light'
}: ScrollDownButtonProps) {
  const [scrollDistance, setScrollDistance] = useState(0);

  function getSourceElement() {
    return sourceId ? document.getElementById(sourceId) : window;
  }

  useEffect(() => {
    function handleScroll() {
      const scrollDistance = sourceId
        ? document.getElementById(sourceId)?.scrollTop
        : window.scrollY;
      setScrollDistance(scrollDistance || 0);
    }

    const sourceElement = getSourceElement();
    sourceElement?.addEventListener("scroll", handleScroll);
    return () => {
      sourceElement?.removeEventListener("scroll", handleClick);
    };
  });

  function handleClick() {
    const sourceElement = getSourceElement();
    const targetElement = document.getElementById(targetId);
    if (sourceElement && targetElement) {
      animateScrollTo(targetElement.offsetTop, {
        elementToScroll: sourceElement,
        minDuration: 400
      });
    }
  }

  const opacity = Math.max(1 - scrollDistance / HIDE_BUTTON_SCROLL_DISTANCE, 0);
  return (
    <div
      className={Style["scroll-down-button"]}
      onClick={handleClick}
      style={{ opacity }}
    >
      <Icon name="south" />
    </div>
  );
}
