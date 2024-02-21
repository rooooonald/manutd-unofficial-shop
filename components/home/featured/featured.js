"use client";

import Image from "next/image";

import PRODUCTS from "@/data/products";

import FeatureList from "./feature-list";
import IntroText from "./intro-text";

import styles from "./featured.module.css";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
} from "framer-motion";

export default function FeatureProducts() {
  const { scrollY } = useScroll();
  const xSection = useTransform(scrollY, [700, 1100], ["0vw", "-100vw"]);
  const opacityDevilImg = useTransform(scrollY, [0, 700], [0, 0.3]);

  const DevilIconPos = [
    { top: 20, left: 20 },
    { top: 20, right: 20 },
    { bottom: 20, left: 20 },
    { bottom: 20, right: 20 },
  ];

  const IntroTextProps = [
    { text: "ARE", scrollEndPoint: 400 },
    { text: "YOU", scrollEndPoint: 500 },
    { text: "READY", scrollEndPoint: 600 },
    { text: "?", scrollEndPoint: 700 },
  ];

  const featureList = PRODUCTS.filter((product) => product.isFeatured);

  return (
    <LazyMotion features={domAnimation}>
      <section className={styles.wrapper}>
        <m.div style={{ x: xSection }} className={styles.slider}>
          <div className={styles["intro"]}>
            {IntroTextProps.map((props, i) => (
              <IntroText
                key={i}
                text={props.text}
                scrollEndPoint={props.scrollEndPoint}
              />
            ))}
            <m.div style={{ opacity: opacityDevilImg }}>
              <Image
                src="/images/icons/devil.svg"
                alt="devil"
                width={665}
                height={887}
              />
            </m.div>
          </div>
          <div className={styles.products}>
            <h1>Featured Products</h1>

            <FeatureList list={featureList} />
            {DevilIconPos.map((pos, i) => (
              <Image
                key={i}
                src="/images/icons/devil-black.svg"
                alt="devil"
                width={50}
                height={50}
                className={styles["devil-icon"]}
                style={pos}
              />
            ))}
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
