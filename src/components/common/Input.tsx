import type { InputLabel } from "../../types/input";
import classes from "./Input.module.css";

export const Input: React.FC<InputLabel.Props> = ({
  label,
  name,
  type = "text",
  labelClassName = "",
  className = "",
  textarea = false,
  select = false,
  checkbox = false,
  options,
  checkboxOptions,
  ...props
}) => {
  return (
    <>
      {!checkbox && (
        <label htmlFor={name} className={`${classes.label} ${labelClassName}`}>
          {label}
        </label>
      )}
      {checkbox ? (
        <>
          <legend className={`${classes.label} ${labelClassName}`}>Peso</legend>
          {checkboxOptions!.map((option) => (
            <div key={option.value}>
              <label>
                <input
                  type="checkbox"
                  id={name}
                  name={name}
                  value={option.label}
                  {...props}
                />
                {option.label}
              </label>
            </div>
          ))}
        </>
      ) : textarea ? (
        <textarea
          id={name}
          name={name}
          className={`${classes.textarea} ${className}`}
          {...props}
        />
      ) : select ? (
        <select
          name={name}
          id={name}
          className={`${classes.select} ${className}`}
        >
          {options!.map((option) => (
            <option key={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={`${classes.input} ${className}`}
          {...props}
        />
      )}
    </>
  );
};
