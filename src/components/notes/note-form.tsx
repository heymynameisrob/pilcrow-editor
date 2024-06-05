"use client";

/**
 * Note Form Component
 * Handles text entry of a note
 */

import { useContext, useState } from "react";
import { DocContext } from "@/context/doc";
import { useDocs } from "@/hooks/docs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/utils/types";

export const NoteForm = ({ onAfterSubmit, note }: any) => {
  const { docId, currentNoteId } = useContext(DocContext);
  const [content, setContent] = useState<string | null>(note?.content || null);

  const { saveNoteToDoc } = useDocs();

  /**
   * #1 Save - Saves the note to a local storage array
   * The currentNoteId is an id added by Tiptap to the currently selected node
   * Before the form is submitted, this is added by tiptap
   * TODO: Handle case if user cancels action before saving, remove the note id
   */
  const onSave = () => {
    if (!content || !docId || !currentNoteId) return;

    const newNote: Note = {
      id: currentNoteId,
      content,
      created_at: new Date().toISOString(),
    };
    saveNoteToDoc(docId, newNote);
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
