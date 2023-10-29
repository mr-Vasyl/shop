import { Fragment, useEffect } from "react";

import Spinner from "widgets/Spinner/Spinner";
import Error from "widgets/Error/Error";

import { loginUsers, toggleForm } from "store/slice/userSlice";
import FormReact from "components/FormReact/FormReact";
import { fieldsLogin } from "config/validate";

import { useAppDispatch } from "store/hooks";
import { User, UserSchema } from "types/user";

interface UserLoginFormProps {
  selector: UserSchema;
}

const UserLoginForm = ({ selector }: UserLoginFormProps) => {
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

      dispatch(loginUsers(data));
    }
    reset();
  };

  if (isLoading) return <Spinner />;

  return (
    <Fragment>
      <FormReact onSubmit={onSubmit} fields={fieldsLogin} btn="log in" />
      {error && <Error error={error} content={"Incorrect login or password"} />}
    </Fragment>
  );
};

export default UserLoginForm;
