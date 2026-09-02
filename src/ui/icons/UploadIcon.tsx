import React from "react";
import { IconComponentProps } from "./Icon";

interface UploadIconProps extends IconComponentProps {}

const UploadIcon: React.FC<UploadIconProps> = (props: UploadIconProps) => {
  const {
    fill = "transparent",
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
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${iconClassName}`}
      {...rest}
    >
      <path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <polyline
        points="17 8 12 3 7 8"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
      <line
        x1="12"
        x2="12"
        y1="3"
        y2="15"
        className={`${allPathClassName} ${pathClassName?.[2]}`}
      />
    </svg>
  );
};
const MemoUploadIcon = React.memo(UploadIcon);
export default MemoUploadIcon;
