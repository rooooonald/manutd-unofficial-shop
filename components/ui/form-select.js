import styles from "./form-select.module.css";

export default function FormSelect({
  id,
  input,
  onChange,
  onFocus,
  onBlur,
  options,
  isFocused,
}) {
  return (
    <div className={styles.wrapper}>
      <label
        htmlFor={id}
        style={{ display: isFocused || input.value ? "block" : "none" }}
      >
        Province
      </label>
      <select
        id={id}
        {...input}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
