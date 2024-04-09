import { useState } from "react";
import Image from "next/image";

import styles from "./filter-section.module.css";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { IconClose } from "../ui/icons";

export default function FilterSection({
  filterType,
  filterOptions,
  filteredList,
  onChangeFilter,
}) {
  const [show, setShow] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <div className={styles.wrapper}>
        <label
          className={styles.label}
          onClick={() => setShow((prev) => !prev)}
        >
          <div />
          {filterType}
          <m.div
            animate={{ rotate: show ? 270 : 45 }}
            transition={{ duration: 0.3 }}
          >
            <IconClose size="0.6rem" />
          </m.div>
        </label>
        <AnimatePresence>
          {show && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className={styles["filter-options"]}
            >
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => onChangeFilter(filterType, option)}
                >
                  <div>
                    <Image
                      src="/images/icons/devil.svg"
                      alt="devil"
                      width={15}
                      height={15}
                      className={`
                      ${
                        filteredList.includes(option)
                          ? styles.active
                          : undefined
                      } ${styles["radio-button"]}
                    `}
                    />
                  </div>
                  <p>{option}</p>
                </button>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
