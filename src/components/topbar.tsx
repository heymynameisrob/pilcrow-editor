"use client";

import { useContext } from "react";
import { DocContext } from "@/context/doc";
import { Title } from "@/components/title";
import { TopMenu } from "@/components/top-menu";
import { Toggle } from "@/components/ui/toggle";

import { SearchIcon } from "@/components/icons";

export const TopBar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(DocContext);

  return (
    <div className="fixed w-full bg-gradient-to-b from-white to-transparent z-40 top-0 left-0 flex gap-2 flex-row items-center justify-between px-2 py-2 h-14 backdrop-blur-sm dark:from-neutral-950 md:backdrop-blur-none md:absolute md:px-4">
      <div className="flex items-center gap-2">
        <Toggle
          size="sm"
          title="Search • ⌘/"
          aria-label="Search • ⌘/"
          data-microtip-position="bottom-right"
          role="tooltip"
          pressed={isSidebarOpen}
          onPressedChange={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <SearchIcon />
        </Toggle>
        <Title />
      </div>
      <TopMenu />
    </div>
  );
};
