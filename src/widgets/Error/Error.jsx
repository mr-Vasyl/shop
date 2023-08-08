import styles from "./Error.module.css";

function Error({ isError, content }) {
  return (
    <div className={styles.error}>
      <div className={styles.message} styles={{ color: "red" }}>
        {isError}! {content}
      </div>
    </div>
  );
}
export default Error;
