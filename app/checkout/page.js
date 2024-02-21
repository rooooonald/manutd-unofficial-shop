"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/cart-slice";
import { checkoutFormActions } from "@/store/checkout-form-slice";

import { MISC } from "@/data/products";

import { submitOrder } from "@/lib/server-actions";
import CheckoutContact from "@/components/checkout/checkout-contact";
import CheckoutDelivery from "@/components/checkout/checkout-delivery";
import CheckoutPayment from "@/components/checkout/checkout-payment";
import CheckoutHeader from "@/components/checkout/checkout-header";
import OrderSummary from "@/components/order/order-summary";
import OrderList from "@/components/order/order-list";
import ButtonPrimary from "@/components/ui/button-primary";
import dateFormatter from "@/lib/date-formatter";

import styles from "./page.module.css";

export default function CheckoutPage() {
  const [section, setSection] = useState("contact");

  const { items, totalAmount } = useSelector((state) => state.cart);
  const checkoutForm = useSelector((state) => state.checkoutForm);
  const {
    email,
    phone,
    fName,
    lName,
    address,
    city,
    province,
    postalCode,
    delivery,
    creditCardNum,
    creditCardName,
    isContactFilled,
    isDeliveryFilled,
    isPaymentFilled,
  } = checkoutForm;

  const dispatch = useDispatch();

  const router = useRouter();

  const [state, formAction] = useFormState(submitOrder, {
    status: null,
    id: null,
  });

  useEffect(() => {
    if (state.status === "success") {
      dispatch(cartActions.resetCart());
      dispatch(checkoutFormActions.resetForm());
      localStorage.removeItem("cart");
    }
  }, [state.status]);

  useEffect(() => {
    if (items.length <= 0 && state.status !== "success") {
      router.replace("/cart");
    }
  }, [items, state.status]);

  const submitHandler = (e) => {
    e.preventDefault();

    const tax = totalAmount * MISC.tax;
    const finalAmount =
      totalAmount +
      tax +
      (delivery.method === "express" ? MISC.expressDelivery : 0);

    formAction({ ...checkoutForm, items, amount: finalAmount });
  };

  const cardNumFormatter = (cardNum) => {
    return "·".repeat(12) + cardNum.slice(12, 16);
  };

  const formFilled = isContactFilled && isDeliveryFilled && isPaymentFilled;

  return (
    <main className={styles.wrapper}>
      {state.status !== "success" && (
        <>
          <h1>Checkout</h1>
          <form className={styles.form} onSubmit={submitHandler}>
            <CheckoutHeader
              onClick={() => setSection("contact")}
              title="Contact"
            />

            {section === "contact" && (
              <CheckoutContact onNext={() => setSection("delivery")} />
            )}

            {isContactFilled && section !== "contact" && (
              <div className={styles["contact-summary"]}>
                <div>
                  <h3>Email</h3>
                  <p>{email}</p>
                </div>

                <div>
                  <h3>Delivery Address</h3>
                  <p>
                    {fName} {lName}
                  </p>
                  <p>{address}</p>
                  <p>
                    {city}, {province}, {postalCode}
                  </p>
                  <p> {phone}</p>
                </div>
                <button type="button" onClick={() => setSection("contact")}>
                  Edit
                </button>
              </div>
            )}

            <CheckoutHeader
              disabled={!checkoutForm.isContactFilled}
              onClick={() => setSection("delivery")}
              title="Delivery"
            />

            {section === "delivery" && (
              <CheckoutDelivery onNext={() => setSection("payment")} />
            )}

            {isContactFilled && section !== "delivery" && (
              <div className={styles["delivery-summary"]}>
                <div>
                  <h3>{delivery.method.toUpperCase()}</h3>
                  <p>By {dateFormatter(delivery.deliverDate)}</p>
                </div>
                <button type="button" onClick={() => setSection("delivery")}>
                  Edit
                </button>
              </div>
            )}

            <CheckoutHeader
              disabled={!isContactFilled || !isDeliveryFilled}
              onClick={() => setSection("payment")}
              title="Payment"
            />

            {section === "payment" && (
              <CheckoutPayment onNext={() => setSection("form-filled")} />
            )}

            {isPaymentFilled && section !== "payment" && (
              <div className={styles["payment-summary"]}>
                <div>
                  <h3>Credit Card Number</h3>
                  <p>{cardNumFormatter(creditCardNum)}</p>
                </div>
                <div>
                  <h3>Name on Card</h3>
                  <p>{creditCardName}</p>
                </div>
                <button type="button" onClick={() => setSection("payment")}>
                  Edit
                </button>
              </div>
            )}

            {formFilled && section === "form-filled" && (
              <ButtonPrimary
                className={styles.button}
                disabled={!formFilled}
                onClick={submitHandler}
              >
                Place Order
              </ButtonPrimary>
            )}
          </form>
          <div className={styles["order-summary"]}>
            <h2>Order Summary</h2>
            <OrderSummary />
            <OrderList list={items} />
          </div>
        </>
      )}
      {state.status === "success" && (
        <div className={styles["successful-checkout-wrapper"]}>
          <h1>Thank you for your order!</h1>
          <p>
            Reference Number: <span>{state.orderId}</span>
          </p>
          <p>
            You can now use the reference number to track your order in our
            Order Tracker.
          </p>
          <ButtonPrimary
            className={styles.button}
            onClick={() => router.push("/order-tracker")}
          >
            Order Tracker
          </ButtonPrimary>
        </div>
      )}
    </main>
  );
}
