import React from "react";
import { IconComponentProps } from "./Icon";

interface SortingProps extends IconComponentProps { }

const Sorting: React.FC<SortingProps> = (props: SortingProps) => {
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
            viewBox="0 0 14 23"
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            {...rest}
        >
            <path
                d="M10.897 8.155L9.02449 6.2825L7.88116 5.13333C7.39699 4.64917 6.60949 4.64917 6.12533 5.13333L3.10366 8.155C2.70699 8.55167 2.99283 9.22833 3.54699 9.22833H6.81949H10.4537C11.0137 9.22833 11.2937 8.55167 10.897 8.155Z"
                className={`${allPathClassName} ${pathClassName?.[0]}`}
            />
            <path
                d="M10.4529 13.7717H6.81878H3.54628C2.98628 13.7717 2.70628 14.4483 3.10294 14.845L6.12461 17.8667C6.60878 18.3508 7.39628 18.3508 7.88044 17.8667L9.02961 16.7175L10.9021 14.845C11.2929 14.4483 11.0129 13.7717 10.4529 13.7717Z"
                className={`${allPathClassName} ${pathClassName?.[1]}`}
            />
        </svg>
    );
};
const MemoSorting = React.memo(Sorting);
export default MemoSorting;
