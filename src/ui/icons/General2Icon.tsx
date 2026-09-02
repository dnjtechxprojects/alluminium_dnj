import React from "react";
import { IconComponentProps } from "./Icon";

interface General2IconProps extends IconComponentProps { }

const General2Icon: React.FC<General2IconProps> = (
  props: General2IconProps
) => {
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
      <circle
        cx="12"
        cy="12"
        r="10"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <path
        d="m14.31 8 5.74 9.94"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
      <path
        d="M9.69 8h11.48"
        className={`${allPathClassName} ${pathClassName?.[2]}`}
      />
      <path
        d="m7.38 12 5.74-9.94"
        className={`${allPathClassName} ${pathClassName?.[3]}`}
      />
      <path
        d="M9.69 16 3.95 6.06"
        className={`${allPathClassName} ${pathClassName?.[4]}`}
      />
      <path
        d="M14.31 16H2.83"
        className={`${allPathClassName} ${pathClassName?.[5]}`}
      />
      <path
        d="m16.62 12-5.74 9.94"
        className={`${allPathClassName} ${pathClassName?.[6]}`}
      />
    </svg>
  );
};
const MemoGeneral2Icon = React.memo(General2Icon);
export default MemoGeneral2Icon;
