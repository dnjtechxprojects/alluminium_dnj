import React from "react";
import { IconComponentProps } from "./Icon";

interface TotalChatIconProps extends IconComponentProps {}

const TotalChatIcon: React.FC<TotalChatIconProps> = (props: TotalChatIconProps) => {
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
        {...rest}
      >
        <path
          d="m5 19-2 2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"
          className={`${allPathClassName} ${pathClassName?.[0]}`}
        />
        <path
          d="M9 10h6"
          className={`${allPathClassName} ${pathClassName?.[1]}`}
        />
        <path
          d="M12 7v6"
          className={`${allPathClassName} ${pathClassName?.[2]}`}
        />
        <path
          d="M9 17h6"
          className={`${allPathClassName} ${pathClassName?.[3]}`}
        />
      </svg>
    </>
  );
};
const MemoTotalChatIcon = React.memo(TotalChatIcon);
export default MemoTotalChatIcon;
