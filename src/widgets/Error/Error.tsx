import styles from "./Error.module.css";

type ErrorProps = {
  error: string;
  content?: string;
};

function Error({ error, content }: ErrorProps) {
  return (
    <div className={styles.error}>
      <div className={styles.message} style={{ color: "red" }}>
        {error}! <p>{content}</p>
      </div>
    </div>
  );
}
export default Error;
