"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/utils";
import { EDITOR_COLOR_CLASSES } from "@/lib/constants";

import type { Editor } from "@tiptap/react";

export const ToolbarColor = ({ editor }: { editor: Editor }) => {
  const [color, setColor] = useState<string>(EDITOR_COLOR_CLASSES[0].color);

  const handleSetColor = (color: string) => {
    if (color === "default") {
      editor.chain().focus().unsetColor().run();
      setColor("default");
      return;
    }

    editor.chain().focus().setColor(color).run();
    setColor(color);
  };

  /**
   * Sets color in dropdown menu if node has color
   * Updates on editor change
   */
  useEffect(() => {
    if (editor.isActive("textStyle")) {
      const colorClass = editor.getAttributes("textStyle").color;

      setColor(colorClass || "default");
    }
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toggle
          variant="black"
          size="sm"
          title="Color"
          aria-label="Color"
          data-microtip-position="top"
          role="tooltip"
          className="5ap-2 data-[state=darkn]:bg-white/10"
        >
          <small className="font-medium">A</small>
          <ChevronDownIcon className="text-white" />
        </Toggle>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className=" max-h-[240px] overflow-y-auto"
      >
        <DropdownMenuRadioGroup value={color} onValueChange={handleSetColor}>
          <>
            {EDITOR_COLOR_CLASSES.map((color: any) => (
              <DropdownMenuRadioItem value={color.color} key={color.name}>
                <div className="flex justify-center items-center gap-2">
                  <div
                    className={cn(
                      "w-5 h-5 flex flex-col items-center rounded text-dark bg-ui-high",
                      color.color,
                    )}
                  >
                    A
                  </div>
                  <small className="capitalize">{color.name}</small>
                </div>
              </DropdownMenuRadioItem>
            ))}
            <DropdownMenuSeparator />
            {EDITOR_COLOR_CLASSES.map((color: any) => (
              <DropdownMenuRadioItem value={color.background} key={color.name}>
                <div className="flex justify-center items-center gap-2">
                  <div
                    className={cn(
                      "w-5 h-5 flex flex-col items-center rounded text-sm text-white",
                      color.background,
                    )}
                  >
                    A
                  </div>
                  <small className="capitalize">{color.name}</small>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
