"use client";
import React, { useEffect, useLayoutEffect } from "react";
import { MotionDiv } from "@/components/ui/motion";
import { ToolbarFormat } from "@/components/editor/toolbar/toolbar-format";
import { ToolbarSeperator } from "@/components/editor/toolbar/toolbar-seperator";
import { ToolbarColor } from "@/components/editor/toolbar/toolbar-color";
import { cn } from "@/utils";

import type { Editor } from "@tiptap/react";

export const Toolbar = ({
  editor,
  isVisible,
}: {
  editor: Editor | null;
  isVisible: boolean;
}) => {

  const resizeHandler = () => {
    const vpHeight = window.visualViewport?.height || 0;
    const diff = window.innerHeight - vpHeight;
    document.documentElement.style.setProperty("--diff", `${diff}px`);    
  }

  useEffect(() => {
    resizeHandler();
    window?.visualViewport?.addEventListener("resize", resizeHandler);

    return () => {
      window?.visualViewport?.removeEventListener("resize", resizeHandler);
    }    
  }, []);

  if (!editor) return null;

  return (
    <div
      className={cn(
        "fixed left-0 right-0 mx-auto z-50 flex flex-col items-center bg-none",
        "bottom-0 -translate-y-[var(--diff)] md:translate-y-0 md:bottom-[32px] transition-all ease-out",
        isVisible ? "md:pointer-events-auto" : "md:pointer-events-none",
      )}
    >
      <div
        className={cn(
          "flex flex-row items-center gap-1 justify-start p-0.5 transition-all ease-out",
          "w-full bg-neutral-100 text-neutral-900 border-t border-black/10 dark:border-white/10 dark:bg-neutral-900 dark:text-white",
          "md:rounded-lg md:justify-between md:w-auto md:border md:bg-neutral-900 md:text-white md:shadow-[0px_0px_0px_0.5px_rgb(0_0_0_/_0.40),_0px_1px_1px_-1px_rgb(0_0_0_/_0.12),_0px_4px_6px_0px_rgb(0_0_0_/_0.05),_0px_10px_16px_0px_rgb(0_0_0_/_0.1),_inset_0px_0.5px_0px_rgb(255_255_255_/_0.06),_inset_0px_0px_1px_0px_rgb(255_255_255_/_0.16),_inset_0px_-6px_12px_-4px_rgb(0_0_0_/_0.16)]",
          isVisible ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-3",
        )}
      >
        <ToolbarFormat editor={editor} />
        <ToolbarSeperator />
        <ToolbarColor editor={editor} />
      </div>
    </div>
  );
};
