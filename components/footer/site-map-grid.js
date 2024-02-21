import Link from "next/link";
import styles from "./site-map-grid.module.css";

export default function SiteMapGrid({ title, links }) {
  return (
    <div className={styles.wrapper}>
      <h1 className="moving-gradient">{title}</h1>
      <ul>
        {links.map((link, i) => (
          <Link key={i} href={link.href}>
            <li>{link.text}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
