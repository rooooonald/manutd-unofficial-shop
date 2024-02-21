import PRODUCTS from "@/data/products";

/**
 * Store viewed products into localStorage
 * @param {number} pid
 * Id of the product
 * @returns
 */
export function storeViewedProducts(pid) {
  const viewedItems = localStorage.getItem("viewed");

  if (!viewedItems) {
    localStorage.setItem(
      "viewed",
      JSON.stringify([{ pid, viewTime: Date.now() }])
    );
    return;
  }

  const viewedItemsArray = JSON.parse(viewedItems);

  const viewItemindex = viewedItemsArray.findIndex((item) => item.pid === pid);

  if (viewItemindex < 0) {
    viewedItemsArray.push({ pid, viewTime: Date.now() });
    localStorage.setItem("viewed", JSON.stringify(viewedItemsArray));
  } else {
    viewedItemsArray[viewItemindex].viewTime = Date.now();
    localStorage.setItem("viewed", JSON.stringify(viewedItemsArray));
  }
}

/**
 * Extract viewed products from localStorage
 * @returns
 * The list of viewed products stored in localStorage
 */

export function extractViewedProducts() {
  const viewedItems = localStorage.getItem("viewed");

  if (!viewedItems) {
    return;
  }

  const viewedItemsArray = JSON.parse(viewedItems);
  let viewedList = [];
  for (const item of viewedItemsArray) {
    const foundItem = PRODUCTS.find((product) => product.pid === item.pid);
    viewedList.push({ ...foundItem, viewTime: item.viewTime });
  }
  const sortedViewedList = viewedList
    .sort((a, b) => b.viewTime - a.viewTime)
    .slice(0, 5);

  return sortedViewedList;
}
