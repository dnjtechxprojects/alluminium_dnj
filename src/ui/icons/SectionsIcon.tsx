import React from "react";
import { IconComponentProps } from "./Icon";

interface SectionsIconProps extends IconComponentProps {}

const SectionsIcon: React.FC<SectionsIconProps> = (
  props: SectionsIconProps
) => {
  const {
    fill = "transparent",
    size = 17,
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
        width="17"
        height="17"
        viewBox="0 0 20 20"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...rest}
      >
        <g
          className={`${allPathClassName} ${pathClassName?.[0]} stroke-1`}
        >
          <path
            d="M1.45801 0.5H7.70801C8.23592 0.5 8.66682 0.930132 8.66699 1.45801V18.542C8.66682 19.0699 8.23592 19.5 7.70801 19.5H1.45801C0.930241 19.4998 0.500177 19.0698 0.5 18.542V1.45801C0.500177 0.930241 0.930241 0.500177 1.45801 0.5ZM12.292 15.5H18.542C19.0698 15.5002 19.4998 15.9302 19.5 16.458V18.542C19.4998 19.0698 19.0698 19.4998 18.542 19.5H12.292C11.7641 19.5 11.3332 19.0699 11.333 18.542V16.458C11.3332 15.9301 11.7641 15.5 12.292 15.5ZM12.292 8H18.542C19.0698 8.00018 19.4998 8.43024 19.5 8.95801V11.042C19.4998 11.5698 19.0698 11.9998 18.542 12H12.292C11.7641 12 11.3332 11.5699 11.333 11.042V8.95801C11.3332 8.43013 11.7641 8 12.292 8ZM12.292 0.5H18.542C19.0698 0.500177 19.4998 0.930241 19.5 1.45801V3.54199C19.4998 4.06976 19.0698 4.49982 18.542 4.5H12.292C11.7641 4.5 11.3332 4.06987 11.333 3.54199V1.45801C11.3332 0.930132 11.7641 0.5 12.292 0.5Z"
            stroke="#15803D"
            className={`${allPathClassName} ${pathClassName?.[1]} stroke-1`}
          />
        </g>
        <defs className={`${allPathClassName} ${pathClassName?.[2]} stroke-1`}>
          <clipPath
            id="clip0_77_208"
            className={`${allPathClassName} ${pathClassName?.[3]} stroke-1`}
          >
            <rect
              width={size}
              height={size}
              className={`${allPathClassName} ${pathClassName?.[4]} stroke-1`}
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
const MemoSectionsIcon = React.memo(SectionsIcon);
export default MemoSectionsIcon;
