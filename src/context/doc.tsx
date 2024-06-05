"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "@/hooks/local";

import type { Note } from "@/utils/types";

type ContextProps = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  lastSaved: string | Date;
  setLastSaved: Dispatch<SetStateAction<Date | string>>;
  handleLastSaved?: any;
  markdown: any;
  setMarkdown: Dispatch<SetStateAction<string>>;
  currentNoteId: string | null;
  setcurrentNoteId: Dispatch<SetStateAction<string | null>>;
  notes: Array<Note>;
  setNotes: Dispatch<SetStateAction<Array<Note>>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  docId: string | null;
  setDocId: Dispatch<SetStateAction<string | null>>;
};

export const DocContext = createContext<ContextProps>({
  title: "Untitled",
  setTitle: () => {},
  lastSaved: new Date(),
  setLastSaved: () => {},
  handleLastSaved: null,
  markdown: null,
  setMarkdown: () => {},
  currentNoteId: null,
  setcurrentNoteId: () => {},
  notes: [],
  setNotes: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
  docId: null,
  setDocId: () => {},
});

export const DocProvider = ({ children }: { children: React.ReactNode }) => {
  const [docId, setDocId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [lastSaved, setLastSaved] = useState<Date | string>(new Date());
  const [markdown, setMarkdown] = useState<string>("");
  const [currentNoteId, setcurrentNoteId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // TODO: Convert to use IndexedDB from the doc store instead
  const [notes, setNotes] = useLocalStorage<Array<Note>>("notes", []);

  useEffect(() => {
    if (title === document.title) return;

    if (title) {
      document.title = title;
    }
  }, [title]);

  const handleLastSaved = () => {
    const date = new Date();
    setLastSaved(date);
  };

  const providerValues = {
    title,
    setTitle,
    lastSaved,
    setLastSaved,
    handleLastSaved,
    markdown,
    setMarkdown,
    currentNoteId,
    setcurrentNoteId,
    notes,
    setNotes,
    isSidebarOpen,
    setIsSidebarOpen,
    docId,
    setDocId,
  };

  return (
    <DocContext.Provider value={providerValues}>{children}</DocContext.Provider>
  );
};
