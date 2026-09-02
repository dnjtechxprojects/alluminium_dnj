import React from "react";
import { IconComponentProps } from "./Icon";

interface QueIconProps extends IconComponentProps {}

const QueIcon: React.FC<QueIconProps> = (props: QueIconProps) => {
  const {
    fill = "none",
    size,
    iconClassName = "",
    pathClassName = {},
    stroke = "black",
    strokeWidth = 2,
    allPathClassName = "",
    ...rest
  } = props;
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className="lucide lucide-circle-question-mark-icon lucide-circle-question-mark"
        {...rest}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          className={`${allPathClassName} ${pathClassName?.[0]}`}
        />
        <path
          d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
          className={`${allPathClassName} ${pathClassName?.[1]}`}
        />
        <path
          d="M12 17h.01"
          className={`${allPathClassName} ${pathClassName?.[2]}`}
        />
      </svg>
    </>
  );
};
const MemoQueIcon = React.memo(QueIcon);
export default MemoQueIcon;
