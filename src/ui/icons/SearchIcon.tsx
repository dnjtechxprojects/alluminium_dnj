import React from "react";
import { IconComponentProps } from "./Icon";

interface SearchIconProps extends IconComponentProps { }

const SearchIcon: React.FC<SearchIconProps> = (props: SearchIconProps) => {
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
      <circle
        cx="11"
        cy="11"
        r="8"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <path
        d="m21 21-4.3-4.3"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
    </svg>
  );
};
const MemoSearchIcon = React.memo(SearchIcon);
export default MemoSearchIcon;
