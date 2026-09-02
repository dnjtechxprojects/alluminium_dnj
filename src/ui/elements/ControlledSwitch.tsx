"use client";

// UI IMPORT
import Switch, { SwitchProps } from "./Switch";

// THIRD - PARTY IMPORT
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";

export interface ControlledSwiotchProps extends SwitchProps {
    errors?: Partial<FieldErrorsImpl<any>>;
    control: Control<any, any>;
}
const ControlledSwitch = (props: ControlledSwiotchProps) => {
    const { name, errors, control, ...rest } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const { ref, value = "", ...controles } = field;
                return (
                    <Switch
                        value={value}
                        {...controles}
                        {...rest}
                    />
                );
            }}
        />
    );
};

export default ControlledSwitch;
