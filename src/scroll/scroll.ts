
const PARALLAX_RATE = 1/4;

function getScrollTop() {
  return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
}

function scroll() {
  const slideshow = document.getElementById('slideshow');
  if (!slideshow) {
    return;
  }
  slideshow.style.top = `${-getScrollTop() * PARALLAX_RATE}px`;
}

export function setupScroll() {
  window.addEventListener('scroll', scroll);
}
