"use client";

import { Control, Controller, FieldErrorsImpl } from "react-hook-form";
import TextArea, { TextAreaProps } from "./TextArea";

export interface ControlledTextAreaProps extends TextAreaProps {
  errors?: Partial<FieldErrorsImpl<any>>;
  control: Control<any, any>;
}

const ControlledTextArea = (props: ControlledTextAreaProps) => {
  const { name, errors, control, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { ref, value = "", onChange, onBlur } = field;

        return (
          <TextArea
            name={name}                 
            value={value}             
            errors={errors}
            onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
            onBlur={onBlur as (e: React.FocusEvent<HTMLTextAreaElement>) => void}
            {...rest}
          />
        );
      }}
    />
  );
};

export default ControlledTextArea;
