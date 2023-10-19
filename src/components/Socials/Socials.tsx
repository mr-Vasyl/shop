import React from "react";
import styles from "./Socials.module.css";

import facebook from "images/facebook.svg";
import instagram from "images/instagram.svg";
import linkedin from "images/linkedin.svg";
import twitter from "images/twitter.svg";

const socials = [
  { link: "https://linkedin.com", src: linkedin, alt: "linkedin" },
  { link: "https://facebook.com", src: facebook, alt: "facebook" },
  { link: "https://www.instagram.com", src: instagram, alt: "instagram" },
  { link: "https://twitter.com", src: twitter, alt: "twitter" },
];

function Socials() {
  return (
    <div className={styles.socials}>
      {socials.map((el, indx) => (
        <a href={el.link} target="_blank" rel="noreferrer" key={indx}>
          <img src={el.src} alt={el.alt} />
        </a>
      ))}
    </div>
  );
}

export default Socials;
