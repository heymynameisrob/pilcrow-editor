"use client";
import React, { createContext, useEffect, useState } from "react";

export const DocContext = createContext<any>({
  title: "New Document...",
  isCached: false,
  handleStripTitleFromContent: () => {},
  setDoc: () => {},
  isSaving: false,
});

export const DocProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isFaded, setIsFaded] = useState<boolean>(false);
  const [suggestModalOpen, setSuggestModalOpen] = useState<boolean>(false);
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [readingTime, setReadingTime] = useState<number>(0);

  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [isAnnotationsOn, setIsAnnotationsOn] = useState<boolean>(true);
  
  const [currentReminderId, setCurrentReminderId] = useState<string | null>(
    null,
  );
  const [doc, setDoc] = useState<any>(null);

  const handleSaveDoc = (doc: any) => {
    setDoc(doc);
    localStorage.setItem("doc", JSON.stringify(doc));
  }

  useEffect(() => {
    if (title === document.title) return;

    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    const doc = localStorage.getItem("doc");

    if (doc) setDoc(JSON.parse(doc));    
  }, []);

  const providerValues = {
    doc,
    handleSaveDoc,
    title,
    setTitle,
    isSaving,
    setIsSaving,
    isFaded,
    setIsFaded,
    suggestModalOpen,
    setSuggestModalOpen,
    currentReminderId,
    setCurrentReminderId,
    isEditing,
    setIsEditing,
    wordCount,
    setWordCount,
    readingTime,
    setReadingTime,
    characterCount,
    setCharacterCount,
    isAiChatOpen,
    setIsAiChatOpen,
    isAnnotationsOn,
    setIsAnnotationsOn,
  };

  return (
    <DocContext.Provider value={providerValues}>{children}</DocContext.Provider>
  );
};
