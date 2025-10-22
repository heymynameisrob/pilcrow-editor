import * as React from "react";
import { ToolbarFormat } from "@/components/editor/toolbar/toolbar-format";
import { ToolbarSeperator } from "@/components/editor/toolbar/toolbar-seperator";
import { ToolbarColor } from "@/components/editor/toolbar/toolbar-color";
import { cn } from "@/utils";
import { isIOS } from "@/utils/flags";

import { useCurrentEditor, useEditor, type Editor } from "@tiptap/react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

export function EditorToolbar() {
  const { editor } = useCurrentEditor();
  const [isTextSelected, setIsTextSelected] = React.useState(false);

  // Listen to selection changes
  React.useEffect(() => {
    if (!editor) return;

    const updateSelection = () => {
      const { from, to, empty } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to);
      const isFocused = editor.view.hasFocus();
      // Selection must have text AND not be empty AND editor must be focused
      const shouldShow = !empty && text.length > 0 && isFocused;
      setIsTextSelected(shouldShow);
    };

    // Initial check
    updateSelection();

    // Listen to selection updates and transactions
    editor.on("selectionUpdate", updateSelection);
    editor.on("transaction", updateSelection);
    editor.on("focus", updateSelection);
    editor.on("blur", updateSelection);

    return () => {
      editor.off("selectionUpdate", updateSelection);
      editor.off("transaction", updateSelection);
      editor.off("focus", updateSelection);
      editor.off("blur", updateSelection);
    };
  }, [editor]);

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

  React.useEffect(() => {
    resizeHandler(); // First go
    window?.visualViewport?.addEventListener("resize", resizeHandler);

    return () => {
      window?.visualViewport?.removeEventListener("resize", resizeHandler);
    };
  }, []);

  if (!editor) return null;

  return (
    <DropdownMenu>
      <div className="fixed bottom-0 inset-x-0 pointer-events-none grid place-items-center py-0">
        <AnimatePresence>
          {isTextSelected && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(2px)" }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 0.3,
              }}
              className={cn(
                "flex items-center gap-1 justify-start p-0.5 rounded-lg border border-black/10 shadow my-8 pointer-events-auto bg-gray-3",
              )}
            >
              <ToolbarFormat editor={editor} />
              <ToolbarColor editor={editor} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DropdownMenu>
  );
}
