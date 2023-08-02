import { NavLink } from "react-router-dom";
import { routes } from "../../utils/routes";

import styles from "./Footer.module.css";
import Socials from "../Socials/Socials";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <hr />
        <div className={styles.contacts}>
          <div className={styles.contactsNav}>
            <NavLink
              to={routes.contacts}
              className={(navData) => (navData.isActive ? styles.navLink : "")}
            >
              CONTACT
            </NavLink>
            <NavLink
              to={routes.services}
              className={(navData) => (navData.isActive ? styles.navLink : "")}
            >
              TERMS OF SERVICES
            </NavLink>
          </div>
          <div className={styles.copyright}>
            © 2023 Shelly. Terms of use and privacy policy.
          </div>
          <Socials />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
