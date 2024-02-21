import styles from "./size-selector.module.css";

export default function SizeSelector({
  sizes,
  selectedSize,
  isError,
  onSelectSize,
}) {
  let availableSizes = Object.keys(sizes);

  return (
    <div className={styles.wrapper}>
      {availableSizes.map((size) => (
        <button
          key={size}
          value={size}
          type="button"
          className={`${selectedSize === size ? styles.active : null} ${
            isError ? styles.error : null
          }`}
          onClick={() => onSelectSize(size)}
          disabled={sizes[size] < 1}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
