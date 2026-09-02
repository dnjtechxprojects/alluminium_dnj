// Button
export const buttonClassName = {
    Primary:
      "text-white bg-primary-800 shadow-md dark:shadow-secondary-400",
    Secondary: "text-primary-800 border border-gray-300 bg-transparent",
    Delete: "text-white bg-red-500 to-red-500",
    Default:
      "text-black border border-gray-300 hover:border-primary-800",
  };
  
  export const buttonIconStyle = {
    Primary: "stroke-white dark:stroke-black",
    Secondary: "stroke-white",
    Delete: "stroke-white",
    Default: "stroke-white dark:stroke-black",
  };
  export type ButtonClassName = keyof typeof buttonClassName;
  export const getButtonClassName = (type: ButtonClassName) => {
    return {
      buttonClassName: buttonClassName[type] || buttonClassName["Default"],
      iconClassName: buttonIconStyle[type] || buttonIconStyle["Default"],
    };
  };
  
  export const inputTypes = {
    text: "text",
    number: "number",
    password: "password",
    email: "email",
    datetime: "datetime-local",
    hidden: "hidden",
    date: "date",
  };
  
  export const messageType = {
    error: "error",
    success: "success",
    hint: "hint",
  };
  
  export type InputType = keyof typeof inputTypes;
  export type MessageType = keyof typeof messageType;
  export interface OptionTypes {
    value: any;
    label: any;
    [key: string]: any;
  }
  
  export const textClassName = {
    Primary: "text-primary-700 dark:text-primary-400",
    Secondary: "text-secondary-400 dark:text-secondary-700",
    Dark: "text-primary-100",
    Error: "!text-red-500",
    Green: "!text-green-500",
    Default: "",
  };
  export type TextTypes = keyof typeof textClassName;
  export const getTextStyles = (style: TextTypes) =>
    textClassName?.[style] ? textClassName[style] : textClassName["Default"];
  
  export const diffValueClassName = {
    Normal: "!text-primary-700",
    Up: "!text-green-500",
    Down: "!text-red-500",
  };
  export type DiffValuesTypes = keyof typeof diffValueClassName;
  export const getDiffValuesStyles = (value: number) =>
    (+value || 0) === 0
      ? diffValueClassName["Normal"]
      : +value > 0
      ? diffValueClassName["Up"]
      : diffValueClassName["Down"];
  
  export const getDiffValuesTypes = (value: number): TextTypes =>
    (+value || 0) === 0 ? "Default" : +value > 0 ? "Green" : "Error";
  