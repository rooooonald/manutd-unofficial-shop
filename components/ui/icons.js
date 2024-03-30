import { GiTrident } from "react-icons/gi";
import { TfiClose } from "react-icons/tfi";
import { MdReportGmailerrorred } from "react-icons/md";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export function IconDownArrow({ size }) {
  return <GiTrident style={{ fontSize: size }} />;
}

export function IconClose({ size }) {
  return <TfiClose style={{ fontSize: size }} />;
}

export function IconError({ size }) {
  return <MdReportGmailerrorred style={{ fontSize: size }} />;
}

export function IconLeft() {
  return <FaAngleLeft />;
}

export function IconRight() {
  return <FaAngleRight />;
}
