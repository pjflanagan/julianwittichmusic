import Link from "next/link";

import Style from "./style.module.scss";

const ALBUM_URL = "https://umg.lnk.to/JW_Tidelines";
const ARTWORK_URL =
  "https://linkstorage.linkfire.com/medialinks/images/6365eb03-115e-4359-aedd-10b883e52719/artwork-440x440.jpg";

export function AlbumCallout() {
  return (
    <Link
      className={Style["album-callout"]}
      target="_blank"
      title="Tidelines"
      href={ALBUM_URL}
    >
      <img
        className={Style["artwork"]}
        alt="Tidelines album artwork"
        src={ARTWORK_URL}
      />
      <div className={Style["text"]}>
        <span className={Style["eyebrow"]}>New Album</span>
        <span className={Style["title"]}>Tidelines</span>
      </div>
    </Link>
  );
}
