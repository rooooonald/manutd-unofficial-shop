import styles from "./checkout-header.module.css";

export default function CheckoutHeader({ disabled, title, onClick }) {
  return (
    <button
      className={styles.wrapper}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <div className="moving-gradient"></div>
      <h2 className="moving-gradient">{title}</h2>
      <div className="moving-gradient"></div>
    </button>
  );
}
