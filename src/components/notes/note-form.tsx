"use client";

/**
 * Note Form Component
 * Handles text entry of a note
 */

import { useContext, useState } from "react";
import { DocContext } from "@/context/doc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/utils/types";

export const NoteForm = ({ onAfterSubmit, note }: any) => {
  const { currentNoteId, notes, setNotes } = useContext(DocContext);
  const [content, setContent] = useState<string | null>(note?.content || null);

  /**
   * #1 Save - Saves the note to a local storage array
   * The currentNoteId is an id added by Tiptap to the currently selected node
   * Before the form is submitted, this is added by tiptap
   * TODO: Handle case if user cancels action before saving, remove the note id
   */
  const onSave = () => {
    if (!content) return;
    const newNote: Note = {
      id: currentNoteId,
      content,
      created_at: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    onAfterSubmit();
  };

  return (
    <div className="flex flex-col gap-3">
      <Textarea
        value={content || ""}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button size="sm" onClick={onSave} disabled={!content}>
        Save
      </Button>
    </div>
  );
};
