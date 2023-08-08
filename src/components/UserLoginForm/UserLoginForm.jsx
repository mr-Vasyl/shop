import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./UserLoginForm.module.css";

import Spinner from "widgets/Spinner/Spinner";
import Error from "widgets/Error/Error";

import { loginUsers, toggleForm } from "store/userSlice/userSlice";
import { blurHandlerLogin, validateFormLogin } from "utils/validate";

const UserLoginForm = ({ selector }) => {
  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { currentUser, isError, isLoading } = selector;
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (currentUser && currentUser.email) {
      dispatch(toggleForm(true));
    }
  }, [dispatch, currentUser]);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const onblurHandler = (e) => {
    blurHandlerLogin(e, setEmailErrors, setPasswordErrors, values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateFormLogin(values, setFormErrors);
    if (!isValid) return;

    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;

    dispatch(loginUsers(values));

    setValues({ email: "", password: "" });
    setFormErrors({ email: "", password: "" });
  };

  if (isLoading) return <Spinner />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          placeholder="Your email:"
          name="email"
          value={values.email}
          autoComplete="on"
          onChange={handleChange}
          onBlur={onblurHandler}
          className={emailErrors ? styles["error"] : styles["inp"]}
        />
        {formErrors.email && (
          <div className={styles.errorMessage}>{formErrors.email}</div>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Your password:"
          name="password"
          value={values.password}
          autoComplete="on"
          onChange={handleChange}
          onBlur={onblurHandler}
          className={passwordErrors ? styles["error"] : styles["inp"]}
        />
        {formErrors.password && (
          <div className={styles.errorMessage}>{formErrors.password}</div>
        )}
      </div>
      <button type="submit" className={styles.btnToggle}>
        Log In
      </button>
      {isError && (
        <Error isError={isError} content={"Incorrect login or password"} />
      )}
    </form>
  );
};

export default UserLoginForm;
