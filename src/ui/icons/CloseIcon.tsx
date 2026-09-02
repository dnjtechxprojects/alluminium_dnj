import React from "react";
import { IconComponentProps } from "./Icon";

interface CloseIconProps extends IconComponentProps {
}

const CloseIcon: React.FC<CloseIconProps> = (props: CloseIconProps) => {
    const {
        fill,
        size = 20,
        iconClassName = "",
        pathClassName = {},
        stroke,
        strokeWidth,
        allPathClassName = '',
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
            <path d="M18 6 6 18" className={`${allPathClassName} ${pathClassName?.[0]}`} />
            <path d="m6 6 12 12" className={`${allPathClassName} ${pathClassName?.[1]}`} />
        </svg>
    );
};
const MemoCloseIcon = React.memo(CloseIcon);
export default MemoCloseIcon;
