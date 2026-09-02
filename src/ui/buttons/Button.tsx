"use client";
import React from "react";

// UI IMPORT
import { ButtonProps } from ".";
import { Icon, IOSLoader } from "../icons";
import { getButtonClassName } from "../theme";

const Button = (props: ButtonProps) => {
  const {
    className = "",
    children,
    isLoading = false,
    variant = "Default",
    type = "button",
    disabled,
    iconProps,
    ...rest
  } = props;

  const { buttonClassName, iconClassName } = getButtonClassName(variant);

  return (
    <button
      type={type}
      className={`${className} ${buttonClassName} ${!!disabled ? "opacity-40" : "cursor-pointer"
        } group text-sm gap-2 flex items-center justify-center  px-3 py-2 rounded-[8px] whitespace-nowrap`}
      disabled={!!isLoading || disabled}
      {...rest}
    >
      {children}
      {isLoading ? (
        <IOSLoader className={iconClassName} />
      ) : iconProps?.name ? (
        <Icon
          {...iconProps}
          iconClassName={`${iconProps?.className || ""
            } ${iconClassName} `}
        />
      ) : null}
    </button>
  );
};

export const MemoButton = React.memo(Button);
export default MemoButton;
