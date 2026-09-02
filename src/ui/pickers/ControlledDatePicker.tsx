"use client";

import { DatePickerProps } from "react-datepicker";
// UI IMPORT
import DatePicker from "./DatePicker";

// THIRD - PARTY IMPORT
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";

export interface ControlledDatePickerProps extends Omit<DatePickerProps,'onChange'> {
    errors?: Partial<FieldErrorsImpl<any>>;
    control: Control<any, any>;
    onChange?: (date: any, e?: React.SyntheticEvent) => void;
}
const ControlledDatePicker = (props: any) => {
    const { name, errors, control, ...rest } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const { ref, value, ...controles } = field;
                return (
                    <DatePicker
                        value={value}
                        message={errors?.[name]?.["message"]?.toString()}
                        {...controles}
                        {...rest}
                    />
                );
            }}
        />
    );
};

export default ControlledDatePicker;
