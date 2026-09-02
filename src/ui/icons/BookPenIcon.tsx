import React from "react";
import { IconComponentProps } from "./Icon";

interface BookPenIconProps extends IconComponentProps {}

const BookPenIcon: React.FC<BookPenIconProps> = (props: BookPenIconProps) => {
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
      <path
        d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <path
        d="M2 6h4"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
      <path
        d="M2 10h4"
        className={`${allPathClassName} ${pathClassName?.[2]}`}
      />
      <path
        d="M2 14h4"
        className={`${allPathClassName} ${pathClassName?.[3]}`}
      />
      <path
        d="M2 18h4"
        className={`${allPathClassName} ${pathClassName?.[4]}`}
      />
      <path
        d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
        className={`${allPathClassName} ${pathClassName?.[5]}`}
      />
    </svg>
  );
};
const MemoBookPenIcon = React.memo(BookPenIcon);
export default MemoBookPenIcon;
