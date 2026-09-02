import React from "react";
import { Text } from "../typography";
import { Icon } from "../icons";
import { cn } from "@/lib/utils";

export interface ModalProps {
  visible?: boolean;
  onHide?: () => void;
  title?: string;
  children?: any;
  contentClassName?: string;
  bodyClassName?: string;
  className?:string;
  isCloseVisible?: boolean;
  isOutsideClickClose?:boolean;
}

const Modal = (props: ModalProps) => {
  const {
    visible,
    children,
    onHide,
    title,
    contentClassName = "",
    bodyClassName = "",
    className = "",
    isCloseVisible = true,
  } = props;

  if (!visible) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <div className={cn("fixed inset-0 z-50 bg-black/50 Dark:bg-black/80",className)}>
        <div
          className={cn("z-50 w-full h-dvh overflow-y-auto grid grid-cols-[10px_1fr_10px] grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)] md:grid-rows-[minmax(20px,_1fr)_auto_minmax(20px,_1fr)]",className)}
          onClick={() => {
            onHide?.();
          }}
        >
          <div
            className={`${bodyClassName} z-[999] popover relative start-1/2 col-auto text-primaryText col-start-2 row-auto row-start-2 h-full w-full bg-white text-start -translate-x-1/2 rounded-2xl shadow-xl flex flex-col overflow-hidden focus:outline-none`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="px-2 pb-2 pt-2 sm:p-6 sm:py-3 flex items-center justify-between border-b border-border">
              <div className="flex">
                <div className="flex items-center">
                  <div className="flex-grow flex-col gap-1">
                    <Text
                      Tag="h2"
                      className="text-lg font-semibold leading-6 text-token-text-primary"
                    >
                      {title}
                    </Text>
                  </div>
                </div>
              </div>
              {isCloseVisible ? (
                <Icon name="Close" onClick={() => onHide?.()} />
              ) : null}
            </div>
            <div className={`${contentClassName} flex-grow overflow-y-auto`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
