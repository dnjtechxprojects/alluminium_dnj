import React from "react";
import { IconComponentProps } from "./Icon";

interface BookTabIconProps extends IconComponentProps {}

const BookTabIcon: React.FC<BookTabIconProps> = (props: BookTabIconProps) => {
  const {
    fill = 'white',
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
      <path d="M2 6h4" className={`${allPathClassName} ${pathClassName?.[0]}`} />
      <path d="M2 10h4" className={`${allPathClassName} ${pathClassName?.[1]}`} />
      <path d="M2 14h4" className={`${allPathClassName} ${pathClassName?.[2]}`} />
      <path d="M2 18h4" className={`${allPathClassName} ${pathClassName?.[3]}`} />
      <rect width="16" height="20" x="4" y="2" rx="2" className={`${allPathClassName} ${pathClassName?.[4]}`} />
      <path d="M15 2v20" className={`${allPathClassName} ${pathClassName?.[5]}`} />
      <path d="M15 7h5" className={`${allPathClassName} ${pathClassName?.[6]}`} />
      <path d="M15 12h5" className={`${allPathClassName} ${pathClassName?.[7]}`} />
      <path d="M15 17h5" className={`${allPathClassName} ${pathClassName?.[8]}`} />
    </svg>
  );
};
const MemoBookTabIcon = React.memo(BookTabIcon);
export default MemoBookTabIcon;
