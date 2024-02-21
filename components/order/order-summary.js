import { useSelector } from "react-redux";

import { MISC } from "@/data/products";

import currencyFormatter from "@/lib/currency-formatter";

import styles from "./order-summary.module.css";

export default function OrderSummary() {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { delivery } = useSelector((state) => state.checkoutForm);

  const totalNum = items.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const tax = totalAmount * MISC.tax;
  const finalAmount =
    totalAmount +
    tax +
    (delivery.method === "express" ? MISC.expressDelivery : 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles["summary-row"]}>
        <div>{totalNum} items</div>
        <div>{currencyFormatter(totalAmount)}</div>
      </div>
      <div className={styles["summary-row"]}>
        <div>Sales Tax</div>
        <div>{currencyFormatter(tax)}</div>
      </div>
      <div className={styles["summary-row"]}>
        <div>Delivery</div>
        <div>
          {delivery.method === "express"
            ? currencyFormatter(MISC.expressDelivery)
            : "FREE"}
        </div>
      </div>
      <div className={styles["summary-row"]}>
        <div>Total</div>
        <div>{currencyFormatter(finalAmount)}</div>
      </div>
    </div>
  );
}
