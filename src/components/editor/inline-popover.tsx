"use client";

/**
 * Inline popover
 * Using MUI popover component to anchor a popover to whatever node is selected
 * TODO: This component is a little rough and unperformant. Look to refactor or improve.
 */

import React, { ReactNode, useState, useEffect } from "react";
import { Unstable_Popup as Popup } from "@mui/base/Unstable_Popup";
import { Editor, isNodeSelection, posToDOMRect } from "@tiptap/core";

export const InlinePopover = ({
  editor,
  children,
  markType,
}: {
  editor: Editor;
  children: ReactNode;
  markType: string;
}) => {
  const [open, setOpen] = useState(false);

  const hasFocus = editor.view.hasFocus();
  const isActive = editor.isActive(markType);

  useEffect(() => {
    if (!editor || !hasFocus || !isActive) {
      setOpen(false);
    }

    setOpen(isActive);
  }, [editor, isActive, hasFocus]);

  return (
    <Popup
      open={open}
      placement="top"
      className="bg-neutral-100 border border-black/10 flex flex-col p-1 rounded-lg transition-all shadow-md text-neutral-900 dark:bg-neutral-900 dark:border-white/10 dark:text-white"
      // @ts-ignore
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 4],
          },
        },
        {
          name: "flip",
          enabled: true,
          options: {
            /**
             * #1 Position
             * Make sure boundaries are set to the editor element and fallbacks provider so that the portal works properly
             */

            boundary: editor.options.element,
            fallbackPlacements: [
              "bottom",
              "top-start",
              "bottom-start",
              "top-end",
              "bottom-end",
            ],
            padding: 8,
          },
        },
      ]}
      anchor={() => {
        /**
         * #2 - Anchoring borrowed from Tiptap BubbleMenu
         * https://github.com/ueberdosis/tiptap/blob/16bec4e9d0c99feded855b261edb6e0d3f0bad21/packages/extension-bubble-menu/src/bubble-menu-plugin.ts#L183-L193
         */

        const { ranges } = editor.state.selection;
        const from = Math.min(...ranges.map((range: any) => range.$from.pos));
        const to = Math.max(...ranges.map((range: any) => range.$to.pos));

        return {
          getBoundingClientRect: () => {
            if (isNodeSelection(editor.state.selection)) {
              const node = editor.view.nodeDOM(from) as HTMLElement;

              if (node) {
                return node.getBoundingClientRect();
              }
            }

            return posToDOMRect(editor.view, from, to);
          },
        };
      }}
    >
      {children}
    </Popup>
  );
};
