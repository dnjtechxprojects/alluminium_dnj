"use client";
import React from "react";

// UI IMPORT
import { ColumnsType } from "./Table";
import { Text } from "../typography";
import { Icon } from "../icons";

interface TableRowProps {
  tdClassName?: string;
  columns: ColumnsType[];
  item: any;
  index: number;
  bodyClassName?: string;
  children?: React.ReactNode;
  openMessageId?: string | null;
  setOpenMessageId?: React.Dispatch<React.SetStateAction<string | null>>;
}

const TableRow = (props: TableRowProps) => {
  const {
    tdClassName = "",
    columns,
    item,
    index,
    bodyClassName = "",
    children,
    openMessageId,
    setOpenMessageId,
  } = props;

  const isOpen = openMessageId === item?.message_id;

  const Column = (column: ColumnsType & { idx: number }) => {
    const { action: Action, idx, className = "", mainClassName } = column;

    return (
      <Text
        Tag="td"
        key={index * idx}
        scope="row"
        className={`${tdClassName} ${mainClassName?.(item)} border-b px-6 text-sm`}
        {...(className?.includes("text-ellipsis")
          ? { title: item?.[column?.name]?.toString() }
          : {})}
      >
        <div
          className={`${className} ${
            isOpen ? "h-auto" : "h-10 overflow-hidden"
          } text-sm gap-2 flex items-center text-txt-primary whitespace-nowrap`}
        >
          {column?.action ? (
            <div className="text-sm gap-2 flex w-full">
              <Action {...item} index={index} />
            </div>
          ) : (
            item?.[column?.name]
          )}
        </div>
      </Text>
    );
  };

  return (
    <>
      <tr
        className={`${bodyClassName} ${item?.trClassName}`}
        onClick={() => {
          if (children) {
            setOpenMessageId?.(isOpen ? null : item?.message_id);
          }
        }}
      >
        <td className="px-6 py-2 border-b flex">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenMessageId?.(isOpen ? null : item?.message_id);
            }}
            className={`${isOpen ? "h-auto" : "h-8"} text-primary hover:opacity-80 transition`}
          >
            <Icon name={isOpen ? "Eye" : "EyeOff"} />
          </button>
        </td>
        {columns?.map((column: ColumnsType, idx: number) => (
          <Column
            key={idx}
            {...column}
            idx={idx}
            className={isOpen ? "h-auto" : ""}
          />
        ))}
      </tr>

      {/* Expandable Row */}
      {children && (
        <tr>
          <td colSpan={columns.length + 1} className="p-0 border-b">
            <div
              className={`transition-all overflow-hidden ${
                isOpen ? "max-h-[1000px]" : "max-h-[0px]"} duration-300 ease-in-out`}
            >
              {children}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRow;
