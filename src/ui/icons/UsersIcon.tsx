import React from "react";
import { IconComponentProps } from "./Icon";

interface UsersIconProps extends IconComponentProps {}

const UsersIcon: React.FC<UsersIconProps> = (props: UsersIconProps) => {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" className={`${allPathClassName} ${pathClassName?.[0]}`} />
      <circle cx="9" cy="7" r="4" className={`${allPathClassName} ${pathClassName?.[1]}`} />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" className={`${allPathClassName} ${pathClassName?.[2]}`} />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" className={`${allPathClassName} ${pathClassName?.[3]}`} />
    </svg>
  );
};
const MemoUsersIcon = React.memo(UsersIcon);
export default MemoUsersIcon;
