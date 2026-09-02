"use client";

// UI IMPORT
import Input, { InputProps } from "./Input";

// THIRD - PARTY IMPORT
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";

export interface ControlledInputProps extends InputProps {
    errors?: Partial<FieldErrorsImpl<any>>;
    control: Control<any, any>;
}
const ControlledInput = (props: ControlledInputProps) => {
    const { name, errors, control, ...rest } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const { ref, value = "", ...controles } = field;
                return (
                    <Input
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

export default ControlledInput;