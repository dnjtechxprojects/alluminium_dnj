import React from "react";
import { IconComponentProps } from "./Icon";

interface DateIconProps extends IconComponentProps {}

const DateIcon: React.FC<DateIconProps> = (props: DateIconProps) => {
  const {
    fill = "white",
    size = 20,
    iconClassName = "",
    pathClassName = {},
    stroke,
    strokeWidth,
    allPathClassName = "",
    ...rest
  } = props;
  return (
    <svg
      className={`${iconClassName}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" className={`${allPathClassName} ${pathClassName?.[0]}`} />
      <line x1="16" x2="16" y1="2" y2="6" className={`${allPathClassName} ${pathClassName?.[1]}`} />
      <line x1="8" x2="8" y1="2" y2="6" className={`${allPathClassName} ${pathClassName?.[2]}`} />
      <line x1="3" x2="21" y1="10" y2="10" className={`${allPathClassName} ${pathClassName?.[3]}`} />
      <path d="M8 14h.01" className={`${allPathClassName} ${pathClassName?.[4]}`} />
      <path d="M12 14h.01" className={`${allPathClassName} ${pathClassName?.[5]}`} />
      <path d="M16 14h.01" className={`${allPathClassName} ${pathClassName?.[6]}`} />
      <path d="M8 18h.01" className={`${allPathClassName} ${pathClassName?.[7]}`} />
      <path d="M12 18h.01" className={`${allPathClassName} ${pathClassName?.[8]}`} />
      <path d="M16 18h.01" className={`${allPathClassName} ${pathClassName?.[9]}`} />
    </svg>
  );
};
const MemoDateIcon = React.memo(DateIcon);
export default MemoDateIcon;
