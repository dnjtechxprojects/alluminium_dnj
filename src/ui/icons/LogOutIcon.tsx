import React from "react";
import { IconComponentProps } from "./Icon";

interface LogOutIconProps extends IconComponentProps { }

const LogOutIcon: React.FC<LogOutIconProps> = (props: LogOutIconProps) => {
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
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <polyline
        points="16 17 21 12 16 7"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
      <line
        x1="21"
        x2="9"
        y1="12"
        y2="12"
        className={`${allPathClassName} ${pathClassName?.[2]}`}
      />
    </svg>
  );
};
const MemoLogOutIcon = React.memo(LogOutIcon);
export default MemoLogOutIcon;
