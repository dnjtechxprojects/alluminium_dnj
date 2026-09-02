import { CSSProperties, PropsWithChildren } from "react";

// UI IMPORT
import { ButtonClassName } from "../theme";
import { IconProps } from "../icons/Icon";

export interface ButtonProps extends PropsWithChildren<{}> {
    isLoading?: boolean;
    name?:string;
    variant?: ButtonClassName;
    className?: string;
    style?: CSSProperties;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    iconProps?:IconProps
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export {default as Button} from './Button'
