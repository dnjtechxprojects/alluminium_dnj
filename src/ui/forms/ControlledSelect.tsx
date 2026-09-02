"use client";

// UI IMPORT
import DropDown, { DropDownProps } from "./DropDown";

// THIRD - PARTY IMPORT
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";

export interface ControlledSelectProps extends Omit<DropDownProps,'register'> {
    errors?: Partial<FieldErrorsImpl<any>>;
    control: Control<any, any>;
}
const ControlledSelect = (props: ControlledSelectProps) => {
    const { name, errors, control, ...rest } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const { ref, value = "", ...controles } = field;
                return (
                    <DropDown
                        value={value}
                        errors={errors}
                        {...controles}
                        {...rest}
                    />
                );
            }}
        />
    );
};

export default ControlledSelect;