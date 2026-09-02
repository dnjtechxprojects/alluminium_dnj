import { Text } from "../typography";

interface CheckBoxProps {
  name: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
}

const CheckBox = (props: CheckBoxProps) => {
  const { name, label, register, disabled, ...rest } = props;

  const getRegisterProps = () => (register ? register?.(name) : {});

  return (
    <div className="flex gap-2 items-center">
      <input
        name={name}
        className="h-4 w-4 accent-primary-800 dark:accent-white rounded-lg"
        type="checkbox"
        disabled={disabled}
        {...getRegisterProps()}
        {...rest}
      />
      {label && (
        <Text
          Tag="label"
          htmlFor={name}
          className={`text-primary-800 dark:text-txt font-semibold cursor-pointer`}
        >
          {label}
        </Text>
      )}
    </div>
  );
};

export default CheckBox;
