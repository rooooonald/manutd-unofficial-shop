import { useState } from "react";
import useInput from "@/hooks/use-input";
import { useDispatch, useSelector } from "react-redux";
import { checkoutFormActions } from "@/store/checkout-form-slice";

import FormInput from "../ui/form-input";
import { checkEmpty } from "@/lib/validations";

import styles from "./checkout-contact.module.css";
import FormSelect from "../ui/form-select";
import ButtonPrimary from "../ui/button-primary";

export default function CheckoutContact({ onNext }) {
  const [province, setProvince] = useState("ON");
  const [provinceIsFocused, setProvinceIsFocused] = useState(false);

  const checkoutForm = useSelector((state) => state.checkoutForm);
  const dispatch = useDispatch();

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    isFocused: emailIsFocused,
    focusHandler: emailFocusHandler,
    valueChangeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(checkEmpty, checkoutForm.email);

  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    isFocused: phoneIsFocused,
    focusHandler: phoneFocusHandler,
    valueChangeHandler: phoneChangeHandler,
    blurHandler: phoneBlurHandler,
  } = useInput(checkEmpty, checkoutForm.phone);

  const {
    value: fName,
    isValid: fNameIsValid,
    hasError: fNameHasError,
    isFocused: fNameIsFocused,
    focusHandler: fNameFocusHandler,
    valueChangeHandler: fNameChangeHandler,
    blurHandler: fNameBlurHandler,
  } = useInput(checkEmpty, checkoutForm.fName);

  const {
    value: lName,
    isValid: lNameIsValid,
    hasError: lNameHasError,
    isFocused: lNameIsFocused,
    focusHandler: lNameFocusHandler,
    valueChangeHandler: lNameChangeHandler,
    blurHandler: lNameBlurHandler,
  } = useInput(checkEmpty, checkoutForm.lName);

  const {
    value: address,
    isValid: addressIsValid,
    hasError: addressHasError,
    isFocused: addressIsFocused,
    focusHandler: addressFocusHandler,
    valueChangeHandler: addressChangeHandler,
    blurHandler: addressBlurHandler,
  } = useInput(checkEmpty, checkoutForm.address);

  const {
    value: postalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    isFocused: postalCodeIsFocused,
    focusHandler: postalCodeFocusHandler,
    valueChangeHandler: postalCodeChangeHandler,
    blurHandler: postalCodeBlurHandler,
  } = useInput(checkEmpty, checkoutForm.postalCode);

  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    isFocused: cityIsFocused,
    focusHandler: cityFocusHandler,
    valueChangeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
  } = useInput(checkEmpty, checkoutForm.city);

  const submitHandler = () => {
    dispatch(
      checkoutFormActions.changeValue({
        email,
        phone,
        fName,
        lName,
        address,
        postalCode,
        city,
        province,
      })
    );

    onNext();
  };

  const provinceOptions = [
    "AB",
    "BC",
    "MB",
    "NB",
    "NL",
    "NS",
    "NT",
    "NU",
    "ON",
    "PE",
    "QC",
    "SK",
    "YT",
  ];

  const formIsNotValid =
    !emailIsValid ||
    !phoneIsValid ||
    !fNameIsValid ||
    !lNameIsValid ||
    !addressIsValid ||
    !postalCodeIsValid ||
    !cityIsValid ||
    !province;

  return (
    <section className={styles.wrapper}>
      <div className={styles.row1}>
        <FormInput
          id="checkout-email"
          label="Email"
          input={{
            type: "text",
            value: email,
            onChange: emailChangeHandler,
            onBlur: emailBlurHandler,
            onFocus: emailFocusHandler,
            placeholder: emailIsFocused ? "" : "EMAIL",
          }}
          isFocused={emailIsFocused}
          errorMsg={emailHasError && "Invalid Email"}
          className={styles["half-width-input"]}
        />
        <FormInput
          id="checkout-tel"
          label="Phone"
          input={{
            type: "text",
            value: phone,
            onChange: phoneChangeHandler,
            onBlur: phoneBlurHandler,
            onFocus: phoneFocusHandler,
            placeholder: phoneIsFocused ? "" : "PHONE",
          }}
          isFocused={phoneIsFocused}
          errorMsg={phoneHasError && "Invalid Phone Number"}
          className={styles["half-width-input"]}
        />
      </div>

      <h2>Delivery Address</h2>

      <div className={styles.row2}>
        <FormInput
          id="checkout-firstname"
          label="First Name"
          input={{
            type: "text",
            value: fName,
            onChange: fNameChangeHandler,
            onBlur: fNameBlurHandler,
            onFocus: fNameFocusHandler,
            placeholder: fNameIsFocused ? "" : "FIRST NAME",
          }}
          isFocused={fNameIsFocused}
          errorMsg={fNameHasError && "Invalid First Name"}
          className={styles["half-width-input"]}
        />

        <FormInput
          id="checkout-lastname"
          label="Last Name"
          input={{
            type: "text",
            value: lName,
            onChange: lNameChangeHandler,
            onBlur: lNameBlurHandler,
            onFocus: lNameFocusHandler,
            placeholder: lNameIsFocused ? "" : "LAST NAME",
          }}
          isFocused={lNameIsFocused}
          errorMsg={lNameHasError && "Invalid Last Name"}
          className={styles["half-width-input"]}
        />
      </div>

      <div className={styles.row3}>
        <FormInput
          id="checkout-address"
          label="Address"
          input={{
            type: "text",
            value: address,
            onChange: addressChangeHandler,
            onBlur: addressBlurHandler,
            onFocus: addressFocusHandler,
            placeholder: addressIsFocused ? "" : "ADDRESS",
          }}
          isFocused={addressIsFocused}
          errorMsg={addressHasError && "Invalid Address"}
          className={styles["full-width-input"]}
        />
      </div>
      <div className={styles.row4}>
        <FormInput
          id="checkout-postal"
          label="Postal Code"
          input={{
            type: "text",
            value: postalCode,
            onChange: postalCodeChangeHandler,
            onBlur: postalCodeBlurHandler,
            onFocus: postalCodeFocusHandler,
            placeholder: postalCodeIsFocused ? "" : "POSTAL CODE",
          }}
          isFocused={postalCodeIsFocused}
          errorMsg={postalCodeHasError && "Invalid Postal Code"}
          className={styles["half-width-input"]}
        />

        <FormInput
          id="checkout-city"
          label="City"
          input={{
            type: "text",
            value: city,
            onChange: cityChangeHandler,
            onBlur: cityBlurHandler,
            onFocus: cityFocusHandler,
            placeholder: cityIsFocused ? "" : "CITY",
          }}
          isFocused={cityIsFocused}
          errorMsg={cityHasError && "Invalid City Name"}
          className={styles["half-width-input"]}
        />
      </div>
      <div className={styles.row5}>
        <FormSelect
          id="checkout-province"
          input={{ value: province }}
          onChange={(e) => setProvince(e.target.value)}
          onFocus={() => setProvinceIsFocused(true)}
          onBlur={() => setProvinceIsFocused(false)}
          isFocused={provinceIsFocused}
          options={provinceOptions}
        />
      </div>

      <ButtonPrimary
        type="button"
        className={styles.button}
        disabled={formIsNotValid}
        onClick={submitHandler}
      >
        Continue
      </ButtonPrimary>
    </section>
  );
}
