import React from "react";
import { IconComponentProps } from "./Icon";

interface ChatIconProps extends IconComponentProps {}

const ChatIcon: React.FC<ChatIconProps> = (props: ChatIconProps) => {
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
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className="lucide lucide-message-circle-more-icon lucide-message-circle-more"
        {...rest}
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"  className={`${allPathClassName} ${pathClassName?.[0]}`}/>
        <path d="M8 12h.01" className={`${allPathClassName} ${pathClassName?.[1]}`}/>
        <path d="M12 12h.01" className={`${allPathClassName} ${pathClassName?.[2]}`}/>
        <path d="M16 12h.01" className={`${allPathClassName} ${pathClassName?.[3]}`}/>
      </svg>

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
const MemoChatIcon = React.memo(ChatIcon);
export default MemoChatIcon;
