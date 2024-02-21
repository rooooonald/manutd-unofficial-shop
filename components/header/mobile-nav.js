import styles from "./mobile-nav.module.css";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { IconClose } from "../ui/icons";

export default function MobileNav({ onClose, children }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.wrapper}
      >
        <m.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween" }}
        >
          {children}

          <button className={styles["close-btn"]} onClick={onClose}>
            <IconClose size="2rem" />
          </button>
        </m.div>
      </m.div>
    </LazyMotion>
  );
}
