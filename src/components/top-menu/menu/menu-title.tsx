"use client";

import { useContext } from "react";
import { DocContext } from "@/context/doc";
import {
  DrawerDescription,
  DrawerMenuGroup,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { getTimeFromNow } from "@/utils/time";

export const MenuTitle = ({
  isLargeScreen = true,
}: {
  isLargeScreen: boolean;
}) => {
  const { title, lastSaved } = useContext(DocContext);

  if (!isLargeScreen)
    return (
      <DrawerMenuGroup className="flex flex-col gap-1 px-4 pb-2">
        <DrawerTitle className="!pb-0 text-neutral-900 dark:text-white">
          {title || "Untitled"}
        </DrawerTitle>
        <DrawerDescription className="py-0 text-xs font-normal text-neutral-700 dark:text-neutral-300">
          {getTimeFromNow(lastSaved)}
        </DrawerDescription>
      </DrawerMenuGroup>
    );

  return (
    <DropdownMenuGroup className="flex flex-col gap-1 pb-2">
      <DropdownMenuLabel className="pb-0">
        {title || "Untitled"}
      </DropdownMenuLabel>
      <DropdownMenuLabel className="py-0 text-xs font-normal text-neutral-400">
        {getTimeFromNow(lastSaved)}
      </DropdownMenuLabel>
    </DropdownMenuGroup>
  );
};
