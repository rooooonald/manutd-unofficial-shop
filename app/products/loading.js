import Image from "next/image";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/images/icons/devil-black.svg"
        alt="icon"
        width={50}
        height={50}
        className={styles.icon}
      />
    </div>
  );
}
