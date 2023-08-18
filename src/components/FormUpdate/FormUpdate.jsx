import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Fragment } from "react";

import { updateUser } from "store/slice/userSlice";
import Spinner from "widgets/Spinner/Spinner";
import Error from "widgets/Error/Error";
import FormReact from "components/FormReact/FormReact";
import { fieldsUpdate } from "config/validate";

function FormUpdate({ selector }) {
  const { currentUser, isLoading, error } = selector;

  const dispatch = useDispatch();

  const onSubmit = (reset) => (data) => {
    const isNotEmpty = Object.values(data).every((val) => val);
    if (!isNotEmpty) return;

    const body = { ...data, id: currentUser.id };

    dispatch(updateUser(body));
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
