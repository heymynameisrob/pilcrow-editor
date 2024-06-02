"use client";

/**
 * Tiptap Editor - Editor component using Tiptap.
 * Handles the editor state, toolbar, and AI completion.
 */

import { useContext, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "ai/react";
import { useLocalStorage } from "@/hooks/local";
import { DocContext } from "@/context/doc";
import { Toolbar } from "@/components/editor/toolbar";
import { defaultEditorProps } from "@/components/editor/props";
import { Notes } from "@/components/notes";
import { getTitleFromJson } from "@/utils/editor";

// Extensions
import ExtensionList from "@/components/editor/extensions";
import Note from "@/components/editor/extensions/note";

import type { JSONContent } from "@tiptap/react";

export type EditorProps = {
  handleOnSave: (editor: any) => void;
};

export const Editor = () => {
  const [isReady, setIsReady] = useState(false);
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const { setTitle, handleLastSaved, setMarkdown, setcurrentNoteId } =
    useContext(DocContext);

  const [content, setContent] = useLocalStorage<string>("content", "");

  /**
   * #1 - Save the content to local storage
   * Using debounce to limit the number of writes to local storage.
   * Not a huge deal, but it's a good practice to limit writes and we do this on Pilcrow when writing to the database.
   * This logic can easily be modified to write to a database or API.
   */

  const handleOnSave = useDebouncedCallback(async (editor: any) => {
    const content = editor.getJSON() as JSONContent;
    const title = getTitleFromJson(content);

    setContent(JSON.stringify(content));
    setTitle(title);
    handleLastSaved(new Date());

    const markdown = editor.storage.markdown.getMarkdown();
    setMarkdown(markdown);
  }, 750);

  /**
   * #1 – Setup Editor
   * Initialise the Tiptap editor, load in the extensions and existing content (empty string if none).
   * Handle the onUpdate event to save the content to local storage.
   */
  const editor = useEditor({
    extensions: [
      ...ExtensionList,
      Note.configure({
        onNoteActivated: (id: string | null) => {
          if (!id) return;

          setcurrentNoteId(id);
        },
      }),
    ],
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

    editor.commands.setContent(content);

    editor.commands.focus("end");
    editor.setEditable(true);
    setIsReady(true);
  }, [editor, isReady]);

  if (!editor) return null;

  return (
    <>
      <Toolbar editor={editor} isVisible={isToolbarVisible} />
      <Notes editor={editor} />
      <EditorContent editor={editor} className="h-full max-w-2xl mx-auto" />
    </>
  );
};
