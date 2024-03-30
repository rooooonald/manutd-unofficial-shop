import { useRef } from "react";
import useHorizontalScroll from "@/hooks/use-horizontal-scroll";
import Image from "next/image";
import Link from "next/link";

import styles from "./products-hero.module.css";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { IconLeft, IconRight } from "../ui/icons";

export default function ProductHero({ title, products }) {
  const listRef = useRef();

  const { canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useHorizontalScroll(listRef, 200);

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

        <div className={styles.scroll} ref={listRef}>
          <h1>{title}</h1>
          <button
            className={styles["scroll-left-btn"]}
            onClick={scrollLeft}
            style={{ visibility: canScrollLeft ? "visible" : "hidden" }}
          >
            <IconLeft />
          </button>
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
            <button
              className={styles["scroll-right-btn"]}
              onClick={scrollRight}
              style={{ visibility: canScrollRight ? "visible" : "hidden" }}
            >
              <IconRight />
            </button>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}
