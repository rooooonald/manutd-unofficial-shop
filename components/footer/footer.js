import Link from "next/link";

import SiteMap from "./site-map";

import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <SiteMap />
      <div className={styles.policy}>
        <ul>
          <Link href="#">
            <li>Term of Use</li>
          </Link>
          <Link href="#">
            <li>Term of Sale</li>
          </Link>
          <Link href="#">
            <li>Privacy & Cookie Policy</li>
          </Link>
        </ul>
      </div>
      <hr />
      <div>© 2024 Cheng Ho Chi Ronald</div>
    </footer>
  );
}
