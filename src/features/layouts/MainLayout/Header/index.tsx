"use client";
import { memo, useState } from "react";
import { Icon, Text } from "@/ui";
import LogoutModal from "@/features/auth/LogoutModal";
import { TITLE } from "@/lib/constant";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [isLogout, setIsLogout] = useState(false);

  return (
    <>
      <div
        className={`${className} sticky top-0 h-[60px] w-full flex items-center justify-between z-[50] font-semibold 
           border-white/20 transition-all  backdrop-blur-md bg-white/10 rounded-s-[30px] max-md:z-0`}
      >
        <div className="absolute start-1/2 -translate-x-1/2">
          <div className="flex text-secondaryText items-center gap-1">
            <Text className="font-semibold">{TITLE}</Text>
          </div>
        </div>

        <div className="flex items-center gap-0 overflow-hidden w-full">
          <div className="flex w-full items-center gap-2 py-2 rounded-[10px]">
            {/* <Icon
              className="rounded-[10px] md:hidden"
              name="MenuOpen"
              strokeWidth={10}
              size={22}
              onClick={() => dispatch(toggleDrawer(true))}
            /> */}
          </div>

          <div className="flex items-center p-4">
            <div
              className="hover:bg-gray-50 border flex rounded-full"
              onClick={() => setIsLogout(true)}
            >
              <Icon
                name="LogOut"
                iconClassName="stroke-2"
                className="hover:!bg-transparent"
              />
            </div>
          </div>
        </div>

      </div>
        <LogoutModal
          visible={isLogout}
          onHide={() => setIsLogout(false)}
        />
    </>
  );
};

export default memo(Header);
