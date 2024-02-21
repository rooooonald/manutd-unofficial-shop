import { GiTrident } from "react-icons/gi";
import { TfiClose } from "react-icons/tfi";
import { MdReportGmailerrorred } from "react-icons/md";

export function IconDownArrow({ size }) {
  return <GiTrident style={{ fontSize: size }} />;
}

export function IconClose({ size }) {
  return <TfiClose style={{ fontSize: size }} />;
}

export function IconError({ size }) {
  return <MdReportGmailerrorred style={{ fontSize: size }} />;
}
