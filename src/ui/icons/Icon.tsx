import React from "react";
import * as iconComponents from "./icons";
import { DRAWER_TRANSITION_DURATION } from "@/lib/constant";
type IconKey = keyof typeof iconComponents;

export interface IconProps {
  size?: number;
  name: IconKey;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  iconClassName?: string;
  pathClassName?: any;
  allPathClassName?: string;
  style?: React.CSSProperties;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  onDoubleClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

export interface IconComponentProps
  extends Omit<IconProps, "name" | "onClick" | "onDoubleClick"> {}

const IconComponent: React.FC<IconProps> = (props) => {
  const {
    name,
    size = 20,
    className = "",
    iconClassName = "",
    onClick,
    onDoubleClick,
    ...rest
  } = props;
  const IconStory = iconComponents[name];

  return (
    <span
      className={`${className} flex transition-all items-center justify-center ${DRAWER_TRANSITION_DURATION} group p-2 rounded-[8px] cursor-pointer`}
      onDoubleClick={onDoubleClick}
      onClick={() => {
        onClick?.();
      }}
    >
      <IconStory
        size={size}
        iconClassName={`${iconClassName} cursor-pointer z-0 duration-500 stroke-black dark:stroke-[#fff]`}
        {...rest}
      />
    </span>
  );
};

export const Icon = React.memo(IconComponent);
