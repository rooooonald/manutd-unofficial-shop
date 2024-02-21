"use client";

import useInput from "@/hooks/use-input";
import { useFormState } from "react-dom";

import { emailSubscribe } from "@/lib/server-actions";

import styles from "./email-subscription.module.css";
import { useEffect, useState } from "react";

export default function EmailSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    resetHandler: emailResetHandler,
    blurHandler: emailBlurHandler,
  } = useInput((email) => {
    return email.includes("@") && email.trim().length !== 0;
  });

  const [state, formAction] = useFormState(emailSubscribe, { status: null });

  useEffect(() => {
    if (state.status === "success") {
      setIsSubscribed(true);
      return;
    }

    if (state.status === "error") {
      setIsError(true);

      const timer = setTimeout(() => setIsError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state.status]);

  return (
    <section className={`${styles.wrapper} moving-gradient`}>
      <form className={styles.form} action={formAction}>
        <label htmlFor="email-subscription">
          {isSubscribed
            ? "Thanks for your subscription"
            : "Subscribe now to receive our latest offers"}
        </label>
        {!isSubscribed && (
          <div>
            <input
              id="email-subscription"
              type="email"
              name="email"
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              placeholder={emailHasError ? "Invalid Email" : "Enter Your Email"}
            />
            <button disabled={!emailIsValid || isError}>
              {isError ? "Error" : "Subscribe"}
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
