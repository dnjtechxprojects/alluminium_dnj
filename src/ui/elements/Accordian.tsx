"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { Icon } from "../icons";
import { useState, useRef, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type AccordionItem = {
  trigger: string;
  content: string;
  user: string;
  feedback: string;
};

interface Props {
  items: AccordionItem[];
  type?: "single" | "multiple";
  className?: string;
}

const ReuseAccordion = ({ items = [], type = "single", className }: Props) => {
  const [open, setOpen] = useState<string | string[]>(
    type === "multiple" ? [] : ""
  );

  const handleValueChange = (value: string | string[]) => {
    setOpen(value);
  };

  const isOpen = (index: number) => {
    if (type === "multiple") {
      return Array.isArray(open) && open.includes(`item-${index}`);
    }
    return open === `item-${index}`;
  };

  // 👉 Use conditional rendering to resolve type mismatch
  if (type === "multiple") {
    return (
      <Accordion.Root
        type="multiple"
        value={open as string[]}
        onValueChange={handleValueChange}
        className={cn("w-full space-y-2", className)}
        // collapsible
      >
        {items?.map((item: any, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="border rounded-lg overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger className="w-full px-4 py-3 sm:py-2 text-left flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 sm:gap-4 font-medium text-primary hover:bg-gray-100 transition-colors">
                <span className="flex-1 break-words truncate">
                  {item.trigger}
                </span>
                <div className="flex-shrink-0 flex items-center gap-2 text-sm text-gray-500 ml-auto">
                  <span className="truncate" title={item.user}>
                    {item.user}
                  </span>
                  <Icon name={isOpen(index) ? "Up" : "Down"} />
                </div>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content forceMount>
              <AnimatePresence initial={false}>
                {isOpen(index) && (
                  <>
                    <MotionContent key={index}>
                      <div>Feedback : {item?.feedback || "Not found"}</div>
                      {item?.content}
                    </MotionContent>
                  </>
                )}
              </AnimatePresence>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    );
  }

  return (
    <Accordion.Root
      type="single"
      value={open as string}
      onValueChange={handleValueChange}
      className={cn("w-full space-y-2", className)}
      collapsible
    >
      {items?.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className="border rounded-lg overflow-hidden"
        >
          <Accordion.Header>
            <Accordion.Trigger className="w-full rounded-lg px-4 py-3 sm:py-2 text-left flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 sm:gap-4 font-medium text-primary bg-gray-100 transition-colors">
              <span className="flex-1 break-words truncate">
                {item.trigger}
              </span>
              <div className="flex-shrink-0 flex items-center gap-2 text-sm text-gray-500 ml-auto">
                <span className="truncate" title={item.user}>
                  {item.user}
                </span>
                <Icon name={isOpen(index) ? "Up" : "Down"} />
              </div>
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content forceMount>
            <AnimatePresence initial={false}>
              {isOpen(index) && (
                <MotionContent key={index}>
                  <div>Feedback : {item?.feedback || "Not found"}</div>
                  {item?.content} 
                </MotionContent>
              )}
            </AnimatePresence>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default ReuseAccordion;

// Separate component to handle smooth height transitions
const MotionContent = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, []);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div
        ref={ref}
        className="px-3 py-2 sm:px-4 text-sm text-muted-foreground break-words"
      >
        {children}
      </div>
    </motion.div>
  );
};
