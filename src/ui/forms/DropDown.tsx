// UI IMPORT
import { Icon, IconKey } from "../icons";
import { OptionTypes, TextTypes } from "../theme";

// THIRD - PARTY IMPORT
import D from "react-select";
import { Text } from "../typography";

export interface DropDownProps {
  className?: string;
  selectClassName?: string;
  name: string;
  value?: any;
  label?: string;
  labelClassName?: string;
  disabled?: boolean;
  defaultValue?:any;
  options: OptionTypes[];
  icon?: IconKey;
  rightIcon?: IconKey;
  placeholder?: string;
  messageType?: TextTypes;
  isMulti?: boolean;
  isSearchable?: boolean;
  ref?: any;
  errors?: any;
  register?: any;
  onChange?: (e: any, label: any) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onRightIconClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const DropDown = (props: DropDownProps) => {
  const {
    className = "",
    selectClassName = "",
    label,
    labelClassName = "",
    name,
    value,
    icon,
    rightIcon,
    isMulti,
    options,
    placeholder = "",
    isSearchable = true,
    errors,
    messageType = "Error",
    register,
    disabled,
    defaultValue,
    onChange,
    onRightIconClick,
    ...rest
  } = props;

  const getRegisterProps = () => (register ? register?.(name) : {});
  const message = errors?.[name]?.["message"]?.toString();

  const styles = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      height: 36,
      borderColor:
        state.isFocused || state.isActive
          ? "#38bdf8"
          : message
            ? "#E7515A"
            : "#7fbf7f",
      borderWidth: 1,
      borderRadius: 5,
      boxShadow: "none",
      "&:hover": {
        borderColor: "rgb(71,85,105,0.4)",
      },
    }),
    container: (baseStyles: any) => ({
      ...baseStyles,
      height: 36,
      width: "100%",
    }),
    placeholder: (baseStyles: any) => ({
      ...baseStyles,
      fontSize: 14,
      color: "gray",
    }),
    menuPortal: (baseStyles: any) => ({
      ...baseStyles,
      zIndex: 99999999,
    }),
    option: (baseStyles: any) => ({
      ...baseStyles,
      zIndex: 99999999,
    }),
    multiValue: (baseStyles: any, state: any) => {
      return {
        ...baseStyles,
        fontSize: 14,
        whiteSpace: "nowrap",
      };
    },
    singleValue: (baseStyles: any, state: any) => {
      return {
        ...baseStyles,
        fontSize: 14,
        color: state?.data?.value ? "black" : "gray",
      };
    },
    valueContainer: (baseStyles: any) => ({
      ...baseStyles,
      display: "flex",
      flexWrap: "nowrap",
    }),
  };

  const prepareOptions = () => {
    if (placeholder && !isMulti) {
      return [
        { value: "", label: placeholder },
        ...(options?.length ? options : []),
      ];
    } else {
      return options;
    }
  };

  const prepareValues = () => {
    if (isMulti) {
      return (
        prepareOptions()?.filter((item) => value?.includes(item?.value)) || []
      );
    } else {
      return prepareOptions()?.find((item) => value?.toString() === item?.value?.toString()) || "";
    }
  };

  return (
    <div className={`${className} w-full h-full space-y-0.5`}>
      {label && (
        <div className="flex gap-2 items-center">
          <Text
            htmlFor={name}
            Tag="label"
            className={`${labelClassName} text-sm text-primary-800 font-semibold cursor-pointer`}
          >
            {label}
          </Text>
          <Icon name="Info" size={18} fill="white" />
        </div>
      )}
      <div className="relative flex items-center justify-center h-9 border-primary-400 focus:border-primary-600 border-opacity-80 focus:border">
        {icon ? (
          <div className="absolute left-2">
            <Icon name={icon} />
          </div>
        ) : null}
        <D
          styles={styles}
          options={prepareOptions()}
          id={name}
          defaultValue={defaultValue}
          menuPortalTarget={document.body}
          isDisabled={disabled}
          {...getRegisterProps()}
          value={prepareValues()}
          onChange={(e: any, c: any) => {
            if (isMulti) {
              const values: any = [];
              const labels: any = [];
              e?.forEach((item: any) => {
                values.push(item?.value);
                labels.push(item?.label);
              });

              onChange?.(values, labels);
            } else {
              onChange?.(
                { target: { value: e?.value, name: name } },
                e?.label || ""
              );
            }
          }}
          isMulti={isMulti}
          isSearchable={isSearchable}
          {...rest}
        />
        {rightIcon ? (
          <div className="absolute right-2">
            <Icon name={rightIcon} size={15} onClick={onRightIconClick} />
          </div>
        ) : null}
      </div>
      {message ? (
        <Text role='alert' Tag='span' className="text-xs text-red-500">
          {message}
        </Text>
      ) : null}
    </div>
  );
};

export default DropDown;
