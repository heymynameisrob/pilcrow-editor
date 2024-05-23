'use client';

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

export const Editor = () => {

  const { setTitle } = useContext(DocContext);

  /**
   * #1 - Save the content to local storage
   * Using debounce to limit the number of writes to local storage.
   * Not a huge deal, but it's a good practice to limit writes and we do this on Pilcrow when writing to the database.
   * This logic can easily be modified to write to a database or API.
   */

  const onSave = useDebouncedCallback(async (content: JSONContent) => {    
  
    localStorage.setItem("content", JSON.stringify(content));  
    
    const title = getTitleFromJson(content);
    setTitle(title);

  }, 750);

  return (
    <TipTap handleOnSave={(content: JSONContent) => onSave(content)} />
  );
}