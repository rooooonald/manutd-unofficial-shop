import Image from "next/image";
import styles from "./tracking-bar.module.css";

export default function TrackingBar({ status }) {
  let pointClass = {
    processing: styles.todo,
    inTransit: styles.todo,
    outForDelivery: styles.todo,
    delivered: styles.todo,
  };
  let animationClass;
  switch (status) {
    case "processing":
      pointClass.processing = styles.active;
      animationClass = styles["step1-animation"];
      break;
    case "in transit":
      pointClass.processing = styles.done;
      pointClass.inTransit = styles.active;
      animationClass = styles["step2-animation"];
      break;
    case "out for delivery":
      pointClass.processing = styles.done;
      pointClass.inTransit = styles.done;
      pointClass.outForDelivery = styles.active;
      animationClass = styles["step3-animation"];
      break;
    case "delivered":
      pointClass.processing = styles.done;
      pointClass.inTransit = styles.done;
      pointClass.outForDelivery = styles.done;
      pointClass.delivered = styles.active;
      animationClass = styles["moving-point4"];
      break;
    default:
      break;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles["bar-container"]}>
        <div className={`${styles.point} ${pointClass.processing}`}>
          <Image src="/images/icons/devil.svg" alt="devil-icon" fill />
        </div>
        <div className={`${styles.point} ${pointClass.inTransit}`}>
          <Image src="/images/icons/devil.svg" alt="devil-icon" fill />
        </div>
        <div className={`${styles.point} ${pointClass.outForDelivery}`}>
          <Image src="/images/icons/devil.svg" alt="devil-icon" fill />
        </div>
        <div className={`${styles.point} ${pointClass.delivered}`}>
          <Image src="/images/icons/devil.svg" alt="devil-icon" fill />
        </div>
        <div className={styles.description}>Processing</div>
        <div className={styles.description}>In Transit</div>
        <div className={styles.description}>Out for Delivery</div>
        <div className={styles.description}>Delivered</div>
        <div className={styles.bar} />
        <div className={`${styles["moving-indicator"]} ${animationClass}`} />
      </div>
    </div>
  );
}
