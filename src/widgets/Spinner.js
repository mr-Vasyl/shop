import React from "react";
import styles from "./Spinner.module.css";
import { SpinnerCircularFixed } from "spinners-react";

function Spinner({ size }) {
  return (
    <div className={styles.spinner}>
      <SpinnerCircularFixed
        size={size}
        thickness={96}
        speed={97}
        color="rgba(161, 138, 104, 1)"
        secondaryColor="rgba(216, 216, 216, 0.15)"
      />
    </div>
  );
}

export default Spinner;
