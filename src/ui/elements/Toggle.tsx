import { Text } from "../typography";

interface ToggleProps {
  labelClassName?: string;
  className?:string;
  value?: boolean;
  label?: string;
  name?: string;
  onChange?: (value: boolean) => void;
}
const Toggle = (props: ToggleProps) => {
  const { labelClassName = "",className="", value = false, label, name, onChange } = props;
  return (
    <div className={`${className} flex gap-2`}>
      <div
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
          !value
            ? "bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600"
            : ""
        }`}
        onClick={() => {
          onChange?.(!value);
        }}
      >
        <div
          className={`bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md ${
            !value ? "transform translate-x-5" : ""
          }`}
        ></div>
      </div>
      {label && (
        <div className="flex gap-2 items-center">
          <Text
            Tag="label"
            htmlFor={name}
            className={`${labelClassName} text-sm text-primary-800 dark:text-txt font-semibold`}
          >
            {label}
          </Text>
        </div>
      )}
    </div>
  );
};

export default Toggle;
