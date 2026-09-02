import React from "react";
import { IconComponentProps } from "./Icon";

interface IOSLoaderProps extends IconComponentProps { }

const IOSLoader: React.FC<IOSLoaderProps> = (props: IOSLoaderProps) => {
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
      className={`${iconClassName} stroke-black`}
      width={size}
      height={size}
      viewBox="0 0 2400 2400"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      {...rest}
    >
      <g
        strokeWidth="200"
        strokeLinecap="round"
        fill="none"
        className={`${allPathClassName} ${pathClassName?.[0]}`}
      >
        <line
          x1="1200"
          y1="600"
          x2="1200"
          y2="100"
          className={`${allPathClassName} ${pathClassName?.[1]}`}
        />
        <line
          opacity="0.5"
          x1="1200"
          y1="2300"
          x2="1200"
          y2="1800"
          className={`${allPathClassName} ${pathClassName?.[2]}`}
        />
        <line
          opacity="0.917"
          x1="900"
          y1="680.4"
          x2="650"
          y2="247.4"
          className={`${allPathClassName} ${pathClassName?.[3]}`}
        />
        <line
          opacity="0.417"
          x1="1750"
          y1="2152.6"
          x2="1500"
          y2="1719.6"
          className={`${allPathClassName} ${pathClassName?.[4]}`}
        />
        <line
          opacity="0.833"
          x1="680.4"
          y1="900"
          x2="247.4"
          y2="650"
          className={`${allPathClassName} ${pathClassName?.[5]}`}
        />
        <line
          opacity="0.333"
          x1="2152.6"
          y1="1750"
          x2="1719.6"
          y2="1500"
          className={`${allPathClassName} ${pathClassName?.[6]}`}
        />
        <line
          opacity="0.75"
          x1="600"
          y1="1200"
          x2="100"
          y2="1200"
          className={`${allPathClassName} ${pathClassName?.[7]}`}
        />
        <line
          opacity="0.25"
          x1="2300"
          y1="1200"
          x2="1800"
          y2="1200"
          className={`${allPathClassName} ${pathClassName?.[8]}`}
        />
        <line
          opacity="0.667"
          x1="680.4"
          y1="1500"
          x2="247.4"
          y2="1750"
          className={`${allPathClassName} ${pathClassName?.[9]}`}
        />
        <line
          opacity="0.167"
          x1="2152.6"
          y1="650"
          x2="1719.6"
          y2="900"
          className={`${allPathClassName} ${pathClassName?.[10]}`}
        />
        <line
          opacity="0.583"
          x1="900"
          y1="1719.6"
          x2="650"
          y2="2152.6"
          className={`${allPathClassName} ${pathClassName?.[11]}`}
        />
        <line
          opacity="0.083"
          x1="1750"
          y1="247.4"
          x2="1500"
          y2="680.4"
          className={`${allPathClassName} ${pathClassName?.[12]}`}
        />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          keyTimes="0;0.08333;0.16667;0.25;0.33333;0.41667;0.5;0.58333;0.66667;0.75;0.83333;0.91667"
          values="0 1199 1199;30 1199 1199;60 1199 1199;90 1199 1199;120 1199 1199;150 1199 1199;180 1199 1199;210 1199 1199;240 1199 1199;270 1199 1199;300 1199 1199;330 1199 1199"
          dur="0.83333s"
          begin="0s"
          repeatCount="indefinite"
          calcMode="discrete"
          className={`${allPathClassName} ${pathClassName?.[13]}`}
        />
      </g>
    </svg>
  );
};
const MemoIOSLoader = React.memo(IOSLoader);
export default MemoIOSLoader;
