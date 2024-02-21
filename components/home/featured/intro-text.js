import styles from "./intro-text.module.css";
import { m, useScroll, useTransform } from "framer-motion";

export default function IntroText({ text, scrollEndPoint }) {
  const { scrollY } = useScroll();
  const fontsizeIntroText = useTransform(
    scrollY,
    [0, scrollEndPoint],
    ["0vw", "8vw"]
  );
  return (
    <m.p
      className={`${styles.text} moving-gradient`}
      style={{ fontSize: fontsizeIntroText }}
    >
      {text}
    </m.p>
  );
}
