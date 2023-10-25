import { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import styles from "./ScrollToTop.module.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const goTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button className={styles.scrollTop} onClick={goTop}>
      <FaArrowCircleUp />
    </button>
  );
};

export default ScrollToTop;
