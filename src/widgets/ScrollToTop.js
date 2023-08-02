import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import styles from "./ScrollToTop.module.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={styles.scrollTop}
      style={{ display: isVisible ? "block" : "none" }}
      onClick={goTop}
    >
      <FaArrowCircleUp />
    </button>
  );
};

export default ScrollToTop;
