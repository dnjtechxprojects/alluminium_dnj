import React from "react";
import { IconComponentProps } from "./Icon";

interface EyeOffIconProps extends IconComponentProps { }

const EyeOffIcon: React.FC<EyeOffIconProps> = (props: EyeOffIconProps) => {
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
        d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <path
        d="M14.084 14.158a3 3 0 0 1-4.242-4.242"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
      <path
        d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
        className={`${allPathClassName} ${pathClassName?.[2]}`}
      />
      <path
        d="m2 2 20 20"
        className={`${allPathClassName} ${pathClassName?.[3]}`}
      />
    </svg>
  );
};
const MemoEyeOffIcon = React.memo(EyeOffIcon);
export default MemoEyeOffIcon;
