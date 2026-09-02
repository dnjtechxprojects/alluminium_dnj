import React from "react";

interface AddIconProps {
  fill?: string;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  iconClassName?: string;
}

const AddIcon: React.FC<AddIconProps> = (props: AddIconProps) => {
  const { fill, size = 20, iconClassName = "", ...rest } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M5 12h14" className={iconClassName} />
      <path d="M12 5v14" className={iconClassName} />
    </svg>
  );
};
const MemoAddIcon = React.memo(AddIcon);
export default MemoAddIcon;
