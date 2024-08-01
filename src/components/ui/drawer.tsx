"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/utils";
import { isIOS } from "@/utils/flags";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay className="h-screen" />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-2 bottom-2 z-50 mt-24 flex h-auto flex-col gap-4 rounded-[20px] overflow-hidden bg-white dark:border-white/10 dark:bg-neutral-900",
        isIOS() && "mb-4", // Clears home indicator
        className,
      )}
      {...props}
    >
      <div className="mx-auto my-2 h-1 w-16 rounded-full bg-black/10 dark:bg-white/10" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "!text-lg !leading-none font-medium tracking-tight",
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn(
      "!text-base text-neutral-500 dark:text-neutral-400",
      className,
    )}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

const DrawerMenuGroup = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex select-none flex-col gap-2 px-2 outline-none",
      className,
    )}
  >
    {children}
  </div>
);

const DrawerMenuItem = (props: any) => (
  <button
    {...props}
    className={cn(
      "group flex h-[44px] w-full items-center gap-3 rounded-xl bg-neutral-50 px-4 text-base text-neutral-900 dark:text-white dark:bg-white/5 transition-transform active:scale-95",
      props.className,
    )}
  >
    {props.children}
  </button>
);

const DrawerSeparator = (props: any) => (
  <div className="px-4">
    <div
      className={cn("h-px bg-transparent dark:bg-black", props.className)}
      {...props}
    />
    <div
      className={cn("h-px bg-black/5 dark:bg-white/5", props.className)}
      {...props}
    />
  </div>
);
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerMenuGroup,
  DrawerMenuItem,
  DrawerSeparator,
};
