import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React, { PropsWithChildren } from "react";

import { cn } from "@/utils";

type TooltipProps = PropsWithChildren<{
  content: string | React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  align?: "center" | "start" | "end" | undefined;
  className?: string;
}>;

export function Tooltip({
  children,
  content,
  open,
  onOpenChange,
  side = "top",
  align = "center",
  className,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          {...props}
          className={cn(
            "flex items-center z-50 overflow-hidden rounded-lg bg-black text-white px-1.5 py-1 h-7 text-xs font-medium tracking-tight shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
