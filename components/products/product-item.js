import Link from "next/link";
import Image from "next/image";

import currencyFormatter from "@/lib/currency-formatter";

import styles from "./product-item.module.css";
import { m, LazyMotion, domAnimation } from "framer-motion";

export default function ProductItem({ item }) {
  return (
    <LazyMotion features={domAnimation}>
      <Link href={`/products/${item.slug}`}>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles.wrapper}
        >
          <Image src={item.img} alt={item.name} width={250} height={250} />
          <div className={styles["product-info"]}>
            <p className={`${styles.price} moving-gradient`}>
              {currencyFormatter(item.price)}
            </p>
            <p>{item.name}</p>
          </div>
        </m.div>
      </Link>
    </LazyMotion>
  );
}
