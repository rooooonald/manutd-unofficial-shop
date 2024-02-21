import FeatureItem from "./feature-item";

import styles from "./feature-list.module.css";

export default function FeatureList({ list }) {
  return (
    <div className={styles.wrapper}>
      {list.map((product) => (
        <FeatureItem key={product.pid} item={product} />
      ))}
    </div>
  );
}
