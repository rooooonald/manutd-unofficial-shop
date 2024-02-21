import SiteMapGrid from "./site-map-grid";
import styles from "./site-map.module.css";

const SITE_MAP = [
  {
    title: "Products",
    links: [
      { text: "Home", href: "/products?type=home" },
      { text: "Away", href: "/products?type=away" },
      { text: "Third", href: "/products?type=third" },
      { text: "Goalkeeper", href: "/products?type=goalkeeper" },
    ],
  },
  {
    title: "Customer",
    links: [
      { text: "Help", href: "#" },
      { text: "Size Chart", href: "#" },
      { text: "Promo Codes", href: "#" },
    ],
  },
  {
    title: "About Us",
    links: [
      { text: "News", href: "#" },
      { text: "Careers", href: "#" },
      { text: "Manchester United", href: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Facebook", href: "#" },
      { text: "Instagram", href: "#" },
      { text: "X (Formerly Twitter)", href: "#" },
      { text: "Pinterest", href: "#" },
      { text: "TikTok", href: "#" },
      { text: "YouTube", href: "#" },
    ],
  },
];

export default function SiteMap() {
  return (
    <div className={styles.wrapper}>
      {SITE_MAP.map((category) => (
        <SiteMapGrid
          key={category.title}
          title={category.title}
          links={category.links}
        />
      ))}
    </div>
  );
}
