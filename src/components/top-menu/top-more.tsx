"use client";

/**
 * Top Menu - Stores all the settings and extra options for the user
 * Split into two components that shows dropdown, context-style menu on desktop and drawer for mobile
 * Better UX but look to improve the makeup as we're duplicating a lot of code here
 */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useMediaQuery } from "@/hooks/media-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerSeparator,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Toggle } from "@/components/ui/toggle";
import { MoreIcon } from "@/components/icons";
import { MenuTextOptions } from "@/components/top-menu/menu/menu-text";
import { MenuViewOptions } from "@/components/top-menu/menu/menu-view";
import { MenuDestructiveOptions } from "@/components/top-menu/menu/menu-destructive";
import { MenuTitle } from "@/components/top-menu/menu/menu-title";
import { Button } from "@/components/ui/button";

import { AlertCircleIcon, CheckCircle } from "lucide-react";

export const TopMenuMore = () => {
  const [view, setView] = useState("menu");
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const [elementRef, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (view) {
      case "menu":
        return (
          <>
            <MenuTitle isLargeScreen={isLargeScreen} />
            <MenuViewOptions isLargeScreen={isLargeScreen} />
            {isLargeScreen ? <DropdownMenuSeparator /> : <DrawerSeparator />}
            <MenuTextOptions
              setView={() => setView("copied")}
              isLargeScreen={isLargeScreen}
            />
            {isLargeScreen ? <DropdownMenuSeparator /> : <DrawerSeparator />}
            <MenuDestructiveOptions
              isLargeScreen={isLargeScreen}
              setView={() => setView("delete")}
            />
          </>
        );
      case "delete":
        return (
          <div>
            <div className="px-2">
              <header className="flex flex-col justify-center items-center gap-4 pb-4">
                <div className="w-10 h-10 rounded-full grid place-items-center bg-red-50 dark:bg-white/10">
                  <AlertCircleIcon className="text-red-600" />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <h2 className="text-base font-medium text-primary">
                    Are you sure?
                  </h2>
                  <p className="text-sm text-neutral-700 text-center dark:text-neutral-400">
                    If you remove it, you wont be able to get it back so think
                    carefully bozo.
                  </p>
                </div>
              </header>
              <div className="py-2 flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full rounded-xl"
                  onClick={() => setView("menu")}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full rounded-xl bg-red-500 text-white dark:bg-red-500 dark:text-white"
                  size="sm"
                  onClick={() => setView("menu")}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        );
      case "copied":
        return (
          <div>
            <div className="px-2">
              <header className="flex flex-col justify-center items-center gap-4 pb-4 h-[240px]">
                <div className="w-10 h-10 rounded-full grid place-items-center bg-green-50">
                  <CheckCircle
                    className="text-green-600"
                    onClick={() => setView("menu")}
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <h2 className="text-base font-medium text-primary">Copied</h2>
                </div>
              </header>
            </div>
          </div>
        );
    }
  }, [view, isLargeScreen]);

  if (isLargeScreen) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Toggle
            size="sm"
            title="More"
            aria-label="More"
            data-microtip-position="bottom"
            role="tooltip"
            className="data-[state=open]:bg-black/10 dark:data-[state=open]:bg-white/10 "
          >
            <MoreIcon />
          </Toggle>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">{content}</DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Drawer onOpenChange={() => setView("menu")}>
      <DrawerTrigger asChild>
        <Toggle
          size="sm"
          title="More"
          aria-label="More"
          data-microtip-position="bottom"
          role="tooltip"
          className="data-[state=open]:bg-black/10 dark:data-[state=open]:bg-white/10 "
        >
          <MoreIcon />
        </Toggle>
      </DrawerTrigger>
      <DrawerContent>
        <motion.div animate={{ height: bounds.height }}>
          <div ref={elementRef} className="antialiased">
            <AnimatePresence initial={false} mode="popLayout" custom={view}>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                key={view}
                className="flex flex-col gap-2"
                transition={{
                  duration: 0.2,
                }}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
};
