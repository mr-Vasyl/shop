import { useForm, FieldValues } from "react-hook-form";
import styles from "./FormReact.module.css";
import { FormField } from "config/validate";

interface FormReactProps<T> {
  onSubmit: (reset: () => void) => (data: T) => void;
  fields: FormField<T>[];
  btn: string;
  selectField?: JSX.Element | undefined;
}

function FormReact<T extends FieldValues>({
  onSubmit,
  fields,
  btn,
  selectField,
}: FormReactProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({ mode: "onBlur" });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit(reset))}>
      {fields.map((field: FormField<T>, indx: number) => (
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
                  value: field.minLength || 0,
                  message: `minimum ${field.minLength} symbols`,
                },
                pattern: field.pattern,
              })}
            />
          )}
          {errors[field.name] && (
            <div className={styles.errorMessage}>
              {errors?.[field.name]?.message?.toString()}
            </div>
          )}
        </div>
      ))}

      <button type="submit" className={styles.btnToggle}>
        {btn}
      </button>
    </form>
  );
}

export default FormReact;
