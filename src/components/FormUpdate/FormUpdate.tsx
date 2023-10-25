import { Fragment } from "react";

import { updateUser } from "store/slice/userSlice";
import Spinner from "widgets/Spinner/Spinner";
import Error from "widgets/Error/Error";
import FormReact from "components/FormReact/FormReact";
import { fieldsUpdate } from "config/validate";

import { useAppDispatch } from "store/hooks";
import { User, UserSchema } from "store/types/user";

interface FormUpdateProps {
  selector: UserSchema;
}

function FormUpdate({ selector }: FormUpdateProps) {
  const { currentUser, isLoading, error } = selector;

  const dispatch = useAppDispatch();

  const onSubmit = (reset: () => void) => (data?: User) => {
    if (data) {
      const isNotEmpty = Object.values(data).every((val) => val);
      if (!isNotEmpty) return;

      const body: User = { ...data, id: currentUser?.id };

      dispatch(updateUser(body));
    }
    reset();
  };

  if (isLoading) return <Spinner />;

  return (
    <Fragment>
      <FormReact onSubmit={onSubmit} fields={fieldsUpdate} btn="update" />

      {error && <Error error={error} />}
    </Fragment>
  );
}

export default FormUpdate;
