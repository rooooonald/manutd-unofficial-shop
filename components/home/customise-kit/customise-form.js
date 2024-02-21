import { useEffect, useState } from "react";
import useInput from "@/hooks/use-input";
import useSelectSize from "@/hooks/use-select-size";

import SizeSelector from "@/components/ui/size-selector";

import styles from "./customise-form.module.css";
import ButtonPrimary from "@/components/ui/button-primary";

export default function CustomiseForm({
  sizes,
  selectedKit,
  onSubmit,
  onChangeName,
  onChangeNum,
  onSelectKit,
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

  const {
    selectedSize,
    isError,
    selectSizeHandler,
    resetSizeHandler,
    sizeErrorHandler,
  } = useSelectSize();

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const changeInputHandler = (e) => {
    if (e.target.name === "player-name") {
      playerNameChangeHandler(e);
      playerNameBlurHandler();
      onChangeName(e.target.value);
    }

    if (e.target.name === "player-num") {
      playerNumChangeHandler(e);
      playerNumBlurHandler();
      onChangeNum(e.target.value);
    }
  };

  const selectKitHandler = (kit) => {
    onSelectKit(kit);
    resetSizeHandler();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!selectedSize) {
      sizeErrorHandler();
      return;
    }

    onSubmit({ playerName, playerNum, selectedSize });

    setIsAdded(true);
    selectSizeHandler("home");
    playerNameResetHandler();
    playerNumResetHandler();
  };

  return (
    <form className={styles.form}>
      <div className={styles["input-group"]}>
        <label htmlFor="player-name">Enter Your Name</label>
        <input
          className={playerNameHasError ? styles["input-error"] : undefined}
          id="player-name"
          name="player-name"
          type="text"
          value={playerName}
          onChange={changeInputHandler}
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
          onChange={changeInputHandler}
          onBlur={playerNumBlurHandler}
          max={99}
          min={1}
          placeholder="1-99"
        />
      </div>

      <div className={styles["select-group"]}>
        <label>
          <div />
          Kit
        </label>
        <div className={styles["select-kit"]}>
          <button
            type="button"
            className={selectedKit === "home" ? styles.active : undefined}
            onClick={() => selectKitHandler("home")}
          >
            Home
          </button>
          <button
            type="button"
            className={selectedKit === "away" ? styles.active : undefined}
            onClick={() => selectKitHandler("away")}
          >
            Away
          </button>
          <button
            type="button"
            className={selectedKit === "third" ? styles.active : undefined}
            onClick={() => selectKitHandler("third")}
          >
            Third
          </button>
        </div>
      </div>

      <div className={styles["select-group"]}>
        <label>
          <div />
          Size
        </label>
        <SizeSelector
          sizes={sizes}
          onSelectSize={selectSizeHandler}
          selectedSize={selectedSize}
          isError={isError}
        />
      </div>

      <ButtonPrimary
        className={styles["cart-button"]}
        disabled={
          !playerNameIsValid || !playerNumIsValid || !selectedSize || isAdded
        }
        onClick={submitHandler}
      >
        {isAdded ? "Added!" : "Add to Cart"}
      </ButtonPrimary>
    </form>
  );
}
