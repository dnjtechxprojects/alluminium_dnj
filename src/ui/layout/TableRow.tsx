"use client";
import React, { Fragment, useState } from "react";

// UI IMPORT
import { ColumnsType } from "./Table";
import { Text } from "../typography";

interface TableRowProps {
  tdClassName?: string;
  columns: ColumnsType[];
  item: any;
  index: number;
  bodyClassName?: string;
  isMaxHeight?: boolean;
  children?: React.ReactNode;
}
const TableRow = (props: TableRowProps) => {
  const {
    tdClassName = "",
    columns,
    item,
    index,
    bodyClassName = "",
    children,
    isMaxHeight,
  } = props;

  const [isLocalOpen, setIsLocalOpen] = useState<boolean>(false);

  const Column = (column: ColumnsType & { idx: number }) => {
    const { action: Action, idx, className, mainClassName } = column;
    return (
      <Text
        Tag="td"
        key={index * idx}
        scope="row"
        className={`${tdClassName} ${mainClassName?.(
          item
        )} border-t items-start align-top justify-start px-6`}
        {...(className?.includes("text-ellipsis")
          ? { title: item?.[column?.name]?.toString() }
          : {})}
      >
        <div
          className={`${className} ${
            isMaxHeight ? "h-14 overflow-hidden" : ""
          } min-h-10 gap-2 flex items-center align-top text-txt-primary whitespace-nowrap`}
        >
          {column?.action ? (
            <div className="gap-2 flex w-full">
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
        className={`${bodyClassName} ${item?.trClassName}  
        `}
        onClick={(e) => {
          if (children) {
            setIsLocalOpen(!isLocalOpen);
          }
        }}
      >
        {columns?.map((column: ColumnsType, idx: number) => (
          <Column {...column} idx={idx} key={idx} />
        ))}
      </tr>
    </>
  );
};

export default TableRow;
