import { useForm } from "react-hook-form";
import styles from "./FormReact.module.css";

const FormReact = ({ onSubmit, fields, btn, selectField }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit(reset))}>
      {fields.map((field, indx) => (
        <div key={indx}>
          {field.select ? (
            selectField
          ) : (
            <input
              className={styles.inp}
              type={field.type}
              placeholder={field.placeholder}
              min={field.min}
              {...register(field.name, {
                required: field.required,
                minLength: {
                  value: field.minLength,
                  message: `minimum ${field.minLength} symbols`,
                },
                pattern: field.pattern,
              })}
            />
          )}
          {errors?.[field.name] && (
            <div className={styles.errorMessage}>
              {errors[field.name].message}
            </div>
          )}
        </div>
      ))}

      <button type="submit" className={styles.btnToggle}>
        {btn}
      </button>
    </form>
  );
};

export default FormReact;
