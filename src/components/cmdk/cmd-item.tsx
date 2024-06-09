"use client";

import { ReturnIcon } from "@/components/icons";
import { CommandItem as BaseCommandItem } from "@/components/ui/command";
import { cn } from "@/utils";

export const CommandItem = ({
  children,
  onSelect,
  className,
  ...props
}: any) => {
  return (
    <BaseCommandItem
      className={cn("group flex justify-between items-center gap-3", className)}
      onSelect={onSelect}
      {...props}
    >
      {children}
      <ReturnIcon
        size={15}
        strokeWidth={1.5}
        absoluteStrokeWidth
        className="hidden [[aria-selected=true]_&]:block"
      />
    </BaseCommandItem>
  );
};
