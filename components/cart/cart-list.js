import CartItem from "./cart-item";

import styles from "./cart-list.module.css";

export default function CartList({ list }) {
  return (
    <div className={styles.wrapper}>
      {list.map((item, i) => (
        <CartItem key={i} item={item} />
      ))}
    </div>
  );
}
