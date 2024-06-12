import React from "react";
import Link from "next/link";
import { Section } from "./Section";
import Style from "./style.module.scss";

export function FooterSection() {
  return (
    <Section id={Style["footer"]}>
      <p>
        Website by{" "}
        <Link
          href="https://pjflanagan.me"
          target="_blank"
          title="Peter Flanagan"
        >
          Peter Flanagan
        </Link>
      </p>
      <p>
        F Cut Violin by Cristian Scarlat from{" "}
        <Link
          href="https://thenounproject.com/browse/icons/term/f-cut-violin/"
          target="_blank"
          title="F Cut Violin Icons"
        >
          Noun Project
        </Link>{" "}
        <span style={{ textWrap: "nowrap" }}>
          (
          <Link
            href="https://creativecommons.org/licenses/by/3.0/"
            target="_blank"
          >
            CC BY 3.0
          </Link>
          )
        </span>
      </p>
      <p>
        Icons from{" "}
        <Link href="https://icons8.com/" target="_blank" title="Icons8">
          Icons8
        </Link>
      </p>
    </Section>
  );
}
