import { useEffect, useState } from "react";
import useInput from "@/hooks/use-input";

import styles from "./product-details-customisation.module.css";
import Image from "next/image";
import ButtonPrimary from "@/components/ui/button-primary";

export default function ProductDetailsCustomisation({
  selectedSize,
  onSubmit,
}) {
  const {
    value: playerName,
    isValid: playerNameIsValid,
    hasError: playerNameHasError,
    valueChangeHandler: playerNameChangeHandler,
    blurHandler: playerNameBlurHandler,
    resetHandler: playerNameResetHandler,
  } = useInput((name) => name.trim().length <= 10 && name.trim().length !== 0);

  const {
    value: playerNum,
    isValid: playerNumIsValid,
    hasError: playerNumHasError,
    valueChangeHandler: playerNumChangeHandler,
    blurHandler: playerNumBlurHandler,
    resetHandler: playerNumResetHandler,
  } = useInput((num) => num >= 1 && num <= 99);

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const submitHandler = (e) => {
    e.preventDefault();

    onSubmit({ playerName, playerNum });

    setIsAdded(true);
    playerNameResetHandler();
    playerNumResetHandler();

    // send to the cart
  };

  return (
    <form className={styles.wrapper}>
      <div className={styles.header}>
        <h1>CUSTOMISE</h1>
      </div>

      <div className={styles["section-title"]}>
        <div />
        <h2>Size: {selectedSize.toUpperCase()}</h2>
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="player-name">Enter Your Name</label>
        <input
          className={playerNameHasError ? styles["input-error"] : undefined}
          id="player-name"
          name="player-name"
          type="text"
          value={playerName}
          onChange={playerNameChangeHandler}
          onBlur={playerNameBlurHandler}
          maxLength={10}
          placeholder="Max. 10 characters"
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="player-num">Enter Your Number</label>
        <input
          className={playerNumHasError ? styles["input-error"] : undefined}
          id="player-num"
          name="player-num"
          type="number"
          value={playerNum}
          onChange={playerNumChangeHandler}
          onBlur={playerNumBlurHandler}
          max={99}
          min={1}
          placeholder="1-99"
        />
      </div>

      <ButtonPrimary
        className={styles["cart-button"]}
        disabled={!playerNameIsValid || !playerNumIsValid || isAdded}
        onClick={submitHandler}
      >
        {isAdded ? "Added!" : "Add to Cart"}
      </ButtonPrimary>

      <Image
        src="/images/icons/devil-black.svg"
        alt="devil"
        width={500}
        height={500}
        className={styles["devil-icon"]}
      />
    </form>
  );
}
