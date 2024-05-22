"use client";
import React from "react";
import { cn } from "@/utils";

import type { Editor } from "@tiptap/react";
import { MotionDiv } from "@/components/ui/motion";

export const Toolbar = ({
  editor,
  isVisible,
}: {
  editor: Editor | null;
  isVisible: boolean;
}) => {

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.15 },
    },
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.9,
      transition: { duration: 0.15 },
    },
  };

  return (
    <div
      className={cn(
        "fixed bottom-[64px] left-0 right-0 mx-auto z-50 pointer-events-none flex flex-col items-center bg-none",
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <MotionDiv
        aria-disabled={isVisible ? "false" : "true"}
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
        transition={{ type: "tween" }}
        className="dark relative translate-y-[10%] scale-90 bg-black border border-white/10 inline-flex flex-row items-center gap-1 justify-between py-0.5 px-1 rounded-full transition-all shadow-[0px_0px_0px_0.5px_rgb(0_0_0_/_0.40),_0px_1px_1px_-1px_rgb(0_0_0_/_0.12),_0px_4px_6px_0px_rgb(0_0_0_/_0.05),_0px_10px_16px_0px_rgb(0_0_0_/_0.1),_inset_0px_0.5px_0px_rgb(255_255_255_/_0.06),_inset_0px_0px_1px_0px_rgb(255_255_255_/_0.16),_inset_0px_-6px_12px_-4px_rgb(0_0_0_/_0.16)] before:pointer-events-none dark:before:bg-gradient-to-b before:from-white/[0.04] before:absolute before:inset-0 before:z-[1] before:rounded-full"
      >
        <small>Toolbar</small>
      </MotionDiv>
    </div>
  );
};
