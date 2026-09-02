import React from "react";
import { IconComponentProps } from "./Icon";

interface DashboardIconProps extends IconComponentProps {}

const DashboardIcon: React.FC<DashboardIconProps> = (
  props: DashboardIconProps
) => {
  const {
    fill = "transparent",
    size = 20,
    iconClassName = "",
    pathClassName = {},
    stroke,
    strokeWidth,
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
        strokeLinejoin="round"
        className={`${iconClassName}`}
        {...rest}
      >
        <rect width="7" height="9" x="3" y="3" rx="1" className={`${allPathClassName} ${pathClassName?.[0]}`}/>
        <rect width="7" height="5" x="14" y="3" rx="1" className={`${allPathClassName} ${pathClassName?.[1]}`}/>
        <rect width="7" height="9" x="14" y="12" rx="1" className={`${allPathClassName} ${pathClassName?.[2]}`}/>
        <rect width="7" height="5" x="3" y="16" rx="1" className={`${allPathClassName} ${pathClassName?.[3]}`}/>
      </svg>
    </>
  );
};
const MemoDashboardIcon = React.memo(DashboardIcon);
export default MemoDashboardIcon;
