export type Tag =
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "strong"
  | "em"
  | "span"
  | "label"
  | "th"
  | "td"
  | "button" 
  | "div"
  | "pre"

export const textTypes = {
  Primary: "text-primary-700",
  Secondary: "text-secondary-400",
  Dark: "text-primary-100",
  Error: "!text-red-500",
  Green: "!text-green-500",
  Default: "",
};
export type TextTypes = keyof typeof textTypes;

export const variants = {
  Default: "",
};
export type VariantTypes = keyof typeof variants;

export interface TextProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  Tag?: Tag;
  role?: string;
  htmlFor?: string;
  scope?: string;
  colSpan?: number;
  tabIndex?: any;
  variant?:VariantTypes;
  contentEditable?:boolean;
  suppressContentEditableWarning?:boolean;
  onClick?: (e?: any) => void;
  onInput?:(e?:any) => void;
  refe?:any
}

const tagStyles: Record<Tag, string> = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-medium tracking-tight",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
  p: "text-base leading-relaxed",
  span: "inline",
  label: "text-sm font-medium",
  strong: "font-semibold",
  em: "italic",
  th: "text-sm font-semibold uppercase",
  td: "text-sm",
  button: "text-sm font-medium",
  div: "text-base",
  pre: "text-sm font-mono bg-gray-100 p-4 rounded",
};

const Text = (props: TextProps) => {
  const { className = "",refe, children, Tag = "p",variant = "Default", ...rest } = props;

  const tagClass = tagStyles[Tag] || "";

  return (
    <Tag ref={refe} className={`${className} ${tagClass} ${variants?.[variant]}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Text;
