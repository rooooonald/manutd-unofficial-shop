import FilterTags from "./filter-tags";
import ProductItem from "./product-item";

import styles from "./product-list.module.css";

export default function ProductList({
  list,
  filters,
  onChangeFilter,
  onShowMobileFilter,
}) {
  const {
    type: filteredType,
    color: filteredColor,
    sleeve: filteredSleeve,
  } = filters;

  const hasFilter =
    filteredType.length !== 0 ||
    filteredColor.length !== 0 ||
    filteredSleeve.length !== 0;

  const hasItem = list.length !== 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        {hasFilter && (
          <FilterTags filters={filters} onChangeFilter={onChangeFilter} />
        )}
        <button
          className={`${styles["toggle-filter-button"]} moving-gradient`}
          onClick={onShowMobileFilter}
        >
          FILTER
        </button>
      </div>
      <div className={styles.list}>
        {!hasItem && (
          <p className={styles["no-item"]}>No Results Match the Criteria</p>
        )}
        {hasItem &&
          list.map((item) => <ProductItem key={item.pid} item={item} />)}
      </div>
    </div>
  );
}
