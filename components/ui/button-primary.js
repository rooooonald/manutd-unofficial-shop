import styles from "./button-primary.module.css";

export default function ButtonPrimary({
  children,
  type,
  disabled,
  onClick,
  className,
}) {
  return (
    <button
      type={type}
      className={`${styles.wrapper} ${className} moving-gradient`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
