import React from "react";
import styles from "./Socials.module.css";

import facebook from "images/facebook.svg";
import instagram from "images/instagram.svg";
import linkedin from "images/linkedin.svg";
import twitter from "images/twitter.svg";

function Socials() {
  return (
    <div className={styles.socials}>
      <a href="https://linkedin.com">
        <img src={linkedin} alt="linkedin" />
      </a>
      <a href="https://facebook.com">
        <img src={facebook} alt="facebook" />
      </a>
      <a href="https://www.instagram.com/">
        <img src={instagram} alt="instagram" />
      </a>
      <a href="https://twitter.com">
        <img src={twitter} alt="twitter" />
      </a>
    </div>
  );
}

export default Socials;
