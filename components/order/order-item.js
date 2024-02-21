import Image from "next/image";

import PRODUCTS from "@/data/products";

import currencyFormatter from "@/lib/currency-formatter";

import styles from "./order-item.module.css";

export default function OrderItem({ item }) {
  const { pid, quantity, size, price, customisation } = item;

  const foundItem = PRODUCTS.find((product) => product.pid === pid);
  return (
    <div className={styles.wrapper}>
      <Image src={foundItem.img} alt={foundItem.name} width={75} height={75} />
      <div className={styles.info}>
        <p>{foundItem.name}</p>
        <p>{currencyFormatter(price)}</p>
        <p>
          Size: {size.toUpperCase()} / Qty: {quantity}
        </p>
        {customisation && (
          <p>
            Name: {customisation.name} / Number: {customisation.number}
          </p>
        )}
      </div>
    </div>
  );
}
