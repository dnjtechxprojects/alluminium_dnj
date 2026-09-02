import React from "react";
import { IconComponentProps } from "./Icon";

interface MenuCloseIconProps extends IconComponentProps {}

const MenuCloseIcon: React.FC<MenuCloseIconProps> = (
  props: MenuCloseIconProps
) => {
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
       viewBox="0 0 128 128"
       fill={fill}
       stroke={stroke}
       strokeWidth={strokeWidth}
       strokeLinecap="round"
       strokeLinejoin="round"
       {...rest}
      >
        <rect
          width="97"
          height="97"
          x="113"
          y="112"
          rx="27"
          transform="rotate(180 113 112)"
          className={`${allPathClassName} ${pathClassName?.[0]}`}
        ></rect>
        <path
          strokeLinecap="round"
          d="M82 111L82 16"
          className={`${allPathClassName} ${pathClassName?.[1]}`}
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M55 49L53.0973 50.3431C48.7198 53.4331 44.7866 57.1088 41.4077 61.2674V61.2674C40.5875 62.2769 40.5875 63.7231 41.4077 64.7326V64.7326C44.7866 68.8912 48.7198 72.5669 53.0973 75.6569L55 77"
          className={`${allPathClassName} ${pathClassName?.[1]}`}
        ></path>
      </svg>
    </>
  );
};
const MemoMenuCloseIcon = React.memo(MenuCloseIcon);
export default MemoMenuCloseIcon;
