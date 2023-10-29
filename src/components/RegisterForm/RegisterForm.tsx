import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

import Spinner from "widgets/Spinner/Spinner";
import Error from "widgets/Error/Error";

import { createUser, toggleForm } from "store/slice/userSlice";

import FormReact from "components/FormReact/FormReact";
import { fieldsRegister } from "config/validate";

import { useAppDispatch } from "store/hooks";
import { User, UserSchema } from "types/user";

interface RegisterFormProps {
  selector: UserSchema;
}

const RegisterForm = ({ selector }: RegisterFormProps) => {
  const dispatch = useAppDispatch();
  const { currentUser, error, isLoading } = selector;

  useEffect(() => {
    if (currentUser && currentUser.email) {
      dispatch(toggleForm(true));
    }
  }, [dispatch, currentUser]);

  const onSubmit = (reset: () => void) => (data?: User) => {
    if (data) {
      const isNotEmpty = Object.values(data).every((val) => val);
      if (!isNotEmpty) return;

      dispatch(createUser(data));
    }
    reset();
  };

  if (isLoading) return <Spinner />;

  return (
    <Fragment>
      <FormReact onSubmit={onSubmit} fields={fieldsRegister} btn="register" />
      {error && <Error error={error} />}
    </Fragment>
  );
};

RegisterForm.propTypes = {
  selector: PropTypes.object.isRequired,
};

export default RegisterForm;
