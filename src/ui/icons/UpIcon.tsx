import React from "react";
import { IconComponentProps } from "./Icon";

interface UpIconProps extends IconComponentProps { }

const UpIcon: React.FC<UpIconProps> = (props: UpIconProps) => {
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
        d="m18 15-6-6-6 6"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
    </svg>
  );
};
const MemoUpIcon = React.memo(UpIcon);
export default MemoUpIcon;
