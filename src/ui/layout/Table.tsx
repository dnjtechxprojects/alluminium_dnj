"use client";
import React, { Fragment } from "react";

// UI IMPORT
import { Icon } from "../icons";

// PROJECT IMPORT
import TableRow from "./TableRow";
import { Text } from "../typography";

export type TableFormType = "Input" | "Toggle";
export interface ColumnsType {
  name: string;
  title: string;
  action?: any;
  headAction?: any;
  sortable?: boolean;
  form?: TableFormType;
  sort?: TableSortingTypes;
  sortValueType?: TableSortingValueTypes;
  fixed?: number;
  type?: string;
  className?: string;
  mainClassName?: (e?: any) => void;
}

export type TableSortingTypes = "asc" | "desc";
export type TableSortingValueTypes = "string" | "number";

interface TableProps {
  className?: string;
  tdClassName?: string;
  tbodyClassName?: string;
  tableClassName?: string;
  isLoading?: boolean;
  columns: ColumnsType[];
  isMaxHeight?: boolean;
  items: any[];
  headerClassName?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
  count?: number;
  page_size?: number;
  page?: number;
  onPageChange?: (page: number) => void;
}

const Table = (props: TableProps) => {
  const {
    className = "",
    tdClassName = "",
    tableClassName = "",
    tbodyClassName = "",
    bodyClassName = "",
    isLoading,
    columns,
    isMaxHeight = false,
    items = [],
    children,
    count = 0,
    page_size = 10,
    page = 1,
    onPageChange,
  } = props;

  let showPages = 3;
  let totalPages = Math.ceil(count / page_size);
  let startPage = Math.round(page - showPages / 2);
  let endPage = Math.round(page + showPages / 2) - 1;

  if (startPage < 1) {
    const diff = Math.abs(startPage - 1);

    startPage += diff;
    endPage += diff;
  }

  if (endPage > totalPages) {
    const diff = endPage - totalPages;
    startPage -= diff;
    endPage -= diff;
  }

  let pages: any[] = [];

  Array.from({ length: endPage - startPage + 1 })?.forEach((item, index) => {
    let value = startPage + index;

    if (value > totalPages || value < 1) {
      return;
    }

    pages.push(value);
  });

  return (
    <>
      <div className="relative  bg-white rounded-lg">
        <div
          className={`${className} relative overflow-y-auto rounded-lg border border-primary-100 h-[70vh]`}
        >
          {isLoading ? (
            <div className="absolute flex items-center justify-center w-full h-full  overflow-y-hidden">
              <Icon name="Loader" size={50} />
            </div>
          ) : null}
          <table
            className={`${tableClassName} ${items?.length ? "" : "h-full"
              } w-full text-left pb-[50px]`}
          >
            <thead
              className={`select-none bg-primary-500 z-[2] items-center sticky top-0 text-white rounded-md`}
            >
              <tr>
                {columns?.map((val: ColumnsType, index: number) => {
                  const { headAction: HeadAction } = val;
                  return (
                    <Fragment key={index}>
                      <Text
                        Tag="th"
                        scope="col"
                        className={`${tdClassName} px-6 py-1.5 items-center`}
                      >
                        <div className="flex gap-3 items-center">
                          <Text
                            Tag="span"
                            className="whitespace-nowrap text-sm"
                          >
                            {val?.headAction ? (
                              <div className="gap-2 flex w-full">
                                <HeadAction {...val} index={index} />
                              </div>
                            ) : (
                              val?.title
                            )}
                          </Text>
                        </div>
                      </Text>
                    </Fragment>
                  );
                })}
              </tr>
            </thead>
            <tbody className={`${tbodyClassName} w-full`}>
              {!isLoading && !items?.length ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="flex items-center justify-center h-[400px] text-lg text-gray-400">
                      Data not found
                    </div>
                  </td>
                </tr>
              ) : children ? (
                children
              ) : (
                <>
                  {items?.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <TableRow
                          tdClassName={`${tdClassName} ${items?.length - 1 === index ? "!border-b-0" : ""
                            }`}
                          isMaxHeight={isMaxHeight}
                          columns={columns}
                          item={item}
                          index={index}
                          bodyClassName={bodyClassName}
                        ></TableRow>
                      </Fragment>
                    );
                  })}
                  {count && !isLoading ? <tr className="h-[70px]"></tr> : null}
                </>
              )}
            </tbody>
          </table>
        </div>
        {count && !isLoading ? (
          <>
            <div className="rounded-b-md shadow-md w-full border border-primary-100 bottom-0 h-[70px] gap-3 max-md:gap-1 bg-white flex items-center justify-center">
              <span
                className={`${page <= 1 ? "opacity-25" : "!cursor-pointer"
                  } text-sm flex gap-2 items-center font-medium hover:bg-gray-100 rounded-md p-3`}
                onClick={() => {
                  if (page > 1) {
                    onPageChange?.(page - 1);
                  }
                }}
              >
                <Icon
                  name="Down"
                  className="!bg-transparent !p-0"
                  iconClassName="stroke-2 rotate-90"
                />
                Previous
              </span>
              <div className="flex items-center gap-2 max-md:gap-1">
                {pages?.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <span
                        className={`${page === item ? "border" : ""
                          } border-gray-500 h-10 w-10 rounded-md flex items-center justify-center hover:bg-gray-100 cursor-pointer text-sm`}
                        onClick={() => {
                          // if (page !== item) {
                          onPageChange?.(item);
                          // }
                        }}
                      >
                        {item}
                      </span>
                    </Fragment>
                  );
                })}
              </div>
              <span
                className={`${page >= totalPages ? "opacity-25" : "!cursor-pointer"
                  } text-sm flex gap-2 items-center font-medium cursor-pointer hover:bg-gray-100 rounded-md p-3`}
                onClick={() => {
                  if (page < totalPages) {
                    onPageChange?.(page + 1);
                  }
                }}
              >
                Next
                <Icon
                  name="Down"
                  className="!bg-transparent !p-0"
                  iconClassName=" stroke-2 -rotate-90"
                />
              </span>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Table;
