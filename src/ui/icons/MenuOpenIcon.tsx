import React from "react";
import { IconComponentProps } from "./Icon";

interface MenuOpenProps extends IconComponentProps {}

const MenuOpen: React.FC<MenuOpenProps> = (props: MenuOpenProps) => {
  const {
    fill = "none",
    size = 20,
    iconClassName = "",
    pathClassName = {},
    stroke,
    strokeWidth = 5,
    allPathClassName = "",
    ...rest
  } = props;
  return (
    <>
      <svg
        className={`${iconClassName}`}
        width={size}
        height={size}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        viewBox="0 0 128 128"
        {...rest}
      >
        <rect
          width="97"
          height="97"
          x="15"
          y="16"
          rx="27"
          className={`${allPathClassName} ${pathClassName?.[0]}`}
        ></rect>
        <path
          strokeLinecap="round"
          d="M46 17L46 112"
          className={`${allPathClassName} ${pathClassName?.[1]}`}
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M73 79L74.9027 77.6569C79.2802 74.5669 83.2134 70.8912 86.5923 66.7326V66.7326C87.4125 65.7231 87.4125 64.2769 86.5923 63.2674V63.2674C83.2134 59.1088 79.2802 55.4331 74.9027 52.3431L73 51"
          className={`${allPathClassName} ${pathClassName?.[2]}`}
        ></path>
      </svg>
    </>
  );
};
const MemoMenuOpen = React.memo(MenuOpen);
export default MemoMenuOpen;
