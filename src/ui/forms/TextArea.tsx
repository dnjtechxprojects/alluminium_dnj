// UI IMPORT
import { Icon, IconKey } from "../icons";
import Text from "../typography/Text";
import { TextTypes } from "../theme";

// THIRD - PARTY IMPORT
export interface TextAreaProps {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  infoClassName?: string;
  name: string;
  disabled?: boolean;
  value?: any;
  max?: number;
  rows?: number;
  cols?: number;
  label?: string;
  icon?: IconKey;
  rightIcon?: IconKey;
  placeholder?: string;
  messageType?: TextTypes;
  ref?: any;
  register?: any;
  errors?: any;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onRightIconClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?:(e?:any) => void;
}

const TextArea = (props: TextAreaProps) => {
  const {
    className = "",
    inputClassName = "",
    labelClassName = "",
    infoClassName = "",
    name,
    label,
    icon,
    rightIcon,
    value,
    placeholder = "",
    errors,
    messageType = "Error",
    register,
    onRightIconClick,
    ...rest
  } = props;

  const getRegisterProps = () => (register ? register?.(name) : {});
  const message = errors?.[name]?.["message"]?.toString();
  return (
    <div className={`${className} w-full h-full space-y-0.5`}>
      {label && (
        <div className="flex gap-2 items-center">
          <Text
            Tag='label'
            htmlFor={name}
            className={`${labelClassName} text-sm text-primary-800 font-semibold cursor-pointer`}
          >
            {label}
          </Text>
          <Icon
            name="Info"
            size={18}
            className={`${infoClassName} stroke-black`}
          />
        </div>
      )}
      <div className="relative flex items-center justify-center h-full">
        {icon ? (
          <div className="absolute left-2">
            <Icon name={icon} />
          </div>
        ) : null}
        <textarea
          className={`${inputClassName} ${icon ? "pl-9" : "pl-2"}  ${rightIcon ? "pr-9" : "pr-2"
            } p-2 focus:outline-none w-full min-h-9 rounded-md border focus:border-secondary-400 text-sm placeholder:text-sm focus:translate-x-0.5 focus:shadow-md transition-transform ${message ? "border-error" : "border-primary-400"
            }`}
          step="any"
          id={name}
          placeholder={placeholder}
          {...getRegisterProps()}
          name={name}
          value={value}
          {...rest}
        />
        {rightIcon ? (
          <div className="absolute right-2">
            <Icon
              name={rightIcon}
              className="dark:!stroke-black"
              onClick={onRightIconClick}
            />
          </div>
        ) : null}
      </div>
      {message ? (
        <Text Tag='span' role='alert' className="text-xs text-red-500">
          {message}*
        </Text>
      ) : null}
    </div>
  );
};

export default TextArea;
