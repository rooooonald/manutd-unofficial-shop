import { GiTrident } from "react-icons/gi";
import { TfiClose } from "react-icons/tfi";

export function IconDownArrow({ size }) {
  return <GiTrident style={{ fontSize: size }} />;
}

export function IconClose({ size }) {
  return <TfiClose style={{ fontSize: size }} />;
}
