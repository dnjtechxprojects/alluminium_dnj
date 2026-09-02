import React from "react";

interface BackIconProps {
  fill?: string;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  iconClassName?: string;
}

const BackIcon: React.FC<BackIconProps> = (props: BackIconProps) => {
  const { fill, size = 20, iconClassName = "", ...rest } = props;
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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
      <path d="m15 18-6-6 6-6" className={iconClassName} />
    </svg>
  );
};
const MemoBackIcon = React.memo(BackIcon);
export default MemoBackIcon;
