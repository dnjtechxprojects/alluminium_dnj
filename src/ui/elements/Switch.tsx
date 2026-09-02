"use client";

import { Fragment } from "react";

import { Icon } from "../icons";
import { Text } from "../typography";

export interface SwitchProps {
    className?: string;
    labelClassName?: string;
    name: string;
    value?: any;
    disabled?: boolean;
    label?: string;
    options?: any[];
    onChange?: (val?: any) => void;
}
const Switch = (props: SwitchProps) => {
    const {
        className = "",
        labelClassName = "",
        name,
        value,
        disabled,
        label,
        options = [
            { value: "0", label: "Enabled" },
            { value: "1", label: "Disabled" },
        ],
        onChange,
    } = props;
    const index =
        (options?.findIndex((option) => option?.value === value) || 0) + 1;
    return (
        <div
            className={`${className} h-full w-fit items-center ${disabled ? "" : "cursor-pointer"
                } select-none`}
        >
            <div className="w-full h-full space-y-0.5">
                {label && (
                    <div className="flex gap-2 items-center">
                        <Text
                            Tag="label"
                            htmlFor={name}
                            className={`${labelClassName} text-sm text-primary-800 dark:text-txt font-semibold ${disabled ? "" : "cursor-pointer"
                                }`}
                        >
                            {label}
                        </Text>
                        <Icon name="Info" size={18} fill="white" />
                    </div>
                )}
                <div
                    className="border w-fit p-1 border-primary-800 10 text-xs rounded-md flex items-center"
                    onClick={() => {
                        if (!disabled) {
                            onChange?.(
                                options.length <= index
                                    ? options?.[0]?.value
                                    : options?.[index]?.value
                            );
                        }
                    }}
                >
                    {options?.map((option, index) => {
                        const selected = option?.value === value;
                        return (
                            <Fragment key={index}>
                                <Text
                                    Tag="span"
                                    className={`${selected
                                            ? "bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 text-white "
                                            : ""
                                        } ${disabled ? "opacity-50" : ""} rounded-md ${disabled ? "" : "cursor-pointer"
                                        } px-3 py-1.5`}
                                >
                                    {option?.label}
                                </Text>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Switch;
