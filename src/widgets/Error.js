import styles from "./Error.module.css";

function Error({ message, content }) {
  return (
    <div className={styles.error}>
      <div className={styles.message} styles={{ color: "red" }}>
        {message}! {content}
      </div>
    </div>
  );
}
export default Error;
