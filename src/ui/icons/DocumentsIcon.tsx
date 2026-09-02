import React from "react";
import { IconComponentProps } from "./Icon";

interface ProductIconProps extends IconComponentProps {}

const ProductIcon: React.FC<ProductIconProps> = (
  props: ProductIconProps
) => {
  const {
    fill = "none",
    size = 20,
    iconClassName = "",
    pathClassName = {},
    stroke = "currentColor",
    strokeWidth = 1.8,
    allPathClassName = "",
    ...rest
  } = props;

  return (
    <svg
      className={iconClassName}
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
        d="M21 8L12 13L3 8"
        className={`${allPathClassName} ${pathClassName?.[0] || ""}`}
      />

      <path
        d="M3 8V16L12 21V13"
        className={`${allPathClassName} ${pathClassName?.[1] || ""}`}
      />

      <path
        d="M21 8V16L12 21"
        className={`${allPathClassName} ${pathClassName?.[2] || ""}`}
      />

      <path
        d="M12 3L21 8L12 13L3 8L12 3Z"
        className={`${allPathClassName} ${pathClassName?.[3] || ""}`}
      />
    </svg>
  );
};

const MemoProductIcon = React.memo(ProductIcon);
export default MemoProductIcon;
