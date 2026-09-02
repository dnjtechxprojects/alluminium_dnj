import React from "react";
import { IconComponentProps } from "./Icon";

interface DownIconProps extends IconComponentProps { }

const DownIcon: React.FC<DownIconProps> = (props: DownIconProps) => {
  const {
    fill = "none",
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
        d="m6 9 6 6 6-6"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
    </svg>
  );
};
const MemoDownIcon = React.memo(DownIcon);
export default MemoDownIcon;
