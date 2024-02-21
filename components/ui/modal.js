import ReactDOM from "react-dom";

import styles from "./modal.module.css";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { IconClose } from "./icons";

function ModalOverlay({ children, onClose }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: "-40%", x: "-50%" }}
        animate={{ opacity: 1, y: "-50%", x: "-50%" }}
        exit={{ opacity: 0, y: "-40%", x: "-50%" }}
        className={styles.modal}
      >
        <div className={styles["control-btns"]}>
          <div className={styles["close-btn"]} onClick={onClose}>
            <IconClose size="2rem" />
          </div>
        </div>
        {children}
      </m.div>
    </LazyMotion>
  );
}

function Backdrop({ onClose }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { delay: 0.2 } }}
        className={styles.backdrop}
        onClick={onClose}
      ></m.div>
    </LazyMotion>
  );
}

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <Backdrop onClose={onClose} />
      <ModalOverlay onClose={onClose}>{children}</ModalOverlay>
    </>,
    document.getElementById("modal")
  );
}
