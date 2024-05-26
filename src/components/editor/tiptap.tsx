"use client";

/**
 * Tiptap Editor - Editor component using Tiptap.
 * Handles the editor state, toolbar, and AI completion.
 */

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { useCompletion } from "ai/react";

import { Toolbar } from "@/components/editor/toolbar";
import { defaultEditorProps } from "@/components/editor/props";
import ExtensionList from "@/components/editor/extensions";

export type EditorProps = {
  handleOnSave: (editor: any) => void;
};

export const TipTap = ({ handleOnSave }: EditorProps) => {
  // TODO: Consider changing these states to reducers
  const [isReady, setIsReady] = useState(false);
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  /**
   * #1 – Setup Editor
   * Initialise the Tiptap editor, load in the extensions and existing content (empty string if none).
   * Handle the onUpdate event to save the content to local storage.
   */
  const editor = useEditor({
    extensions: ExtensionList,
    onUpdate: ({ editor }) => {
      // Prevents infinite loop if content is not ready.
      if (!isReady || !editor) return;

      handleOnSave(editor);
    },
    editorProps: {
      ...defaultEditorProps,
    },
  });

  /**
   * #2 – Manage Toolbar
   * Show toolbar if text node selected or 'alwaysShowToolbar' is true.
   */
  useEffect(() => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to);

    setIsToolbarVisible(text.length > 0);
  }, [editor?.state.selection]);

  /**
   * #3 - Handle AI Completion
   * Using the useCompletion hook to handle the AI completion.
   * Leverage useRef to store each part of the stream.
   * This is triggered from / command list. Matching id means that they talk to each other.
   */
  const prev = useRef("");
  const { completion, isLoading } = useCompletion({
    id: "complete",
    api: "/api/ai/complete",
    onFinish: (completion: any) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: (error: Error) => {
      console.error("Something went wrong.", error.message);
      // TODO: Add VA tracking
    },
  });

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  /**
   * #4 - Render Editor
   * Show the editor content if the editor is ready.
   * Focus cursor at the end of the document.
   */

  useEffect(() => {
    if (!editor || isReady) return;

    const localContent = localStorage.getItem("content");
    if (localContent) {
      editor.commands.setContent(JSON.parse(localContent));
    }

    editor.commands.focus("end");
    editor.setEditable(true);
    setIsReady(true);
  }, [editor, isReady]);

  if (!editor) return null;

  return (
    <>
      <Toolbar editor={editor} isVisible={isToolbarVisible} />
      <EditorContent editor={editor} className="h-full max-w-2xl mx-auto" />
    </>
  );
};
