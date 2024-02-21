"use client";

import { useState } from "react";
import useInput from "@/hooks/use-input";

import FormInput from "@/components/ui/form-input";
import ButtonPrimary from "@/components/ui/button-primary";
import OrderList from "@/components/order/order-list";
import TrackingBar from "@/components/order-tracker/tracking-bar";
import { checkEmpty } from "@/lib/validations";
import { getOrder } from "@/lib/orders";

import styles from "./page.module.css";

export default function OrderTrackerPage() {
  const [order, setOrder] = useState(null);
  const {
    value: orderId,
    isValid: orderIdIsValid,
    isFocused: orderIdIsFocused,
    hasError: orderIdHasError,
    valueChangeHandler: orderIdChangeHandler,
    focusHandler: orderIdFocusHandler,
    blurHandler: orderIdBlurHandler,
    resetHandler: orderIdResetHandler,
  } = useInput(checkEmpty);

  const submitHandler = async () => {
    const res = await getOrder(orderId);
    const foundOrder = JSON.parse(res);
    setOrder(foundOrder);
  };

  return (
    <main className={styles.wrapper}>
      <h1>Track Your Order</h1>
      <form className={styles.form}>
        <FormInput
          id="tracker-orderid"
          label="Reference Number"
          input={{
            type: "text",
            value: orderId,
            onChange: orderIdChangeHandler,
            onBlur: orderIdBlurHandler,
            onFocus: orderIdFocusHandler,
            placeholder: orderIdIsFocused ? "" : "REFERENCE NUMBER",
          }}
          isFocused={orderIdIsFocused}
          errorMsg={orderIdHasError && "Invalid Reference Number"}
          className={styles.input}
        />
        <ButtonPrimary
          type="button"
          className={styles.button}
          disabled={!orderIdIsValid}
          onClick={submitHandler}
        >
          Check
        </ButtonPrimary>
      </form>

      <div className={styles["order"]}>
        {order && (
          <>
            <div className={styles.delivery}>
              <h2>
                <span>Order #</span>
                {order.id}
              </h2>
              <h2>
                <span>Order Status</span>
                {order.status}
              </h2>
              <div className={styles["tracking-bar"]}>
                <TrackingBar status={order.status} />
              </div>
            </div>
            <div className={styles["order-list"]}>
              <h2>Purchased Items</h2>
              <OrderList list={order.items} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
