import type { InputLabel } from "../../types/input";

export const Input: React.FC<InputLabel.Props> = ({
  label,
  name,
  type = "text",
  labelClassName = "",
  className = "",
  textarea = false,
  select = false,
  options,
  ...props
}) => {
  return (
    <>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      {textarea ? (
        <textarea id={name} name={name} className={className} {...props} />
      ) : select ? (
        <select name={name} id={name}>
          {options!.map((option) => (
            <option key={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={className}
          {...props}
        />
      )}
    </>
  );
};
