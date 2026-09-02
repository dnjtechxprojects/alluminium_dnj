import React from "react";
import { IconComponentProps } from "./Icon";

interface CloseBoxIconProps extends IconComponentProps { }

const CloseBoxIcon: React.FC<CloseBoxIconProps> = (
  props: CloseBoxIconProps
) => {
  const {
    fill,
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
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="2"
        ry="2"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <path
        d="m15 9-6 6"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
      <path
        d="m9 9 6 6"
        className={`${allPathClassName} ${pathClassName?.[2]}`}
      />
    </svg>
  );
};
const MemoCloseBoxIcon = React.memo(CloseBoxIcon);
export default MemoCloseBoxIcon;
