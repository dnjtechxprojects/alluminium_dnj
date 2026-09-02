import React from "react";
import { IconComponentProps } from "./Icon";

interface RecentChatIconProps extends IconComponentProps {}

const RecentChatIcon: React.FC<RecentChatIconProps> = (props: RecentChatIconProps) => {
  const {
    fill = "none",
    size = 20,
    iconClassName = "",
    pathClassName = {},
    stroke ,
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
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          className={`${allPathClassName} ${pathClassName?.[0]}`}
        />
        <path
          d="M13 8H7"
          className={`${allPathClassName} ${pathClassName?.[1]}`}
        />
        <path
          d="M17 12H7"
          className={`${allPathClassName} ${pathClassName?.[2]}`}
        />
      </svg>
    </>
  );
};
const MemoRecentChatIcon = React.memo(RecentChatIcon);
export default MemoRecentChatIcon;
