"use client";
import React, { useEffect } from "react";
import { ToolbarFormat } from "@/components/editor/toolbar/toolbar-format";
import { ToolbarSeperator } from "@/components/editor/toolbar/toolbar-seperator";
import { ToolbarColor } from "@/components/editor/toolbar/toolbar-color";
import { cn } from "@/utils";
import { isIOS } from "@/utils/flags";

import type { Editor } from "@tiptap/react";
import { ToolbarNotes } from "@/components/editor/toolbar/toolbar-notes";

export const Toolbar = ({
  editor,
  isVisible,
}: {
  editor: Editor | null;
  isVisible: boolean;
}) => {
  const resizeHandler = () => {
    if (!window.visualViewport) return;

    /**
     * #1 - Calculating viewport
     * So iOS is annoying and doesn't fix things to the visualViewport (e.g when the keyboard is open)
     * So we need to calculate this diff whenever that changes (e.g when the keyboard is open)
     * The conditional means that the padding that clears the home indicator is removed
     */

    const vpHeight = window.visualViewport?.height || 0;
    const diff = window.innerHeight - vpHeight;
    document.documentElement.style.setProperty(
      "--diff",
      `${diff - (diff > 0 ? 32 : 0)}px`,
    );
  };

  useEffect(() => {
    resizeHandler(); // First go
    window?.visualViewport?.addEventListener("resize", resizeHandler);

    return () => {
      window?.visualViewport?.removeEventListener("resize", resizeHandler);
    };
  }, []);

  if (!editor) return null;

  return (
    <div
      className={cn(
        "fixed left-0 right-0 mx-auto z-40 flex flex-col items-center bg-none",
        "bottom-0 -translate-y-[var(--diff)] md:translate-y-0 md:bottom-[32px] transition-all ease-out",
        isVisible ? "md:pointer-events-auto" : "md:pointer-events-none",
      )}
    >
      <div
        className={cn(
          "flex flex-row items-center gap-1 justify-start p-0.5 transition-all ease-out",
          "w-full bg-neutral-100 text-neutral-900 border-t border-black/10 dark:border-white/10 dark:bg-neutral-900 dark:text-white rounded-tl-md rounded-tr-md",
          "md:rounded-lg md:justify-between md:w-auto md:border md:bg-neutral-900 md:text-white md:shadow-[0px_0px_0px_0.5px_rgb(0_0_0_/_0.40),_0px_1px_1px_-1px_rgb(0_0_0_/_0.12),_0px_4px_6px_0px_rgb(0_0_0_/_0.05),_0px_10px_16px_0px_rgb(0_0_0_/_0.1),_inset_0px_0.5px_0px_rgb(255_255_255_/_0.06),_inset_0px_0px_1px_0px_rgb(255_255_255_/_0.16),_inset_0px_-6px_12px_-4px_rgb(0_0_0_/_0.16)]",
          isVisible
            ? "md:opacity-100 md:translate-y-0"
            : "md:opacity-0 md:translate-y-3",
          isIOS() && "pb-8",
        )}
      >
        <ToolbarFormat editor={editor} />
        <ToolbarColor editor={editor} />
        <ToolbarSeperator />
        <ToolbarNotes editor={editor} />
      </div>
    </div>
  );
};
