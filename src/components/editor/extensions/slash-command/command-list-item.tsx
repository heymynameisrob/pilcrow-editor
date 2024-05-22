"use client";
import React from "react";
import { LoaderIcon, ReturnIcon } from "@/components/icons";
import { CommandItemProps } from "@/components/editor/extensions/slash-command/suggestions";
import { cn } from "@/utils";

/* eslint-disable no-unused-vars */
type CommandListItemProps = {
  item: CommandItemProps;
  index: number;
  selectedIndex: number;
  isLoading: boolean;
  onSelect: (index: number) => void;
};
/* eslint-disable no-unused-vars */

export const CommandListItem = ({
  item,
  index,
  selectedIndex,
  isLoading,
  onSelect,
}: CommandListItemProps) => {
  return (
    <button
      className={cn(
        "flex flex-row w-full justify-between items-center gap-4 rounded-md px-2 py-1 text-left text-sm text-white hover:bg-white/10 hover:shadow-[inset_0px_1px_0px_hsla(0_,0%_,100%_,.02)_,inset_0px_0px_0px_1px_hsla(0_,0%_,100%_,.02)_,0px_1px_2px_rgba(0_,0_,0_,.12)_,0px_2px_4px_rgba(0_,0_,0_,.08)_,0px_0px_0px_0.5px_rgba(0_,0_,0_,.24)]",
        index === selectedIndex
          ? "bg-white/10 shadow-[inset_0px_1px_0px_hsla(0_,0%_,100%_,.02)_,inset_0px_0px_0px_1px_hsla(0_,0%_,100%_,.02)_,0px_1px_2px_rgba(0_,0_,0_,.12)_,0px_2px_4px_rgba(0_,0_,0_,.08)_,0px_0px_0px_0.5px_rgba(0_,0_,0_,.24)]"
          : "",
      )}
      key={item.id}
      onClick={() => onSelect(index)}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20">
          {item.title === "Continue writing" && isLoading ? (
            <LoaderIcon size={15} className="animate-spin" />
          ) : (
            item.icon
          )}
        </div>
        <div className="flex flex-col">
          <small className="font-medium">{item.title}</small>
          <small className="text-xs text-white/70">{item.description}</small>
        </div>
      </div>
      {index === selectedIndex && (
        <ReturnIcon size={15} strokeWidth={1} absoluteStrokeWidth />
      )}
    </button>
  );
};
