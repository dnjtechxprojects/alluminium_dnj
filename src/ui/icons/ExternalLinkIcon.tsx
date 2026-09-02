import React from "react";
import { IconComponentProps } from "./Icon";

interface ExternalLinkIconProps extends IconComponentProps {}

const ExternalLinkIcon: React.FC<ExternalLinkIconProps> = (props: ExternalLinkIconProps) => {
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
    <>
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
          d="M15 3h6v6"
          className={`${allPathClassName} ${pathClassName?.[0]}`}
        />
        <path
          d="M10 14 21 3"
          className={`${allPathClassName} ${pathClassName?.[0]}`}
        />
        <path
          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
          className={`${allPathClassName} ${pathClassName?.[0]}`}
        />
      </svg>
    </>
  );
};
const MemoExternalLinkIcon = React.memo(ExternalLinkIcon);
export default MemoExternalLinkIcon;
