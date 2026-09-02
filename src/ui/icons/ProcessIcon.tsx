import React from "react";
import { IconComponentProps } from "./Icon";

interface ProcessIconProps extends IconComponentProps {}

const ProcessIcon: React.FC<ProcessIconProps> = (props: ProcessIconProps) => {
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
    <>
    
      <svg
      aria-label="currently running: "
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill={fill}
        stroke={stroke}
      >
        <path
          fill="none"
          stroke="#DBAB0A"
          strokeWidth="2"
          d="M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Z"
          opacity=".5"
          className={`${allPathClassName} ${pathClassName?.[0]}`}
        ></path>
        <path
          fill="#DBAB0A"
          fill-rule="evenodd"
          d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
          clip-rule="evenodd"
          className={`${allPathClassName} ${pathClassName?.[1]}`}
        ></path>
        <path
          fill="#DBAB0A"
          d="M14 8a6 6 0 0 0-6-6V0a8 8 0 0 1 8 8h-2Z"
          className={`${allPathClassName} ${pathClassName?.[2]}`}
        ></path>
      </svg>
    </>
  );
};
const MemoProcessIcon = React.memo(ProcessIcon);
export default MemoProcessIcon;
