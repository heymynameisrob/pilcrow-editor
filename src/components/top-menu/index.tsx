"use client";

import { useContext } from "react";
import { toast } from "sonner";
import { generateText } from "@tiptap/core";
import { DocContext } from "@/context/doc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import extensions from "@/components/editor/extensions";
import { DocIcon, MoreIcon, TrashIcon } from "@/components/icons";

export const TopMenu = () => {
  const { markdown } = useContext(DocContext);

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
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2"
          onSelect={(e) => {
            e.preventDefault();
            handleClearStorage();
          }}
        >
          <TrashIcon />
          <>Clear storage</>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
