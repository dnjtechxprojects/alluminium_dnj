import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { MenuItemsTypes } from "./menuItems";
import Link from "next/link";
import { Button, Icon, Text } from "@/ui";
import { DRAWER_TRANSITION_DURATION } from "@/lib/constant";
import { useAuth } from "@/context/useAuth";

interface MenuProps extends MenuItemsTypes {
  badge?: number;
  onItemClick?: () => void;  
}

interface NavigateProps extends Pick<MenuItemsTypes, "subItems" | "url"> {
  className?: string;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  badge?: number;
  onItemClick?: () => void;  
}

const Navigate = (props: NavigateProps) => {
  const {
    className = "",
    url,
    subItems,
    children,
    onClick,
    badge = 1,
    onItemClick,
  } = props;

  const { isDrawerVisible } = useAuth();

  return (
    <div>
      {subItems ? (
        <Button
          className={`${className} ${
            isDrawerVisible ? "" : "justify-center"
          } items-center cursor-pointer w-full flex`}
          onClick={onClick}
        >
          {children}
        </Button>
      ) : (
        <Link
          href={url}
          onClick={onItemClick} 
          className={`${className} ${
            isDrawerVisible ? "" : "justify-center"
          } items-center cursor-pointer w-full flex`}
        >
          {children}
        </Link>
      )}
    </div>
  );
};

const Menu = (props: MenuProps) => {
  const { url, subItems, icon, title, badge = 1, onItemClick } = props;

  const pathname = usePathname();
  const { isDrawerVisible } = useAuth();
  const pathnames = pathname.split("/");
  const newUrl = url?.split("/")?.[1];

  const [isExtended, setIsExtended] = useState<boolean>(false);

  const subIds = subItems?.map((item: MenuItemsTypes) => newUrl);

  const current = !!(
    pathnames[1] === newUrl ||
    isExtended ||
    subIds?.includes(pathnames[1])
  );

  return (
    <>
      <Navigate
        className={`${badge === 2 ? "pl-4" : ""}`}
        url={url}
        subItems={subItems}
        onItemClick={onItemClick}
        onClick={() => {
          setIsExtended(!isExtended);

          
          if (!subItems) {
            onItemClick?.();
          }
        }}
      >
        <div
          className={`flex gap-2 w-full ${
            isDrawerVisible ? "" : "pl-2"
          } ${DRAWER_TRANSITION_DURATION} ${
            current ? "bg-gray-300" : "hover:!bg-gray-200"
          } rounded-xl px-4 items-center py-3 group ${
            badge === 2 ? "border-l pl-2" : ""
          }`}
        >
          <Icon
            name={icon}
            strokeWidth={current ? 2 : 1}
            className="!p-0 hover:!bg-transparent"
            iconClassName={`${
              current ? "stroke-gray-700 scale-110" : "stroke-gray-700"
            } group-hover:!stroke-gray-700`}
          />

          <Text
            className={`${
              isDrawerVisible ? "" : "opacity-0"
            } ${DRAWER_TRANSITION_DURATION} text-sm text-black ${
              current ? "font-bold" : ""
            }`}
          >
            {title}
          </Text>

          {subItems && isDrawerVisible ? (
            <Icon
              className="!p-0 hover:!bg-transparent"
              name={current ? "Up" : "Down"}
              iconClassName={`${
                current ? "stroke-secondary-400 scale-110" : "stroke-white"
              } group-hover:!stroke-secondary-400`}
            />
          ) : null}
        </div>
      </Navigate>

    
      {subItems?.length && current
        ? subItems.map((subItem: MenuItemsTypes, index: number) => {
            return (
              <Fragment key={index}>
                <Menu
                  {...subItem}
                  badge={2}
                  onItemClick={onItemClick} 
                />
              </Fragment>
            );
          })
        : null}
    </>
  );
};

export default Menu;
