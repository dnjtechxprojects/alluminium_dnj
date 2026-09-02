import React from "react";
import { IconComponentProps } from "./Icon";

interface EyeIconProps extends IconComponentProps { }

const EyeIcon: React.FC<EyeIconProps> = (props: EyeIconProps) => {
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
        d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
    </svg>
  );
};
const MemoEyeIcon = React.memo(EyeIcon);
export default MemoEyeIcon;
