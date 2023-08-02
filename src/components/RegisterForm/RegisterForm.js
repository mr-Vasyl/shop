import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "../../components/UserLoginForm/UserLoginForm.module.css";
import Spinner from "../../widgets/Spinner";
import Error from "../../widgets/Error";

import { createUser, toggleForm } from "../../store/userSlice";
import {
  blurHandlerRegister,
  validateFormRegister,
} from "../../utils/validate";

const RegisterForm = ({ selector }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [nameErrors, setNameErrors] = useState(false);
  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [avatarErrors, setAvatarErrors] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const dispatch = useDispatch();
  const { currentUser, isError, isLoading, message } = selector;

  useEffect(() => {
    if (currentUser && currentUser.email) {
      dispatch(toggleForm(true));
    }
  }, [dispatch, currentUser]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onblurHandler = (e) => {
    blurHandlerRegister(
      e,
      setNameErrors,
      setEmailErrors,
      setPasswordErrors,
      setAvatarErrors,
      values
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateFormRegister(values, setFormErrors);
    if (!isValid) return;

    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;

    dispatch(createUser(values));

    setValues({ name: "", email: "", password: "", avatar: "" });
    setFormErrors({ name: "", email: "", password: "", avatar: "" });
  };

  if (isLoading) return <Spinner />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <input
          type="name"
          placeholder="Your name:"
          name="name"
          value={values.name}
          autoComplete="on"
          onBlur={onblurHandler}
          onChange={handleChange}
          className={nameErrors ? styles["error"] : styles["inp"]}
        />
        {formErrors.name && (
          <div className={styles.errorMessage}>{formErrors.name}</div>
        )}
      </div>
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
      <div>
        <input
          type="avatar"
          placeholder="Your avatar:"
          name="avatar"
          value={values.avatar}
          autoComplete="on"
          onChange={handleChange}
          onBlur={onblurHandler}
          className={avatarErrors ? styles["error"] : styles["inp"]}
        />
        {formErrors.avatar && (
          <div className={styles.errorMessage}>{formErrors.avatar}</div>
        )}
      </div>
      <button type="submit" className={styles.btnToggle}>
        Register
      </button>
      {isError && <Error message={message} />}
    </form>
  );
};

RegisterForm.propTypes = {
  selector: PropTypes.object.isRequired,
};

export default RegisterForm;
