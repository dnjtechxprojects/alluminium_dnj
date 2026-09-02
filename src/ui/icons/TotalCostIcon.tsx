import React from "react";
import { IconComponentProps } from "./Icon";

interface TotalCostIconProps extends IconComponentProps {}

const TotalCostIcon: React.FC<TotalCostIconProps> = (
  props: TotalCostIconProps
) => {
  const {
    fill = "none",
    size,
    iconClassName = "",
    pathClassName = {},
    stroke = "black",
    strokeWidth = 2,
    allPathClassName = "",
    ...rest
  } = props;
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        {...rest}
      >
        <circle cx="12" cy="12" r="10" className={`${allPathClassName} ${pathClassName?.[0]}`}/>
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" className={`${allPathClassName} ${pathClassName?.[1]}`}/>
        <path d="M12 18V6" className={`${allPathClassName} ${pathClassName?.[2]}`}/>
      </svg>
    </>
  );
};
const MemoTotalCostIcon = React.memo(TotalCostIcon);
export default MemoTotalCostIcon;
