"use client";
import { PropsWithChildren, useState } from "react";
import { useRouter } from "next/navigation";

// UI IMPORT
import { Button } from "@/ui";
import { Icon, IconKey } from "@/ui/icons";
import Text from "@/ui/typography/Text";
import Input from "@/ui/forms/Input";

// PROJECT IMPORT
// import { ExportPDF, exportPdf } from "@/helperFunctions";

// THIRD - PARTY IMPORT
// import { CSVLink } from "react-csv";

interface Buttons {
  className?: string;
  icon?: IconKey;
  title?: string;
  rightIcon?: IconKey;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

interface HeadProps extends PropsWithChildren<{}> {
  className?: string;
  bodyClassName?: string;
  deleteText?: string;
  filterOpen?: boolean;
  backIcon?: boolean;
  search?: string;
  title?: string;
  doneText?: string;
  isLoading?: boolean;
  buttons?: Buttons[];
  rightButtons?: Buttons[];
  message?: string;
  onHide?: (e?: React.MouseEvent<HTMLElement>) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Head = (props: HeadProps) => {
  const {
    className = "",
    bodyClassName = "",
    deleteText = "Delete",
    children,
    backIcon,
    search = "",
    filterOpen,
    title = "Search",
    doneText = "Search",
    isLoading = false,
    buttons = [],
    rightButtons = [],
    message,
    onChange,
    onHide,
    handleSubmit,
  } = props;

  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const onHidePopup = (e?: React.MouseEvent<HTMLElement>) => {
    setIsFilterOpen(false);
    onHide?.(e);
  };

  return (
    <div className={`${className} space-y-5`}>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {backIcon ? (
            <Button
              onClick={() => router.back()}
              iconProps={{
                name: "Back",
              }}
            />
          ) : null}
          {buttons?.map((button) => {
            const { title, ...rest } = button;
            return (
              <>
                <Button {...rest}>{title}</Button>
              </>
            );
          })}
        </div>
        <div className="flex gap-2">
          {onChange ? (
            <Input
              className="min-w-[230px]"
              name="test"
              rightIcon="Search"
              placeholder="Search"
              value={search}
              errors={{ test: { message } }}
              messageType="Error"
              onChange={onChange}
            />
          ) : null}
          {rightButtons?.map((button) => {
            const { title, ...rest } = button;
            return (
              <>
                <Button {...rest}>{title}</Button>
              </>
            );
          })}
          {children && !filterOpen ? (
            <Button
              className="!h-fit"
              iconProps={{
                name: "Filter",
                iconClassName:"stroke-white",
              }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Filters
            </Button>
          ) : null}
        </div>
      </div>
      <form
        className={`z-[1] relative rounded-md drop-shadow-2xl bg-white border border-bb ${
          isFilterOpen || filterOpen ? "" : "hidden"
        }`}
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between font-bold items-center py-4 px-4 dark:bg-primary-800">
          <Text className="dark:!text-white">{title}</Text>
          {!filterOpen ? (
            <Icon
              name="CloseBox"
              iconClassName="!stroke-gray-400"
              onClick={onHidePopup}
            />
          ) : null}
        </div>
        <div
          className={`${bodyClassName} px-4 py-4 gap-y-6 gap-x-4 border-t border-b-2 border-bb grid grid-cols-3 tmd:grid-cols-1 tsm:grid-cols-1`}
        >
          {children}
        </div>
        <div className="flex gap-3 px-4 py-2 justify-end rounded-b-md">
          <Button type="button" onClick={onHidePopup}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {doneText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Head;
