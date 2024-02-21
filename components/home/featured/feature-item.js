import { useEffect, useState } from "react";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";
import currencyFormatter from "@/lib/currency-formatter";

import SizeSelector from "@/components/ui/size-selector";

import styles from "./feature-item.module.css";
import { m } from "framer-motion";
import useSelectSize from "@/hooks/use-select-size";

export default function FeatureItem({ item }) {
  const { pid, img, price, name, sizes } = item;

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const dispatch = useDispatch();

  const { selectedSize, isError, selectSizeHandler, sizeErrorHandler } =
    useSelectSize();

  const setQuantityHandler = (quantity) => {
    setQuantity((prev) => {
      if (prev === 1 && quantity === -1) {
        return prev;
      }

      if (prev === 9 && quantity === 1) {
        return prev;
      }

      return prev + quantity;
    });
  };

  const addToCartHandler = () => {
    if (!selectedSize) {
      sizeErrorHandler();
      return;
    }

    dispatch(
      cartActions.addToCart({ pid, quantity, price, size: selectedSize })
    );

    setIsAdded(true);
    setQuantity(1);
    selectSizeHandler("");
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 1.5 } }}
      className={styles.wrapper}
    >
      <Image
        src={img}
        alt={name}
        className={styles["product-img"]}
        width={300}
        height={300}
      />
      <div className={styles["product-info"]}>
        <p className={`${styles.price} moving-gradient`}>
          {currencyFormatter(price)}
        </p>
        <p className={styles.name}>{name}</p>
      </div>

      <div className={styles["add-cart"]}>
        <SizeSelector
          sizes={sizes}
          onSelectSize={selectSizeHandler}
          selectedSize={selectedSize}
          isError={isError}
        />
        <div>
          <div className={styles["quantity-control"]}>
            <button onClick={() => setQuantityHandler(-1)}>-</button>
            <p> {quantity}</p>
            <button onClick={() => setQuantityHandler(1)}>+</button>
          </div>
          <button
            className={`${styles["cart-button"]} moving-gradient`}
            onClick={addToCartHandler}
            disabled={isAdded}
          >
            {isAdded ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </m.div>
  );
}
