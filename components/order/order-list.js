import OrderItem from "./order-item";
import styles from "./order-list.module.css";

export default function OrderList({ list }) {
  return (
    <div className={styles.wrapper}>
      {list.map((item) => (
        <OrderItem key={item.pid} item={item} />
      ))}
    </div>
  );
}
