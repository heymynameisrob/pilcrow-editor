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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
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

export const TopMenu = () => {
  const { markdown } = useContext(DocContext);
  const { theme, setTheme } = useTheme();

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

  return (
    <Drawer>
      <DropdownMenu>
        {/* Desktop menu */}
        <div className="hidden lg:block">
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
            <DropdownMenuItem
              className="gap-2"
              onSelect={(e) => {
                e.preventDefault();
                handleCopyAsText();
              }}
            >
              <DocIcon />
              <>Copy as Text</>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2"
              onSelect={(e) => {
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
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2"
              onSelect={(e: any) => {
                e.preventDefault();
                handleClearStorage();
              }}
            >
              <TrashIcon />
              <>Clear storage</>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
        {/* Mobile menu */}
        <div className="block lg:hidden">
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
        </div>
      </DropdownMenu>
    </Drawer>
  );
};
