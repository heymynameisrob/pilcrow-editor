"use client";
import { useLocalStorage } from "@/hooks/local";
import { Note } from "@/utils/types";
import React, { createContext, useEffect, useState } from "react";

export const DocContext = createContext<any>({
  title: "New Document",
});

export const DocProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState<string>("");
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [markdown, setMarkdown] = useState<string>("");
  const [currentNoteId, setcurrentNoteId] = useState<string | null>(null);

  const [notes, setNotes] = useLocalStorage<Array<Note>>("notes", []);

  useEffect(() => {
    if (title === document.title) return;

    if (title) {
      document.title = title;
      localStorage.setItem("title", title);
    }
  }, [title]);

  const handleLastSaved = () => {
    const date = new Date();
    setLastSaved(date);
    localStorage.setItem("last_saved", date.toISOString());
  };

  useEffect(() => {
    const lastSaved = localStorage.getItem("last_saved");
    const title = localStorage.getItem("title");

    if (lastSaved) setLastSaved(new Date(lastSaved));
    if (title) setTitle(title);
  }, []);

  const providerValues = {
    title,
    setTitle,
    lastSaved,
    handleLastSaved,
    markdown,
    setMarkdown,
    currentNoteId,
    setcurrentNoteId,
    notes,
    setNotes,
  };

  return (
    <DocContext.Provider value={providerValues}>{children}</DocContext.Provider>
  );
};
