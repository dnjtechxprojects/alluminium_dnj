import React from "react";
import { IconComponentProps } from "./Icon";

interface InfoIconProps extends IconComponentProps { }

const InfoIcon: React.FC<InfoIconProps> = (props: InfoIconProps) => {
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
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <line
        x1="12"
        x2="12"
        y1="16"
        y2="12"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
      <line
        x1="12"
        x2="12.01"
        y1="8"
        y2="8"
        className={`${allPathClassName} ${pathClassName?.[2]}`}
      />
    </svg>
  );
};
const MemoInfoIcon = React.memo(InfoIcon);
export default MemoInfoIcon;
