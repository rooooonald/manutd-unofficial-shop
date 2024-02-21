"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import useSelectSize from "@/hooks/use-select-size";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";

import PRODUCTS, { MISC } from "@/data/products";

import Modal from "@/components/ui/modal";
import ProductHero from "@/components/products/products-hero";
import ProductDetailsCustomisation from "@/components/products/product-details/product-details-customisation";
import SizeSelector from "@/components/ui/size-selector";
import ButtonPrimary from "@/components/ui/button-primary";
import currencyFormatter from "@/lib/currency-formatter";
import {
  storeViewedProducts,
  extractViewedProducts,
} from "@/lib/viewed-products";

import styles from "./page.module.css";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { IoIosAdd } from "react-icons/io";

export default function ProductDetailsPage({ params }) {
  const { selectedSize, isError, selectSizeHandler, sizeErrorHandler } =
    useSelectSize();

  const [quantity, setQuantity] = useState("1");
  const [showCustomisationForm, setShowCustomisationForm] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const selectedProduct = PRODUCTS.find(
    (product) => product.slug === params.slug
  );

  if (!selectedProduct) {
    return notFound();
  }

  const { pid, name, price, img, sizes, description, details } =
    selectedProduct;

  useEffect(() => {
    storeViewedProducts(pid);
  }, []);

  const viewedProducts = useMemo(extractViewedProducts, [pid]);

  const addToCartHandler = (customisationDetails) => {
    if (!selectedSize) {
      sizeErrorHandler();
      return;
    }

    let customisation;
    if (customisationDetails.playerName || customisationDetails.playerNum) {
      customisation = {
        name: customisationDetails.playerName,
        number: customisationDetails.playerNum,
      };
      dispatch(
        cartActions.addToCart({
          pid,
          quantity: 1,
          size: selectedSize,
          price: selectedProduct.price + MISC.customisation,
          customisation,
        })
      );
    } else {
      dispatch(
        cartActions.addToCart({
          pid,
          quantity: +quantity,
          size: selectedSize,
          price: selectedProduct.price,
        })
      );
    }

    // redirect to cart
    router.push("/cart");
  };

  return (
    <LazyMotion features={domAnimation}>
      <main>
        <div className={styles.wrapper}>
          <div className={styles["product-info"]}>
            <Image
              src="/images/icons/devil-black.svg"
              alt="devil"
              width={50}
              height={50}
              className={styles["devil-icon"]}
            />
            <Image
              src={img}
              alt={name}
              width={900}
              height={900}
              className={styles["product-img"]}
            />
            <div className={styles.description}>
              <div
                className={styles["section-title"]}
                onClick={() => setShowDescription((prev) => !prev)}
              >
                <div />
                <h2>Description</h2>
                <m.div
                  animate={{ rotate: showDescription ? 225 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <IoIosAdd style={{ fontSize: "1.25rem" }} />
                </m.div>
              </div>
              {showDescription && <p>{description}</p>}
            </div>
            <div>
              <div
                className={styles["section-title"]}
                onClick={() => setShowDetails((prev) => !prev)}
              >
                <div />
                <h2>Details</h2>
                <m.div
                  animate={{ rotate: showDetails ? 225 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <IoIosAdd style={{ fontSize: "1.25rem" }} />
                </m.div>
              </div>
              {showDetails && (
                <ul>
                  {details.map((detail) => (
                    <li className={styles["product-details-point"]}>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles["product-purchase"]}>
            <h1>{name}</h1>
            <p className={`${styles.price} moving-gradient`}>
              {currencyFormatter(price)}
            </p>
            <div className={styles["select-groups"]}>
              <div className={styles["select-group"]}>
                <div
                  className={styles["section-title"]}
                  onClick={() => setShowDetails((prev) => !prev)}
                >
                  <div />
                  <h2>Sizes</h2>
                </div>
                <SizeSelector
                  sizes={sizes}
                  onSelectSize={selectSizeHandler}
                  selectedSize={selectedSize}
                  isError={isError}
                />

                <button
                  disabled={!selectedSize}
                  className={styles["customise-button"]}
                  onClick={() => setShowCustomisationForm(true)}
                >
                  Customise
                </button>

                <AnimatePresence>
                  {showCustomisationForm && (
                    <Modal onClose={() => setShowCustomisationForm(false)}>
                      <ProductDetailsCustomisation
                        selectedSize={selectedSize}
                        onSubmit={addToCartHandler}
                      />
                    </Modal>
                  )}
                </AnimatePresence>
              </div>
              <div className={styles["select-group"]}>
                <div
                  className={styles["section-title"]}
                  onClick={() => setShowDetails((prev) => !prev)}
                >
                  <div />
                  <h2>Quantity</h2>
                </div>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </div>
            </div>
            <ButtonPrimary
              className={styles["cart-button"]}
              onClick={addToCartHandler}
            >
              Add To Cart
            </ButtonPrimary>
          </div>
        </div>
        <div className={styles["viewed-products"]}>
          <ProductHero title="Recently Viewed" products={viewedProducts} />
        </div>
      </main>
    </LazyMotion>
  );
}
