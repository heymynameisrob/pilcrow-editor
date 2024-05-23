"use client";
import React, { createContext, useEffect, useState } from "react";

export const DocContext = createContext<any>({
  title: "New Document",
});

export const DocProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [title, setTitle] = useState<string>("");
  const [openAiKey, setOpenAiKey] = useState<string | null>(null);

  useEffect(() => {
    if (title === document.title) return;

    if (title) {
      document.title = title;
    }
  }, [title]);

  const handleSetApiKey = () => {
    const key = prompt("Enter OpenAI key");
    if (key) {
      setOpenAiKey(key);
      localStorage.setItem("openai_key", key);
    }
  }

  useEffect(() => {
    const key = localStorage.getItem("openai_key");
    if (key) setOpenAiKey(key);
  }, []);

  const providerValues = {    
    title,
    setTitle,    
    openAiKey,
    handleSetApiKey,
  };

  return (
    <DocContext.Provider value={providerValues}>{children}</DocContext.Provider>
  );
};
