import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "../../components/UserLoginForm/UserLoginForm.module.css";
import { updateUser } from "../../store/userSlice";
import Spinner from "../../widgets/Spinner";
import Error from "../../widgets/Error";
import { blurHandlerUpdate, validateFormUpdate } from "../../utils/validate";

function FormUpdate({ selector }) {
  const [values, setValues] = useState({
    name: "",
    avatar: "",
  });

  const [nameErrors, setNameErrors] = useState(false);
  const [avatarErrors, setAvatarErrors] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    avatar: "",
  });

  const { currentUser, isLoading, isError, message } = selector;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const onblurHandler = (e) => {
    blurHandlerUpdate(e, setNameErrors, setAvatarErrors, values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateFormUpdate(values, setFormErrors);
    if (!isValid) return;

    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;

    dispatch(updateUser(values));

    setFormErrors({ name: "", avatar: "" });
  };

  if (isLoading) return <Spinner />;

  if (isError) {
    return <Error message={message} />;
  }
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
          type="avatar"
          placeholder="Your avatar link:"
          name="avatar"
          value={values.avatar}
          autoComplete="off"
          onChange={handleChange}
          onBlur={onblurHandler}
          className={avatarErrors ? styles["error"] : styles["inp"]}
        />
        {formErrors.avatar && (
          <div className={styles.errorMessage}>{formErrors.avatar}</div>
        )}
      </div>
      <button type="submit" className={styles.btnToggle}>
        Update
      </button>
    </form>
  );
}
FormUpdate.propTypes = {
  selector: PropTypes.shape({
    currentUser: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
};
export default FormUpdate;
