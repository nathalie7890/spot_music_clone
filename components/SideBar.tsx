"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import Box from "./Box";
import SideBarItem from "./SideBarItem";
import Library from "./Library";

interface SideBarProps {
  children: React.ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        activie: pathname === "/search",
        href: "search",
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-full">
      <div className="flex-col hidden h-full bg-black md:flex gap-y-2 w-[300px] p-2">
        <Box>
          <div className="flex flex-col px-5 py-4 gap-y-4">
            {routes.map((item) => (
              <SideBarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library />
        </Box>
      </div>
      <main className="flex-1 h-full py-2 oveflow-y-auto">{children}</main>
    </div>
  );
};

export default SideBar;