"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import styles from "./promotions.module.css";

export default function Promotions() {
  const router = useRouter();

  return (
    <section className={styles.wrapper}>
      <div className={styles["promotion-item1"]}>
        <Image
          src="/images/promotions/away-kit.jpg"
          alt="Away Kit"
          width={1280}
          height={560}
          className={styles["promotion-image"]}
        />
        <div className={styles["promotion-text"]}>
          <h1>NEW 23/24 AWAY KIT</h1>
          <button
            className="moving-gradient"
            onClick={() => router.push("/products?type=away")}
          >
            SHOP NOW
          </button>
        </div>
      </div>
      <div className={styles["promotion-item2"]}>
        <Image
          src="/images/promotions/third-kit.jpg"
          alt="Third Kit"
          width={1280}
          height={560}
          className={styles["promotion-image"]}
        />
        <div className={styles["promotion-text"]}>
          <h1>NEW 23/24 THIRD KIT</h1>
          <button
            className="moving-gradient"
            onClick={() => router.push("/products?type=third")}
          >
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
}
