import { useState } from "react";
import styles from "./User.module.css";

import RegisterForm from "components/RegisterForm/RegisterForm";
import UserLoginForm from "components/UserLoginForm/UserLoginForm";
import FormUpdate from "components/FormUpdate/FormUpdate";

import { getLogOut, usersSelector } from "store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const User = () => {
  const [state, setState] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const selector = useAppSelector(usersSelector);
  const getOut = () => dispatch(getLogOut());
  const onToggle = (): void => {
    setState(true);
  };
  const offToggle = (): void => {
    setState(false);
    getOut();
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
