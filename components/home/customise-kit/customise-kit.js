"use client";

import { useState } from "react";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";
import PRODUCTS, { MISC } from "@/data/products";

import CustomiseForm from "./customise-form";

import styles from "./customise-kit.module.css";

export default function CustomiseKit() {
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState("");
  const [displayNum, setDisplayNum] = useState();

  const [selectedKit, setSelectedKit] = useState("home");

  const addToCartHandler = ({ playerName, playerNum, selectedSize }) => {
    if (!selectedSize) {
      sizeErrorHandler();
      return;
    }

    const customisation = {
      name: playerName,
      number: playerNum,
    };

    dispatch(
      cartActions.addToCart({
        pid: SELECTED_PRODUCT.pid,
        quantity: 1,
        size: selectedSize,
        price: SELECTED_PRODUCT.price + MISC.customisation,
        customisation,
      })
    );

    setDisplayName("");
    setDisplayNum("");
  };

  const changeDisplayNameHandler = (name) => {
    if (name.trim().length <= 10 && name.trim().length !== 0) {
      setDisplayName(name);
    } else {
      setDisplayName("");
    }
  };

  const changeDisplayNumHandler = (num) => {
    if (num >= 1 && num <= 99) {
      setDisplayNum(num);
    } else {
      setDisplayNum("");
    }
  };

  const selectedKitHandler = (kit) => {
    setSelectedKit(kit);
  };

  let SELECTED_PRODUCT;
  switch (selectedKit) {
    case "home":
      SELECTED_PRODUCT = PRODUCTS[0];
      break;
    case "away":
      SELECTED_PRODUCT = PRODUCTS[1];
      break;
    case "third":
      SELECTED_PRODUCT = PRODUCTS[2];
      break;
    default:
      SELECTED_PRODUCT = PRODUCTS[0];
  }

  const kitTextColor =
    selectedKit === "home" || selectedKit === "away"
      ? styles["kit-text-white"]
      : styles["kit-text-red"];

  return (
    <div className={styles.wrapper}>
      <h1>Customise Your Kit</h1>
      <div className={styles["form-group"]}>
        <div className={styles.kit}>
          <Image
            src={`/images/customise-kit/kit-${selectedKit}.webp`}
            alt="Kit"
            width={360}
            height={500}
          />

          {displayName && (
            <p className={`${styles["player-name"]}  ${kitTextColor}`}>
              {displayName.toUpperCase()}
            </p>
          )}
          {displayNum && (
            <p className={`${styles["player-num"]} ${kitTextColor}`}>
              {displayNum}
            </p>
          )}
        </div>

        <CustomiseForm
          sizes={SELECTED_PRODUCT.sizes}
          selectedKit={selectedKit}
          onSubmit={addToCartHandler}
          onChangeName={changeDisplayNameHandler}
          onChangeNum={changeDisplayNumHandler}
          onSelectKit={selectedKitHandler}
        />
      </div>
      <div className={styles.background}></div>
    </div>
  );
}
