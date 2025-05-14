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
  defaultValue = undefined,
  required = false,
  value,
  onChange,
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
                  defaultValue={defaultValue}
                  required={required}
                  value={value}
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
          defaultValue={defaultValue}
          required={required}
          {...props}
        />
      ) : select ? (
        <select
          name={name}
          id={name}
          className={`${classes.select} ${className}`}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
        >
          {options!.map((option) => (
            <option key={option.value} value={option.label}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={`${classes.input} ${className}`}
          defaultValue={defaultValue}
          required={required}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
    </>
  );
};
