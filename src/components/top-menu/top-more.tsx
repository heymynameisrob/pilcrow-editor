"use client";

/**
 * Top Menu - Stores all the settings and extra options for the user
 * Split into two components that shows dropdown, context-style menu on desktop and drawer for mobile
 * Better UX but look to improve the makeup as we're duplicating a lot of code here
 */

import { useContext } from "react";
import { toast } from "sonner";
import { generateText } from "@tiptap/core";
import { DocContext } from "@/context/doc";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerMenuGroup,
  DrawerMenuItem,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Toggle } from "@/components/ui/toggle";
import extensions from "@/components/editor/extensions";
import {
  DocIcon,
  MoonIcon,
  MoreIcon,
  SunIcon,
  TrashIcon,
} from "@/components/icons";
import { useMediaQuery } from "@/hooks/media-query";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { getTimeFromNow } from "@/utils/time";


export const TopMenuMore = () => {
  const { markdown, title, lastSaved } = useContext(DocContext);
  const { theme, setTheme } = useTheme();
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  const handleClearStorage = () => {
    confirm("Are you sure?") && localStorage.clear();
    window.location.reload();
  };

  const handleCopyAsMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    toast("Copied as Markdown");
  };

  const handleCopyAsText = () => {
    const json = localStorage.getItem("content");

    if (!json) return;

    const text = generateText(JSON.parse(json), [...extensions]);
    navigator.clipboard.writeText(text);
    toast("Copied as text");
  };

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
        <DropdownMenuContent align="end">
          <DropdownMenuGroup className="flex flex-col gap-1">
            <DropdownMenuLabel className="pb-0">
              {title || "Untitled"}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="py-0 text-xs font-normal text-neutral-700 dark:text-neutral-300">
              {getTimeFromNow(lastSaved)}
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2"
            onSelect={(e) => {
              e.preventDefault();
              handleCopyAsMarkdown();
            }}
          >
            <DocIcon />
            <>Copy as Markdown</>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2" onSelect={handleCopyAsText}>
            <DocIcon />
            <>Copy as Text</>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
            onSelect={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
            {theme === "light" ? <>Dark mode</> : <>Light mode</>}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2" onSelect={handleClearStorage}>
            <TrashIcon />
            <>Clear storage</>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Drawer>
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
        <DrawerMenuGroup className="flex flex-col gap-1 px-4">
          <DrawerDescription className="pb-0 font-medium text-neutral-900 dark:text-white">
            {title || "Untitled"}
          </DrawerDescription>
          <DrawerDescription className="py-0 text-xs font-normal text-neutral-700 dark:text-neutral-300">
            {getTimeFromNow(lastSaved)}
          </DrawerDescription>
        </DrawerMenuGroup>
        <DrawerMenuGroup>
          <DrawerMenuItem
            className="gap-2"
            onClick={(e: any) => {
              e.preventDefault();
              handleCopyAsMarkdown();
            }}
          >
            <DocIcon />
            <>Copy as Markdown</>
          </DrawerMenuItem>
          <DrawerMenuItem
            className="gap-2"
            onClick={(e: any) => {
              e.preventDefault();
              handleCopyAsText();
            }}
          >
            <DocIcon />
            <>Copy as Text</>
          </DrawerMenuItem>
          <DrawerMenuItem
            className="gap-2"
            onClick={(e: any) => {
              e.preventDefault();
              if (theme === "light") {
                setTheme("dark");
              } else {
                setTheme("light");
              }
            }}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
            {theme === "light" ? <>Dark mode</> : <>Light mode</>}
          </DrawerMenuItem>
          <DropdownMenuSeparator />
          <DrawerMenuItem
            className="gap-2"
            onClick={(e: any) => {
              e.preventDefault();
              handleClearStorage();
            }}
          >
            <TrashIcon />
            <>Clear storage</>
          </DrawerMenuItem>
        </DrawerMenuGroup>
      </DrawerContent>
    </Drawer>
  );
};
