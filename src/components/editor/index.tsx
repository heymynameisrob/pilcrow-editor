'use client';

import { useContext } from "react";
import { useDebouncedCallback } from "use-debounce";
import { DocContext } from "@/context/doc";
import { TipTap } from "@/components/editor/tiptap";
import { getTitleFromJson } from "@/utils/editor";

import type { JSONContent } from "@tiptap/core";


export const Editor = () => {

  const { setTitle } = useContext(DocContext);

  const onSave = useDebouncedCallback(async (content: JSONContent) => {    

    // Can easily reaplce with save to DB.
    localStorage.setItem("content", JSON.stringify(content));
    console.log("Saved content to local storage", JSON.stringify(content));
    
    const title = getTitleFromJson(content);
    setTitle(title);

  }, 750);

  return (
    <TipTap 
      handleOnSave={(content: JSONContent) => onSave(content)} 
      aiApiRoute=""
      />
  );
}