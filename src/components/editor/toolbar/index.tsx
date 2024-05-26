"use client";
import React, { useLayoutEffect } from "react";
import { MotionDiv } from "@/components/ui/motion";
import { ToolbarFormat } from "@/components/editor/toolbar/toolbar-format";
import { ToolbarSeperator } from "@/components/editor/toolbar/toolbar-seperator";
import { ToolbarColor } from "@/components/editor/toolbar/toolbar-color";
import { cn } from "@/utils";

import type { Editor } from "@tiptap/react";
import { easeIn } from "framer-motion";

export const Toolbar = ({
  editor,
  isVisible,
}: {
  editor: Editor | null;
  isVisible: boolean;
}) => {

  useLayoutEffect(() => {
    // calculate visual viewport on mobile
    if (isVisible) {
      const vh = window.visualViewport?.height as number || 0;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }, [isVisible]);

  if (!editor) return null;

  return (
    <div
      className={cn(
        "fixed left-0 right-0 mx-auto z-50 pointer-events-none flex flex-col items-center bg-none",
        "top-[var(--vh)] -translate-y-full md:-translate-y-0 md:top-[initial] md:bottom-[32px]",
        isVisible
          ? "pointer-events-auto"
          : "pointer-events-none",
      )}
    >
      <MotionDiv
        layout
        aria-disabled={isVisible ? "false" : "true"}
        start={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}        
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className={cn(
          "flex flex-row items-center gap-1 justify-start p-0.5 rounded-tl rounded-tr transition-all",
          "w-full bg-neutral-100 text-neutral-900 border-b border-black/10 dark:border-white/10 dark:bg-neutral-900 dark:text-white",
          "md:rounded-lg md:justify-between md:w-auto md:border md:bg-neutral-900 md:text-white md:shadow-[0px_0px_0px_0.5px_rgb(0_0_0_/_0.40),_0px_1px_1px_-1px_rgb(0_0_0_/_0.12),_0px_4px_6px_0px_rgb(0_0_0_/_0.05),_0px_10px_16px_0px_rgb(0_0_0_/_0.1),_inset_0px_0.5px_0px_rgb(255_255_255_/_0.06),_inset_0px_0px_1px_0px_rgb(255_255_255_/_0.16),_inset_0px_-6px_12px_-4px_rgb(0_0_0_/_0.16)]"
        )}
      >
        <ToolbarFormat editor={editor} />
        <ToolbarSeperator />
        <ToolbarColor editor={editor} />
      </MotionDiv>
    </div>
  );
};
