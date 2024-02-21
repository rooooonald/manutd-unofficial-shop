"use client";

import { useRouter } from "next/navigation";

import styles from "./hero-banner.module.css";
import { IconDownArrow } from "../ui/icons";
import {
  m,
  LazyMotion,
  domAnimation,
  useScroll,
  useTransform,
} from "framer-motion";
import ButtonPrimary from "../ui/button-primary";

export default function HeroBanner() {
  const { scrollY } = useScroll();
  const yIcon = useTransform(scrollY, [0, 700], [0, 200]);
  const opacityIcon = useTransform(scrollY, [300, 700], [1, 0]);
  const opacityTitle = useTransform(scrollY, [200, 500], [1, 0]);

  const router = useRouter();

  return (
    <LazyMotion features={domAnimation}>
      <section className={styles.wrapper}>
        <m.div style={{ opacity: opacityTitle }} className={styles.title}>
          <p>ONLINE EXCLUSIVE</p>
          <h1>GET YOUR 23/24 HOME KIT</h1>
          <ButtonPrimary onClick={() => router.push("/products?type=home")}>
            SHOP NOW
          </ButtonPrimary>
        </m.div>
        <m.div
          style={{ x: "-50%", y: yIcon, opacity: opacityIcon }}
          className={styles.arrow}
        >
          <p>Scroll Down</p>
          <IconDownArrow size="1.5rem" />
        </m.div>
      </section>
    </LazyMotion>
  );
}
