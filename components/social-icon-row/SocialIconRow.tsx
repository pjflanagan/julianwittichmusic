import Link from "next/link";

import Style from './style.module.scss';

console.log(Style);

export function SocialIconRow() {
  return (
    <div className={Style['social-icon-row']}>
      <Link
        target="_blank"
        href="https://open.spotify.com/artist/64mWZmWHfA6SoxqoibbwbR?si=WggJ-PvlTq-3A-EVLXcg8Q"
      >
        <img
          width="24"
          src="/img/icon/icons8-spotify-48.png"
        />
      </Link>
      <Link target="_blank" href="https://www.youtube.com/@julianwittich5893">
        <img
          width="24"
          src="/img/icon/icons8-youtube-48.png"
        />
      </Link>
      <Link
        target="_blank"
        href="https://www.instagram.com/julianwittich?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
      >
        <img
          width="24"
          src="/img/icon/icons8-instagram-48.png"
        />
      </Link>
    </div>
  );
}
