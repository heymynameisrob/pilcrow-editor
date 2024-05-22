'use client';

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { TipTap } from "@/components/editor/tiptap";

import type { JSONContent } from "@tiptap/core";


export const Editor = () => {

  const onSave = useDebouncedCallback(async (content: JSONContent) => {    

    // Can easily reaplce with save to DB.
    localStorage.setItem("content", JSON.stringify(content));
    console.log("Saved content to local storage", JSON.stringify(content));
  }, 750);

  return (
    <TipTap 
      handleOnSave={(content: JSONContent) => onSave(content)} 
      aiApiRoute=""
      />
  );
}