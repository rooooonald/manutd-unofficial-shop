import { checkoutFormActions } from "@/store/checkout-form-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./checkout-delivery.module.css";
import dateFormatter from "@/lib/date-formatter";
import currencyFormatter from "@/lib/currency-formatter";
import Image from "next/image";
import ButtonPrimary from "../ui/button-primary";

export default function CheckoutDelivery({ onNext }) {
  const checkoutForm = useSelector((state) => state.checkoutForm);
  const dispatch = useDispatch();

  const [delivery, setDelivery] = useState(
    checkoutForm.delivery.method || null
  );

  const today = Date.now();
  const twoWeeksLater = dateFormatter(today + 14 * 24 * 60 * 60 * 1000);

  const submitHandler = () => {
    dispatch(
      checkoutFormActions.changeValue({
        delivery: {
          method: delivery,
          deliverDate:
            delivery === "express"
              ? today + 24 * 60 * 60 * 1000
              : today + 14 * 24 * 60 * 60 * 1000,
        },
      })
    );
    onNext();
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles["option-buttons"]}>
        <button
          type="button"
          className={
            delivery === "express"
              ? `${styles.active} moving-gradient`
              : undefined
          }
          onClick={() => setDelivery("express")}
        >
          <h3>Express</h3>
          <p>
            By <span className={styles["highlight-text"]}>TOMORROW</span>
          </p>
          <Image
            src="/images/icons/devil-black.svg"
            alt="devil"
            width={50}
            height={50}
            className={styles["devil-icon"]}
          />
          <p>{currencyFormatter(50)}</p>
        </button>
        <button
          type="button"
          className={
            delivery === "standard"
              ? `${styles.active} moving-gradient`
              : undefined
          }
          onClick={() => setDelivery("standard")}
        >
          <h3>Standard</h3>
          <p>By {twoWeeksLater}</p>
          <p>FREE</p>
          <Image
            src="/images/icons/devil-black.svg"
            alt="devil"
            width={50}
            height={50}
            className={styles["devil-icon"]}
          />
        </button>
      </div>

      <ButtonPrimary
        type="button"
        className={styles.button}
        disabled={!delivery}
        onClick={submitHandler}
      >
        Continue
      </ButtonPrimary>
    </section>
  );
}
