import React from "react";
import { IconComponentProps } from "./Icon";

interface DeleteIconProps extends IconComponentProps {}

const DeleteIcon: React.FC<DeleteIconProps> = (props: DeleteIconProps) => {
  const {
    fill = "none",
    size = 20,
    iconClassName = "",
    pathClassName = {},
    stroke = "red",
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
        d="M3 6h18"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <path
        d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
      <path
        d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
        className={`${allPathClassName} ${pathClassName?.[2]}`}
      />
      <line
        x1="10"
        x2="10"
        y1="11"
        y2="17"
        className={`${allPathClassName} ${pathClassName?.[3]}`}
      />
      <line
        x1="14"
        x2="14"
        y1="11"
        y2="17"
        className={`${allPathClassName} ${pathClassName?.[4]}`}
      />
    </svg>
  );
};
const MemoDeleteIcon = React.memo(DeleteIcon);
export default MemoDeleteIcon;
