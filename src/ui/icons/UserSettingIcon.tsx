import React from "react";
import { IconComponentProps } from "./Icon";

interface UserSettingIconProps extends IconComponentProps { }

const UserSettingIcon: React.FC<UserSettingIconProps> = (
  props: UserSettingIconProps
) => {
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
        d="M2 21a8 8 0 0 1 10.434-7.62"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      />
      <circle
        cx="10"
        cy="8"
        r="5"
        className={`${allPathClassName} ${pathClassName?.[1]}`}
      />
      <circle
        cx="18"
        cy="18"
        r="3"
        className={`${allPathClassName} ${pathClassName?.[2]}`}
      />
      <path
        d="m19.5 14.3-.4.9"
        className={`${allPathClassName} ${pathClassName?.[3]}`}
      />
      <path
        d="m16.9 20.8-.4.9"
        className={`${allPathClassName} ${pathClassName?.[4]}`}
      />
      <path
        d="m21.7 19.5-.9-.4"
        className={`${allPathClassName} ${pathClassName?.[5]}`}
      />
      <path
        d="m15.2 16.9-.9-.4"
        className={`${allPathClassName} ${pathClassName?.[6]}`}
      />
      <path
        d="m21.7 16.5-.9.4"
        className={`${allPathClassName} ${pathClassName?.[7]}`}
      />
      <path
        d="m15.2 19.1-.9.4"
        className={`${allPathClassName} ${pathClassName?.[8]}`}
      />
      <path
        d="m19.5 21.7-.4-.9"
        className={`${allPathClassName} ${pathClassName?.[9]}`}
      />
      <path
        d="m16.9 15.2-.4-.9"
        className={`${allPathClassName} ${pathClassName?.[10]}`}
      />
    </svg>
  );
};
const MemoUserSettingIcon = React.memo(UserSettingIcon);
export default MemoUserSettingIcon;
