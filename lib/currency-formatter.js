const currencyFormatter = (price) => {
  let CAD = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });

  return CAD.format(price);
};

export default currencyFormatter;
