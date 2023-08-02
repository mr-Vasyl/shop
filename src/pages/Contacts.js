import styles from "./Contacts.module.css";

const Contacts = () => {
  return (
    <div>
      <h1 className={styles.title}>Contact sales now</h1>
      <div className={styles.contact}>
        <div className={styles.country}>United Kingdom & Europe</div>
        <a href="tel:0808-1893323" className={styles.number}>
          +60808-1893323
        </a>
        <div className={styles.time}>Mon to Fri from 9am to 5pm CST</div>
      </div>
    </div>
  );
};

export default Contacts;
