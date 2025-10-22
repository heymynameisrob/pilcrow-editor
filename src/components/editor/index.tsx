import * as React from "react";
import { EditorProvider, useEditor } from "@tiptap/react";
import { EditorToolbar } from "@/components/editor/toolbar";
import { defaultEditorProps } from "@/components/editor/props";

// Extensions
import ExtensionList from "@/components/editor/extensions";

import type { Editor, Extension, JSONContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import { cn } from "@/utils";

type EditorProps = {
  readOnly: boolean;
  onContentChange: (editor: Editor) => void;
  content?: JSONContent;
  onKeyDown?: (e: KeyboardEvent) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onMount?: (props: Editor) => void;
  placeholder?: string;
};

export function TipTapEditor({
  content,
  readOnly = false,
  onContentChange,
  onKeyDown,
  onBlur,
  onFocus,
  onMount,
  placeholder,
}: EditorProps) {
  const [isReady, setIsReady] = React.useState(false);

  const extensions = React.useMemo(() => {
    let extensions = [...ExtensionList];
    if (placeholder) {
      extensions = extensions.concat([
        Placeholder.configure({
          placeholder:
            typeof placeholder === "string"
              ? ({ editor, node, pos }) => {
                  // Don't show placeholder in table cells
                  // Resolve the parent node from the position
                  const $pos = editor.state.doc.resolve(pos);
                  const parent = $pos.parent;

                  if (
                    parent?.type.name === "tableCell" ||
                    parent?.type.name === "tableHeader"
                  ) {
                    return "";
                  }
                  return placeholder;
                }
              : placeholder,
          includeChildren: true,
        }),
      ]);
    }
    return extensions;
  }, [placeholder]);

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <EditorProvider
      content={content}
      extensions={ExtensionList}
      onCreate={(props) => onMount?.(props.editor)}
      immediatelyRender={true}
      autofocus="start"
      onUpdate={({ editor }) => {
        if (!isReady || !editor) return;

        onContentChange(editor);
      }}
      editorContainerProps={{
        className: cn(
          "flex-1 max-w-none w-full outline-none focus:outline-none",
          "focus:outline-none",
          "prose prose-sm md:prose-base dark:prose-invert",
          "prose-code:before:hidden prose-code:after:hidden",
          "prose-h1:font-semibold prose-h2:font-medium prose-h3:font-medium prose-h4:font-medium prose-h5:font-regular prose-h6:font-regular",
          // Dynamic Metrics - https://d.rsms.me/inter-website/v3/dynmetrics/
          "prose-h1:tracking-[-0.0021em] prose-h2:tracking-[-0.0018em] prose-h3:tracking-[-0.0015em] prose-h4:tracking-[-0.0012em] prose-p:tracking-[-0.0011em]",
          "prose-h2:mb-[0.666em] prose-h3:mb-[0.666em]",
        ),
      }}
      editorProps={{
        handleDOMEvents: {
          keydown: (_view, event) => {
            if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
              // prevent default event listeners from firing when slash command is active
              const slashCommand = document.querySelector("#slash-command");
              if (slashCommand) return true;
            }
          },
        },
      }}
    >
      <EditorToolbar />
    </EditorProvider>
  );
}
