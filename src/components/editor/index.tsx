"use client";

/**
 * Editor - Wrapper around <TipTap /> which handles side-effects and events.
 * Keeps things clean on the actual editor as they start to grow in complexity.
 */

import { useContext } from "react";
import { useDebouncedCallback } from "use-debounce";
import { DocContext } from "@/context/doc";
import { TipTap } from "@/components/editor/tiptap";
import { getTitleFromJson } from "@/utils/editor";

import type { JSONContent } from "@tiptap/core";
import { Editor as EditorType } from "@tiptap/react";

export const Editor = () => {
  const { setTitle, handleLastSaved, setMarkdown } = useContext(DocContext);

  /**
   * #1 - Save the content to local storage
   * Using debounce to limit the number of writes to local storage.
   * Not a huge deal, but it's a good practice to limit writes and we do this on Pilcrow when writing to the database.
   * This logic can easily be modified to write to a database or API.
   */

  const onSave = useDebouncedCallback(async (editor: EditorType) => {
    const content = editor.getJSON() as JSONContent;
    const title = getTitleFromJson(content);

    localStorage.setItem("content", JSON.stringify(content));
    setTitle(title);
    handleLastSaved(new Date());

    const markdown = editor.storage.markdown.getMarkdown();
    setMarkdown(markdown);
  }, 750);

  return <TipTap handleOnSave={(editor: EditorType) => onSave(editor)} />;
};
