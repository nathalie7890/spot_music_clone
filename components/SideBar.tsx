"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import Box from "./Box";
import SideBarItem from "./SideBarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SideBarProps {
  children: React.ReactNode;
  songs: Song[];
}

const SideBar: React.FC<SideBarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const player = usePlayer();

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
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && "h-[calc(100%-75px)]"
      )}
    >
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
          <Library songs={songs} />
        </Box>
      </div>
      <main className="flex-1 h-full py-2 oveflow-y-auto">{children}</main>
    </div>
  );
};

export default SideBar;
