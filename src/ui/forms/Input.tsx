// UI IMPORT
import { Icon, IconKey } from "../icons";
import { Text } from "../typography";
import { InputType, TextTypes, inputTypes } from "../theme";
import { useState } from "react";
import { cn } from "@/lib/utils";

// THIRD - PARTY IMPORT

type VariantTypes = "Normal" | "Password";
export interface InputProps {
  className?: string;
  className2?:string;
  inputClassName?: string;
  labelClassName?: string;
  infoClassName?: string;
  name: string;
  disabled?: boolean;
  value?: string | number;
  max?: number;
  ref?:any;
  label?: string;
  icon?: IconKey;
  rightIcon?: IconKey;
  type?: InputType;
  placeholder?: string;
  messageType?: TextTypes;
  refe?: any;
  register?: any;
  errors?: any;
  autoFocus?: boolean;
  variant?: VariantTypes;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onRightIconClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  onDragEnter?:any;
  onFocus?:(e:any)=>void
}

const Input = (props: InputProps) => {
  const {
    className = "",
    className2 = "",
    inputClassName = "",
    labelClassName = "",
    infoClassName = "",
    name,
    label,
    icon,
    rightIcon,
    type = "text",
    placeholder = "",
    errors,
    messageType = "Error",
    variant = "Normal",
    register,
    refe,
    onFocus,
    onRightIconClick,
    onChange,
    ...rest
  } = props;

  const message = errors?.[name]?.["message"]?.toString();

  const [isEyeVisible, setIsEyeVisible] = useState(false);

  const rIcon: IconKey | undefined =
    variant === "Password" ? (isEyeVisible ? "Eye" : "EyeOff") : rightIcon;

  return (
    <div className={`${className} h-full`}>
      {label && (
        <div className="flex gap-2 items-center">
          <Text
            Tag="label"
            htmlFor={name}
            className={`${labelClassName} text-sm text-primary-800 font-semibold cursor-pointer`}
          >
            {label}
          </Text>
          <Icon name="Info" size={18} />
        </div>
      )}
      <div className={cn("relative flex items-center justify-center h-full",className2)}>
        {icon ? (
          <div className="absolute left-[10px]">
            <Icon name={icon} className="!p-0 hover:!bg-transparent" />
          </div>
        ) : null}
        <input
          ref={refe}
          name={name}
          type={variant === "Password" ? isEyeVisible ? "text" : "password" : inputTypes[type]}
          id={name}
          className={`${inputClassName} ${icon ? "pl-9" : "pl-2"}  ${rIcon ? "pr-9" : "pr-2"
            } focus:outline-none w-full h-12 rounded-[8px] border text-sm placeholder:text-sm ${message
              ? "border-error"
              : "border-primary-400 focus:border-primary-600 border-opacity-80 focus:border"
            }`}
            // onDragEnter={onDragEnter}
          placeholder={placeholder}
          step="any"
          {...(register ? register?.(name) : {})}
          onChange={(e) => {
            onChange?.(e);
          }}
          {...rest}
        />
        {rIcon ? (
          <div className="absolute right-[10px]">
            <Icon
              className="!p-0 hover:!bg-transparent"
              iconClassName="stroke-gray-400"
              name={rIcon}
              onClick={() => {
                if (variant === "Password") {
                  setIsEyeVisible((isEyeVisible) => !isEyeVisible);
                  return;
                }
                onRightIconClick?.();
              }}
            />
          </div>
        ) : null}
      </div>
      {message ? (
        <Text Tag="span" role="alert" className="text-xs text-red-500">
          {message}*
        </Text>
      ) : null}
    </div>
  );
};

export default Input;
