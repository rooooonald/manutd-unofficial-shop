import Link from "next/link";

import styles from "./product-nav.module.css";

export default function ProductNav({ className, onClose }) {
  return (
    <nav className={`${styles.nav} ${className}`}>
      <ul>
        <li>
          <Link href="/products" onClick={onClose}>
            All
          </Link>
        </li>
        <li>
          <Link href="/products?type=home" onClick={onClose}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/products?type=away" onClick={onClose}>
            Away
          </Link>
        </li>
        <li>
          <Link href="/products?type=third" onClick={onClose}>
            Third
          </Link>
        </li>
        <li>
          <Link href="/products?type=goalkeeper" onClick={onClose}>
            Goalkeeper
          </Link>
        </li>
      </ul>
    </nav>
  );
}
