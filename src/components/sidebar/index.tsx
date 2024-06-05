"use client";

import { useContext, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useHotkeys } from "react-hotkeys-hook";
import { DocContext } from "@/context/doc";
import { cn } from "@/utils";
import { SidebarCommandList } from "@/components/sidebar/sidebar-command";

export const Sidebar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(DocContext);

  /**
   * #1 - Manage key events for Sidebar control
   */
  useHotkeys(
    "Mod+/",
    () => {
      setIsSidebarOpen(!isSidebarOpen);
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
    },
  );
  useHotkeys(
    "esc",
    () => {
      setIsSidebarOpen(false);
    },
    {
      enabled: isSidebarOpen,
    },
  );

  /**
   * #2 - Handle the click event outside this element
   */
  useOnClickOutside(ref, () => {
    setIsSidebarOpen(false);
  });

  return (
    <aside
      ref={ref}
      className={cn(
        "fixed top-0 bottom-0 left-0 w-60 h-screen z-50 bg-neutral-100 border-r border-black/10 shadow-xl dark:border-white/10 dark:bg-neutral-900",
        "flex flex-col gap-3",
        "transition-all duration-150 ease-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <SidebarCommandList />
    </aside>
  );
};
