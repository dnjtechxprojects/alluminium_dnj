"use client";

import React from "react";
import Picker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon, IconKey } from "../icons";
import Text from "../typography/Text";
import { MessageType } from "../theme";

type ReactDatePickerProps = React.ComponentProps<typeof DatePicker>;

export interface MyDatePickerProps extends Omit<ReactDatePickerProps, "onChange"> {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  name: string;
  value?: any;
  onChange: (date: Date | [Date | null, Date | null] | null) => void;
  isRange?: boolean;
  label?: string;
  placeholder?: string;
  message?: string;
  messageType?: MessageType;
  rightIcon?: IconKey;
}

const DatePicker = ({
  className = "",
  inputClassName = "",
  labelClassName = "",
  name,
  label,
  value,
  onChange,
  isRange = false,
  placeholder = "Select date",
  message,
  messageType = "error",
  rightIcon,
  selected,
  ...rest
}: any) => {
  const rangeProps = isRange
    ? {
        selectsRange: true as const,
        startDate: value?.[0],
        endDate: value?.[1],
      }
    : {};

  return (
    <div className={`${className} h-full space-y-0.5`}>
      {label && (
        <Text
          Tag="label"
          htmlFor={name}
          className={`${labelClassName} text-sm text-primary-800 dark:text-txt font-semibold cursor-pointer`}
        >
          {label}
        </Text>
      )}

      <div className="relative flex items-center">
        {/** Left icon */}
        <div className="absolute left-2 z-[1]">
          <Icon name="Date" />
        </div>

        <Picker
          name={name}
          selected={selected}
          onChange={onChange}
          placeholderText={placeholder}
          className={`${inputClassName} ${
            rightIcon ? "pr-9" : "pr-2"
          } pl-10 focus:outline-none w-full min-w-[215px] !z-[99] h-9 rounded-md border text-sm placeholder:text-sm ${
            message ? "border-error" : "border-gray-300"
          }`}
          {...rangeProps} // range props if applicable
          {...rest} // all other native react-datepicker props
        />

        {rightIcon && (
          <div className="absolute right-2">
            <Icon name={rightIcon} />
          </div>
        )}
      </div>

      {message && (
        <Text role="alert" className="text-xs text-red-500">
          {message}
        </Text>
      )}
    </div>
  );
};

export default DatePicker;
