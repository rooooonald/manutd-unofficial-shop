"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import OrderSummary from "@/components/order/order-summary";
import CartList from "@/components/cart/cart-list";
import ProductHero from "@/components/products/products-hero";
import ButtonPrimary from "@/components/ui/button-primary";
import { extractViewedProducts } from "@/lib/viewed-products";

import styles from "./page.module.css";

export default function CartPage() {
  const [viewedProducts, setViewedProducts] = useState([]);

  useEffect(() => {
    const retrievedProducts = extractViewedProducts();
    setViewedProducts(retrievedProducts);
  }, []);

  const { items } = useSelector((state) => state.cart);

  const router = useRouter();

  return (
    <main>
      <div className={styles.wrapper}>
        {items.length <= 0 && (
          <div className={styles["cart-list"]}>
            <h1>Your Bag is Empty</h1>
            <ButtonPrimary
              className={styles["start-shopping-button"]}
              onClick={() => router.push("/products")}
            >
              Start Shopping
            </ButtonPrimary>
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className={styles["cart-list"]}>
              <h1>Your Bag</h1>
              <CartList list={items} />
            </div>
            <div className={styles["order-summary"]}>
              <ButtonPrimary
                className={styles["checkout-button"]}
                onClick={() => router.push("/checkout")}
              >
                Checkout
              </ButtonPrimary>
              <OrderSummary />
            </div>
          </>
        )}
      </div>
      <ProductHero title="Recently Viewed" products={viewedProducts} />
    </main>
  );
}
