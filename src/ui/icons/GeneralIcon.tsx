import React from "react";
import { IconComponentProps } from "./Icon";

interface GeneralIconProps extends IconComponentProps { }

const GeneralIcon: React.FC<GeneralIconProps> = (props: GeneralIconProps) => {
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
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
    </svg>
  );
};
const MemoGeneralIcon = React.memo(GeneralIcon);
export default MemoGeneralIcon;
