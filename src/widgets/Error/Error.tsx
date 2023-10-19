import styles from "./Error.module.css";

function Error({ error, content }) {
  return (
    <div className={styles.error}>
      <div className={styles.message} styles={{ color: "red" }}>
        {error}! <p>{content}</p>
      </div>
    </div>
  );
}
export default Error;
