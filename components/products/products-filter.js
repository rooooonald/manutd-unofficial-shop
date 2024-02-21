import Image from "next/image";
import FilterSection from "./filter-section";

import styles from "./products-filter.module.css";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

const typeFilter = ["home", "away", "third", "goalkeeper"];
const sleeveFilter = ["long", "short"];
const colorFilter = ["red", "white", "green"];

export default function ProductsFilter({
  onChangeFilter,
  filters,
  isMobileFilterShown,
  onShowMobileFilter,
}) {
  const {
    type: filteredType,
    color: filteredColor,
    sleeve: filteredSleeve,
  } = filters;

  return (
    <LazyMotion features={domAnimation}>
      <div className={styles.wrapper}>
        <div className={styles.sticky}>
          <FilterSection
            filterType="type"
            filterOptions={typeFilter}
            filteredList={filteredType}
            onChangeFilter={onChangeFilter}
          />

          <FilterSection
            filterType="color"
            filterOptions={colorFilter}
            filteredList={filteredColor}
            onChangeFilter={onChangeFilter}
          />

          <FilterSection
            filterType="sleeve"
            filterOptions={sleeveFilter}
            filteredList={filteredSleeve}
            onChangeFilter={onChangeFilter}
          />
        </div>

        <AnimatePresence>
          {isMobileFilterShown && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles["mobile-overlay"]}
            >
              <m.div
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100vh", opacity: 0 }}
                transition={{ type: "tween", duration: 0.2 }}
                className={styles["mobile"]}
              >
                <Image
                  src="/images/icons/devil-black.svg"
                  alt="devil"
                  width={500}
                  height={500}
                  className={styles["devil-icon"]}
                />
                <div className={styles["mobile-filters"]}>
                  <h1>Filter</h1>
                  <FilterSection
                    filterType="type"
                    filterOptions={typeFilter}
                    filteredList={filteredType}
                    onChangeFilter={onChangeFilter}
                  />

                  <FilterSection
                    filterType="color"
                    filterOptions={colorFilter}
                    filteredList={filteredColor}
                    onChangeFilter={onChangeFilter}
                  />

                  <FilterSection
                    filterType="sleeve"
                    filterOptions={sleeveFilter}
                    filteredList={filteredSleeve}
                    onChangeFilter={onChangeFilter}
                  />
                </div>
                <button
                  onClick={onShowMobileFilter}
                  className={`${styles["mobile-button"]} moving-gradient`}
                >
                  Apply
                </button>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
