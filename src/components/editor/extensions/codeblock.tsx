"use client";

import { toast } from "sonner";
import { type Editor, NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@/components/icons";
import { useHotkeys } from "react-hotkeys-hook";

export const CodeBlockComponent = ({
  node,
  editor,
}: {
  node: any;
  editor: Editor;
}) => {
  useHotkeys(
    "tab",
    (e) => {
      if (editor.isActive("codeBlock")) {
        const { selection } = editor.view.state;
        const { $anchor } = selection;
        e.preventDefault();
        // indent text
        editor.commands.insertContentAt($anchor.pos, "&#9;");
      }
    },
    {
      enableOnContentEditable: true,
      enabled: editor.isActive("codeBlock"),
    },
  );

  useHotkeys(
    "enter",
    () => {
      // check if codeblock is focused
      if (editor.isActive("codeBlock")) {
        const { selection } = editor.view.state;
        const { $anchor } = selection;
        // indent text
        editor.commands.insertContentAt($anchor.pos, "&#9;");
      }
    },
    {
      enableOnContentEditable: true,
      enabled: editor.isActive("codeBlock"),
    },
  );

  return (
    <NodeViewWrapper className="relative group">
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100"
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(node.textContent);
          toast.success("Copied to clipboard");
        }}
      >
        <CopyIcon />
      </Button>
      <pre className="rounded-lg bg-neutral-800 border border-white/10 font-mono text-sm text-neutral-100">
        <NodeViewContent as="code"  />
      </pre>
    </NodeViewWrapper>
  );
};
