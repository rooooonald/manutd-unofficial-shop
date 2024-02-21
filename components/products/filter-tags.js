import styles from "./filter-tags.module.css";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { IconClose } from "../ui/icons";

export default function FilterTags({ filters, onChangeFilter }) {
  const {
    type: filteredType,
    color: filteredColor,
    sleeve: filteredSleeve,
  } = filters;

  return (
    <LazyMotion features={domAnimation}>
      <div className={styles.wrapper}>
        {filteredType?.map((type) => (
          <m.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={type}
            className={styles["filter-tag"]}
            onClick={() => onChangeFilter("type", type)}
          >
            <p>Type: {type}</p>
            <div>
              <IconClose />
            </div>
          </m.button>
        ))}
        {filteredColor?.map((color) => (
          <m.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={color}
            className={styles["filter-tag"]}
            onClick={() => onChangeFilter("color", color)}
          >
            <p>Color: {color}</p>
            <div>X</div>
          </m.button>
        ))}
        {filteredSleeve?.map((sleeve) => (
          <m.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={sleeve}
            className={styles["filter-tag"]}
            onClick={() => onChangeFilter("sleeve", sleeve)}
          >
            <p>Sleeve: {sleeve}</p>
            <div>X</div>
          </m.button>
        ))}
      </div>
    </LazyMotion>
  );
}
