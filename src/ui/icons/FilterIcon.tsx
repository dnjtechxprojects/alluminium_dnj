import React from "react";
import { IconComponentProps } from "./Icon";

interface FilterIconProps extends IconComponentProps { }

const FilterIcon: React.FC<FilterIconProps> = (props: FilterIconProps) => {
    const {
        fill = "white",
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
            <line
                x1="21"
                x2="14"
                y1="4"
                y2="4"
                className={`${allPathClassName} ${pathClassName?.[0]}`}
            />
            <line
                x1="10"
                x2="3"
                y1="4"
                y2="4"
                className={`${allPathClassName} ${pathClassName?.[1]}`}
            />
            <line
                x1="21"
                x2="12"
                y1="12"
                y2="12"
                className={`${allPathClassName} ${pathClassName?.[2]}`}
            />
            <line
                x1="8"
                x2="3"
                y1="12"
                y2="12"
                className={`${allPathClassName} ${pathClassName?.[3]}`}
            />
            <line
                x1="21"
                x2="16"
                y1="20"
                y2="20"
                className={`${allPathClassName} ${pathClassName?.[4]}`}
            />
            <line
                x1="12"
                x2="3"
                y1="20"
                y2="20"
                className={`${allPathClassName} ${pathClassName?.[5]}`}
            />
            <line
                x1="14"
                x2="14"
                y1="2"
                y2="6"
                className={`${allPathClassName} ${pathClassName?.[6]}`}
            />
            <line
                x1="8"
                x2="8"
                y1="10"
                y2="14"
                className={`${allPathClassName} ${pathClassName?.[7]}`}
            />
            <line
                x1="16"
                x2="16"
                y1="18"
                y2="22"
                className={`${allPathClassName} ${pathClassName?.[8]}`}
            />
        </svg>
    );
};
const MemoFilterIcon = React.memo(FilterIcon);
export default MemoFilterIcon;
