import useInput from "@/hooks/use-input";
import { checkoutFormActions } from "@/store/checkout-form-slice";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "../ui/form-input";
import { checkEmpty } from "@/lib/validations";

import styles from "./checkout-payment.module.css";
import ButtonPrimary from "../ui/button-primary";

export default function CheckoutPayment({ onNext }) {
  const checkoutForm = useSelector((state) => state.checkoutForm);
  const dispatch = useDispatch();

  const {
    value: num,
    isValid: numIsValid,
    hasError: numHasError,
    isFocused: numIsFocused,
    focusHandler: numFocusHandler,
    valueChangeHandler: numChangeHandler,
    blurHandler: numBlurHandler,
  } = useInput(checkEmpty, checkoutForm.creditCardNum);

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    isFocused: nameIsFocused,
    focusHandler: nameFocusHandler,
    valueChangeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput(checkEmpty, checkoutForm.creditCardName);

  const {
    value: expiryMonth,
    isValid: expiryMonthIsValid,
    hasError: expiryMonthHasError,
    isFocused: expiryMonthIsFocused,
    focusHandler: expiryMonthFocusHandler,
    valueChangeHandler: expiryMonthChangeHandler,
    blurHandler: expiryMonthBlurHandler,
  } = useInput(checkEmpty, checkoutForm.creditCardExpMonth);

  const {
    value: expiryYear,
    isValid: expiryYearIsValid,
    hasError: expiryYearHasError,
    isFocused: expiryYearIsFocused,
    focusHandler: expiryYearFocusHandler,
    valueChangeHandler: expiryYearChangeHandler,
    blurHandler: expiryYearBlurHandler,
  } = useInput(checkEmpty, checkoutForm.creditCardExpYear);

  const {
    value: cvv,
    isValid: cvvIsValid,
    hasError: cvvHasError,
    isFocused: cvvIsFocused,
    focusHandler: cvvFocusHandler,
    valueChangeHandler: cvvChangeHandler,
    blurHandler: cvvBlurHandler,
  } = useInput(checkEmpty, checkoutForm.creditCardCVV);

  const submitHandler = () => {
    dispatch(
      checkoutFormActions.changeValue({
        creditCardNum: num,
        creditCardName: name,
        creditCardExpMonth: expiryMonth,
        creditCardExpYear: expiryYear,
        creditCardCVV: cvv,
      })
    );

    onNext();
  };

  const formIsNotValid =
    !numIsValid ||
    !nameIsValid ||
    !expiryMonthIsValid ||
    !expiryYearIsValid ||
    !cvvIsValid;

  return (
    <section className={styles.wrapper}>
      <h2>Enter Your Payment Details</h2>
      <div className={styles.row1}>
        <FormInput
          id="checkout-creditcard-num"
          label="Card Number"
          input={{
            type: "text",
            value: num,
            onChange: numChangeHandler,
            onBlur: numBlurHandler,
            onFocus: numFocusHandler,
            placeholder: numIsFocused ? "" : "CARD NUMBER",
          }}
          isFocused={numIsFocused}
          errorMsg={numHasError && "Invalid Card Number"}
          className={styles["half-width-input"]}
        />

        <FormInput
          id="checkout-creditcard-name"
          label="Name on Card"
          input={{
            type: "text",
            value: name,
            onChange: nameChangeHandler,
            onBlur: nameBlurHandler,
            onFocus: nameFocusHandler,
            placeholder: nameIsFocused ? "" : "NAME ON CARD",
          }}
          isFocused={nameIsFocused}
          errorMsg={nameHasError && "Invalid Name"}
          className={styles["half-width-input"]}
        />
      </div>
      <div className={styles.row2}>
        <FormInput
          id="checkout-creditcard-expmonth"
          label="Expiry Month"
          input={{
            type: "text",
            value: expiryMonth,
            onChange: expiryMonthChangeHandler,
            onBlur: expiryMonthBlurHandler,
            onFocus: expiryMonthFocusHandler,
            placeholder: expiryMonthIsFocused ? "" : "MM",
          }}
          isFocused={expiryMonthIsFocused}
          errorMsg={expiryMonthHasError && "Invalid Expiry Month"}
          className={styles["onethird-width-input"]}
        />

        <FormInput
          id="checkout-creditcard-expyear"
          label="Expiry Year"
          input={{
            type: "text",
            value: expiryYear,
            onChange: expiryYearChangeHandler,
            onBlur: expiryYearBlurHandler,
            onFocus: expiryYearFocusHandler,
            placeholder: expiryYearIsFocused ? "" : "YY",
          }}
          isFocused={expiryYearIsFocused}
          errorMsg={expiryYearHasError && "Invalid Expiry Year"}
          className={styles["onethird-width-input"]}
        />

        <FormInput
          id="checkout-creditcard-cvv"
          label="CVV"
          input={{
            type: "text",
            value: cvv,
            onChange: cvvChangeHandler,
            onBlur: cvvBlurHandler,
            onFocus: cvvFocusHandler,
            placeholder: cvvIsFocused ? "" : "CVV",
          }}
          isFocused={cvvIsFocused}
          errorMsg={cvvHasError && "Invalid CVV"}
          className={styles["onethird-width-input"]}
        />
      </div>

      <ButtonPrimary
        type="button"
        className={`${styles.button} moving-gradient`}
        disabled={formIsNotValid}
        onClick={submitHandler}
      >
        Continue
      </ButtonPrimary>
    </section>
  );
}
