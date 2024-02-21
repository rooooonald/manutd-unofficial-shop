"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import PRODUCTS from "@/data/products";

import ProductList from "@/components/products/product-list";
import ProductsFilter from "@/components/products/products-filter";
import ProductsHero from "@/components/products/products-hero";

import styles from "./page.module.css";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const paramType = searchParams.get("type");

  const [type, setType] = useState([]);
  const [color, setColor] = useState([]);
  const [sleeve, setSleeve] = useState([]);
  const [productList, setProductList] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    if (!paramType) {
      setType([]);
      return;
    }
    setType([paramType]);
  }, [paramType]);

  useEffect(() => {
    let filteredList = [...PRODUCTS];
    if (type.length !== 0) {
      filteredList = filteredList.filter((product) =>
        type.includes(product.category.type)
      );
    }

    if (color.length !== 0) {
      filteredList = filteredList.filter((product) =>
        color.includes(product.category.color)
      );
    }

    if (sleeve.length !== 0) {
      filteredList = filteredList.filter((product) =>
        sleeve.includes(product.category.sleeve)
      );
    }

    setProductList(filteredList);
  }, [type, color, sleeve]);

  const changeFilterHandler = (filterType, value) => {
    if (filterType === "type") {
      setType((prev) => {
        if (prev.includes(value)) {
          return prev.filter((type) => type !== value);
        }
        return [...prev, value];
      });
    }

    if (filterType === "color") {
      setColor((prev) => {
        if (prev.includes(value)) {
          return prev.filter((color) => color !== value);
        }
        return [...prev, value];
      });
    }

    if (filterType === "sleeve") {
      setSleeve((prev) => {
        if (prev.includes(value)) {
          return prev.filter((sleeve) => sleeve !== value);
        }
        return [...prev, value];
      });
    }
  };

  const showMobileFilterHandler = () => {
    setShowMobileFilter((prev) => !prev);
  };

  const featuredProducts = PRODUCTS.filter((product) => product.isFeatured);

  return (
    <main className={styles.wrapper}>
      <ProductsHero title="Featured" products={featuredProducts} />
      <ProductsFilter
        filters={{ type, sleeve, color }}
        isMobileFilterShown={showMobileFilter}
        onShowMobileFilter={showMobileFilterHandler}
        onChangeFilter={changeFilterHandler}
      />

      <ProductList
        list={productList}
        filters={{ type, sleeve, color }}
        onChangeFilter={changeFilterHandler}
        onShowMobileFilter={showMobileFilterHandler}
      />
    </main>
  );
}
