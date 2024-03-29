"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/cart-slice";

import MobileNav from "./mobile-nav";
import ProductNav from "./product-nav";
import currencyFormatter from "@/lib/currency-formatter";

import styles from "./header.module.css";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { LuMenu } from "react-icons/lu";

let initialFetch = true;

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const router = useRouter();

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalNum = cart.items.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  useEffect(() => {
    const cartInLocalStorage = localStorage.getItem("cart");
    if (cartInLocalStorage) {
      dispatch(cartActions.replaceCart(JSON.parse(cartInLocalStorage)));
    }
  }, []);

  useEffect(() => {
    if (initialFetch) {
      initialFetch = false;
      return;
    }

    if (cart.isUpdated) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const closeMenu = () => {
      setShowMobileMenu(false);
    };

    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <header
        className={`${styles.wrapper} ${
          isHomePage ? styles["header-dark"] : styles["header-bright"]
        }`}
      >
        <Link href="/">
          <Image
            src="/images/header/logo.svg"
            alt="logo"
            width={40}
            height={40}
          />
        </Link>
        <ProductNav className={styles["full-size-nav"]} />

        <nav className={styles["shopping-status"]}>
          <Link href="/order-tracker">
            <TbTruckDelivery style={{ fontSize: "1.5rem" }} />
          </Link>

          <button
            className={styles["cart-button"]}
            onClick={() => router.push("/cart")}
          >
            <div className={styles["cart-icon"]}>
              <FiShoppingBag style={{ fontSize: "1.25rem" }} />{" "}
              <m.div
                key={totalNum}
                animate={{
                  scale: [1, 1.1, 1],
                  backgroundColor: isHomePage
                    ? [
                        "rgb(255, 255, 255)",
                        "rgb(146, 53, 47)",
                        "rgb(255, 255,255)",
                      ]
                    : ["rgb(0, 0, 0)", "rgb(146, 53, 47)", "rgb(0, 0, 0)"],
                }}
                transition={{ backgroundColor: { duration: 3 } }}
                style={{
                  color: isHomePage ? "black" : "white",
                }}
              >
                {totalNum}
              </m.div>
            </div>
            <p>{currencyFormatter(cart.totalAmount)}</p>
          </button>
          <button
            className={styles["mobile-menu"]}
            onClick={() => setShowMobileMenu(true)}
          >
            <LuMenu style={{ fontSize: "1.25rem" }} />
          </button>
        </nav>
        <AnimatePresence>
          {showMobileMenu && (
            <MobileNav onClose={() => setShowMobileMenu(false)}>
              <ProductNav
                className={styles["mobile-size-nav"]}
                onClose={() => setShowMobileMenu(false)}
              />
              <nav className={styles["mobile-size-nav"]}>
                <ul>
                  <li>
                    <Link href="/cart" onClick={() => setShowMobileMenu(false)}>
                      <FiShoppingBag style={{ fontSize: "1.5rem" }} /> Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/order-tracker"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <TbTruckDelivery style={{ fontSize: "1.5rem" }} /> Order
                      Tracker
                    </Link>
                  </li>
                </ul>
              </nav>
            </MobileNav>
          )}
        </AnimatePresence>
      </header>
    </LazyMotion>
  );
}
