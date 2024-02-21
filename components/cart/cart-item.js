import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";

import PRODUCTS from "@/data/products";

import currencyFormatter from "@/lib/currency-formatter";

import styles from "./cart-item.module.css";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { RiDeleteBinFill } from "react-icons/ri";

export default function CartItem({ item }) {
  const itemInfo = PRODUCTS.find((foundItem) => foundItem.pid === item.pid);
  const { quantity, size, price, customisation } = item;

  const [inputQuantity, setInputQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const changeQuantityHandler = (e) => {
    setInputQuantity(e.target.value);
    dispatch(cartActions.changeQuantity({ item, newQuantity: e.target.value }));
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div layout className={styles.wrapper}>
        <Image
          src={itemInfo.img}
          alt={itemInfo.name}
          className={styles["product-img"]}
          width={150}
          height={150}
        />
        <div className={styles.info}>
          <p className={styles.name}>{itemInfo.name}</p>
          <p>Size: {size.toUpperCase()}</p>
          {customisation && (
            <>
              <p>Name: {customisation.name}</p>
              <p>Number: {customisation.number}</p>
            </>
          )}
          <div className={styles["select-group"]}>
            <p>Quantity:</p>
            <select value={inputQuantity} onChange={changeQuantityHandler}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <button onClick={() => dispatch(cartActions.removeItem(item))}>
            <RiDeleteBinFill style={{ fontSize: "1.25rem" }} />
          </button>
        </div>
        <div className={styles.price}>
          <p className="moving-gradient">{currencyFormatter(price)}</p>
        </div>
      </m.div>
    </LazyMotion>
  );
}
