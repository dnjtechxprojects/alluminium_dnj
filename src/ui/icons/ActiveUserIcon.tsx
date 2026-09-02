import React from "react";
import { IconComponentProps } from "./Icon";

interface ActiveUserIconProps extends IconComponentProps {}

const ActiveUserIcon: React.FC<ActiveUserIconProps> = (props: ActiveUserIconProps) => {
  const {
    fill = "none",
    size = 20,
    iconClassName = "",
    pathClassName = {},
    stroke,
    strokeWidth = 2,
    allPathClassName = "",
    ...rest
  } = props;
  return (
    <>
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
        <path d="m16 11 2 2 4-4" className={`${allPathClassName} ${pathClassName?.[0]} `}/>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" className={`${allPathClassName} ${pathClassName?.[1]}`}/>
        <circle cx="9" cy="7" r="4" className={`${allPathClassName} ${pathClassName?.[2]}`}/>
        
      </svg>
    </>
  );
};
const MemoActiveUserIcon = React.memo(ActiveUserIcon);
export default MemoActiveUserIcon;
