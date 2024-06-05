"use client";

/**
 * Notes
 * Inline note or annotation on any text node in the editor
 * Allows for self-referecing, reminders, or annotations on your document
 */

import { useContext, useEffect, useState } from "react";
import { DocContext } from "@/context/doc";
import { InlinePopover } from "@/components/editor/inline-popover";
import { getTimeFromNow } from "@/utils/time";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/icons";

import type { Editor } from "@tiptap/react";
import type { Note } from "@/utils/types";

export const Notes = ({ editor }: { editor: Editor }) => {
  const { notes, currentNoteId } = useContext(DocContext);
  const [note, setNote] = useState<Note | null>(null);

  const selectedNodeIsNote =
    editor.isActive("note") && editor.getAttributes("note").noteId;

  useEffect(() => {
    if (!selectedNodeIsNote || notes.length > 1) return;

    const currentNote =
      notes &&
      notes.filter((note: Note) => {
        return note.id === currentNoteId;
      });

    setNote(currentNote[0]);
  }, [notes, selectedNodeIsNote, editor]);

  if (!note) return null;

  return (
    <InlinePopover editor={editor} markType="note">
      <div className="flex flex-col w-48">
        <div className="flex flex-row justify-between items-center gap-2">
          <div className="px-2">
            <small className="text-xs opacity-80">Note to self</small>
          </div>
          <Button
            title="Mark resolved"
            aria-label="Mark resolved"
            data-microtip-position="top"
            role="tooltip"
            variant="ghost"
            size="sm"
            onClick={() => editor?.commands.unsetNote(note?.id)}
          >
            <CheckIcon />
          </Button>
        </div>
        <div className="px-2">
          <p>{note.content}</p>
          <span className="opacity-60">
            {note?.created_at && getTimeFromNow(note?.created_at)}
          </span>
        </div>
      </div>
    </InlinePopover>
  );
};
