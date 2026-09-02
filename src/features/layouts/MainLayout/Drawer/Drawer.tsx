"use client";
import { Fragment, memo } from "react";
import Link from "next/link";
import { Icon, Text } from "@/ui";
import { menuItems, MenuItemsTypes } from "./menuItems";
import Menu from "./Menu";
import { useAuth } from "@/context/useAuth";
import { DRAWER_TRANSITION_DURATION } from "@/lib/constant";

const Drawer = () => {
  const { isDrawerVisible, setIsDrawerVisible } = useAuth();

  const handleMenuClick = () => {
    setIsDrawerVisible(false);
  };

  return (
    <>
      
      <div className="md:hidden fixed top-4 left-4 z-50">
        {!isDrawerVisible && (
          <button
            onClick={() => setIsDrawerVisible((prev) => !prev)}
            className="w-12 h-12 bg-[#eaffea] border border-green-500 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <Icon name="MenuOpen" size={26} iconClassName="!stroke-gray-700" />
          </button>
        )}
      </div>

      <div
        className={`z-40 max-md:fixed m-4 mr-0! bg-black/50 rounded-3xl border border-gray-400 max-md:top-0 max-md:bottom-0 max-md:shadow-xl flex-shrink-0 overflow-x-hidden ${DRAWER_TRANSITION_DURATION} 
        ${isDrawerVisible ? "w-[260px]" : "w-[65px]"}
        h-[calc(100vh-32px)]
        ${!isDrawerVisible && "max-md:hidden"} 
        `}
      >
        <div className="h-full w-[260px] transition-all">
          <div className="flex flex-col min-h-0 h-full">
            <div className="relative h-full w-full flex-1 ">
              <nav className="h-full w-full flex flex-col bg-[#eaffea]">
                
               
                <div className="px-3 flex items-center gap-3 h-[60px] bg-white border-b border-gray-400 justify-between">
                  
                  <div
                    tabIndex={0}
                    className={`${isDrawerVisible ? "" : "hidden"} ${DRAWER_TRANSITION_DURATION} sticky font-bold top-0 z-21`}
                  >
                    <Link
                      href="/"
                      onClick={handleMenuClick}
                      className="group w-full flex items-center gap-2.5 rounded-md h-10"
                    >
                      <Icon name="Logo" size={30} className="p-0! bg-transparent!" />
                      <Text Tag="p" className="grow text-black">
                        Aluminium
                      </Text>
                    </Link>
                  </div>

                  <div onClick={() => setIsDrawerVisible((prev) => !prev)}>
                    <Icon
                      className="hover:bg-transparent!"
                      name={isDrawerVisible ? "MenuClose" : "MenuOpen"}
                      iconClassName="!stroke-gray-700"
                    />
                  </div>
                </div>

                <div className={`px-3 py-5 relative flex flex-col flex-1 bg-white transition-opacity justify-between ${DRAWER_TRANSITION_DURATION} overflow-y-auto`}>
                  <div>
                    <div className="flex flex-col space-y-4">
                      {menuItems.map((item: MenuItemsTypes, index: number) => (
                        <Fragment key={index}>
                         
                          <Menu {...item} onItemClick={handleMenuClick} />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>

              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Drawer);
