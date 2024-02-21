import Image from "next/image";
import Link from "next/link";

import styles from "./products-hero.module.css";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function ProductHero({ title, products }) {
  return (
    <LazyMotion features={domAnimation}>
      <div className={styles.wrapper}>
        <div className={styles["background-ribbon"]}>
          <Image
            src={"/images/products/background/background.webp"}
            alt="Background Image for Products Page"
            width={1920}
            height={150}
          />
        </div>

        <div className={styles.scroll}>
          <h1>{title}</h1>
          <m.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.list}
          >
            {products?.map((product) => (
              <Link key={product.pid} href={`/products/${product.slug}`}>
                <m.div className={styles.item}>
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={150}
                    height={150}
                    className={styles["feature-product-img"]}
                  />
                  <div className={styles["feature-product-info"]}>
                    <p>{product.name}</p>
                  </div>
                  <div
                    className={`${styles["item-background"]} moving-gradient`}
                  ></div>
                </m.div>
              </Link>
            ))}
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}
