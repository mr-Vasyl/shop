import { Fragment } from "react";
import styles from "./Services.module.css";

const Services = () => {
  return (
    <Fragment>
      <h1 className={styles.title}>Terms of Service</h1>
      <div className={styles.content}>
        This site is managed by the European Commission, Directorate-General for
        Communication. Please refer to the privacy policy for websites managed
        by the European Commission.
      </div>
    </Fragment>
  );
};
export default Services;
