import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./User.module.css";

import RegisterForm from "components/RegisterForm/RegisterForm";
import UserLoginForm from "components/UserLoginForm/UserLoginForm";
import FormUpdate from "components/FormUpdate/FormUpdate";
import { usersSelector } from "store/userSlice/userSlice";

const User = () => {
  const [state, setState] = useState(false);

  const selector = useSelector(usersSelector);

  const onToggle = () => {
    setState(true);
  };
  const offToggle = () => {
    setState(false);
  };

  return (
    <div className={styles.user}>
      <div className={styles.account}>My account</div>

      {selector.showForm ? (
        <div>
          <div className={styles.wrapper}>
            Welcome to <span className={styles.shopcart}>Shopcart</span>, now
            you can make purchases
          </div>
          <FormUpdate selector={selector} />
        </div>
      ) : (
        <>
          <div className={styles.toggles}>
            <button
              className={`${!state ? styles.active : ""}`}
              onClick={offToggle}
            >
              Register
            </button>
            <button
              className={`${state ? styles.active : ""}`}
              onClick={onToggle}
            >
              Log In
            </button>
          </div>

          {state ? (
            <UserLoginForm selector={selector} />
          ) : (
            <RegisterForm selector={selector} />
          )}
        </>
      )}
    </div>
  );
};
export default User;
