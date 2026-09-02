import React from "react";
import { IconComponentProps } from "./Icon";

interface RefreshIconProps extends IconComponentProps {}

const RefreshIcon: React.FC<RefreshIconProps> = (props: RefreshIconProps) => {
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
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" className={`${allPathClassName} ${pathClassName?.[0]}`}/>
        <path d="M3 3v5h5" className={`${allPathClassName} ${pathClassName?.[1]}`}/>
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" className={`${allPathClassName} ${pathClassName?.[2]}`}/>
        <path d="M16 16h5v5" className={`${allPathClassName} ${pathClassName?.[3]}`}/>
      </svg>
    </>
  );
};
const MemoRefreshIcon = React.memo(RefreshIcon);
export default MemoRefreshIcon;
