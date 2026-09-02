"use client"
import { useRef } from "react";

// UI IMPORT
import ControlledInput from "./ControlledInput";

// PROJECT IMPORT
import { DIGIT_REGEX } from "@/lib/constant";

// THIRD - PARTY IMPORT
import { useForm } from "react-hook-form";

export interface OtpInputProps {
    className?: string;
    inputClassNames?: any;
    name: string;
    value?: string | number;
    length?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFullfill?:(otp:number) => void;
}

const OtpInput = (props: OtpInputProps) => {
    const {
        className = "",
        inputClassNames = {},
        name,
        length = 4,
        onChange,
        onFullfill,
    } = props;

    const inputRefs = useRef<any[]>([]);

    const prepareDefaultValues = () => {
        const defaultValues: any = {};

        Array.from({ length })?.forEach((_, index) => {
            defaultValues[`${name}_${index}`] = "";
        });
        return defaultValues;
    };
    const { control, setValue, getValues,reset } = useForm({
        defaultValues: prepareDefaultValues(),
    });

    return (
        <div className={`${className} flex items-center`}>
            {Array.from({ length })?.map((_, index) => {
                return (
                    <>
                        <ControlledInput
                            name={`${name}_${index}`}
                            refe={(el: any) => (inputRefs.current[index] = el)}
                            inputClassName={`${inputClassNames?.[index] || ""
                                } !h-12 !w-12 text-center`}
                            control={control}
                            onKeyDown={(e) => {
                                const values = getValues();

                                if (e.key === "Backspace" && !values?.[`${name}_${index}`]) {
                                    if (index > 0) {
                                        inputRefs?.current?.[index - 1]?.focus();
                                    }
                                }
                            }}
                            onChange={(e) => {
                                onChange?.(e);

                                const { value } = e.target;

                                if (value.match(DIGIT_REGEX)) {
                                    if (index < length - 1) {
                                        inputRefs?.current?.[index + 1]?.focus();
                                    }
                                } else if (value === "" && index > 0) {
                                    inputRefs?.current?.[index - 1]?.focus();
                                }

                                if(value?.length <= 1){
                                    setValue(`${name}_${index}`, value);
                                }

                                if(value && length - 1 === index){
                                    const values = getValues()

                                    let otp = ''

                                    Object.values((values))?.forEach((item) => {
                                        otp += item
                                    })
                                    onFullfill?.(+otp)
                                }
                            }}
                        />
                    </>
                );
            })}
        </div>
    );
};

export default OtpInput;
