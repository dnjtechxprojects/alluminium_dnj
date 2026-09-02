// UI IMPORT
import { Icon, IconKey } from "../icons";
import { OptionTypes, TextTypes } from "../theme";
import { Text } from "../typography";

export interface Select3Props {
    className?: string;
    selectClassName?: string;
    name: string;
    value?: any;
    label?: string;
    labelClassName?: string;
    disabled?: boolean;
    options: OptionTypes[];
    icon?: IconKey;
    rightIcon?: IconKey;
    placeholder?: string;
    messageType?: TextTypes;
    ref?: any;
    errors?: any;
    register?: any;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>, label: any) => void;
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    onRightIconClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const Select3 = (props: Select3Props) => {
    const {
        className = "",
        selectClassName = "",
        label,
        labelClassName = "",
        name,
        value,
        icon,
        rightIcon,
        options,
        placeholder = "",
        errors,
        messageType = "Error",
        register,
        onChange,
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
                        Tag="label"
                        htmlFor={name}
                        className={`${labelClassName} text-sm text-primary-800 font-semibold cursor-pointer`}
                    >
                        {label}
                    </Text>
                    <Icon name="Info" size={18} fill="white" />
                </div>
            )}
            <div className="relative flex items-center justify-center">
                {icon ? (
                    <div className="absolute left-2">
                        <Icon name={icon} />
                    </div>
                ) : null}
                <select
                    className={`${selectClassName} ${icon ? "pl-7" : "pl-2"}
             pr-7
          appearance-none focus:outline-none w-full h-9 text-sm rounded-md border-2 focus:border-secondary-400 ${message ? "border-error" : "border-primary-600 border-opacity-40"
                        }`}
                    id={name}
                    {...getRegisterProps()}
                    value={value}
                    onChange={(e) => {
                        const value = options.find(
                            (option) => option.value == e.target.value
                        );
                        onChange?.(e, value?.label || "");
                    }}
                    {...rest}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options?.map((option: OptionTypes, index: number) => (
                        <option key={index} value={option?.value}>
                            {option?.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-2">
                    <Icon
                        name={rightIcon ? rightIcon : "Down"}
                        size={15}
                        onClick={onRightIconClick}
                    />
                </div>
            </div>
            {message ? (
                <Text role='alert' Tag='span' className="text-xs text-red-500">
                    {message}
                </Text>
            ) : null}
        </div>
    );
};

export default Select3;
