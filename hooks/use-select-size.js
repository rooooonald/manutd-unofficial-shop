import { useState } from "react";

export default function useSelectSize() {
  const [selectedSize, setSelectedSize] = useState("");
  const [isError, setIsError] = useState(false);

  const selectSizeHandler = (size) => {
    setSelectedSize(size);
    setIsError(false);
  };

  const resetSizeHandler = () => {
    setSelectedSize("");
    setIsError(false);
  };

  const sizeErrorHandler = () => {
    setIsError(true);
  };

  return {
    selectedSize,
    isError,
    selectSizeHandler,
    resetSizeHandler,
    sizeErrorHandler,
  };
}
