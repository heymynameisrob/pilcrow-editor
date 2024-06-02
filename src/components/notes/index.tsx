"use client";

/**
 * Notes
 * Inline note or annotation on any text node in the editor
 * Allows for self-referecing, reminders, or annotations on your document
 */

import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { DocContext } from "@/context/doc";
import { InlinePopover } from "@/components/editor/inline-popover";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/icons";

import type { Editor } from "@tiptap/react";
import type { Note } from "@/utils/types";

export const Notes = ({ editor }: { editor: Editor }) => {
  const { currentNoteId, notes } = useContext(DocContext);
  const [note, setNote] = useState<Note | null>(null);

  const selectedNodeIsNote =
    editor.isActive("note") && editor.getAttributes("note").noteId;

  useEffect(() => {
    if (!selectedNodeIsNote || !notes) return;

    const currentNote =
      notes &&
      notes.filter((note: Note) => {
        return note.id === currentNoteId;
      });

    setNote(currentNote[0]);
  }, [selectedNodeIsNote, editor]);

  if (!note) return null;

  return (
    <InlinePopover editor={editor} markType="note">
      <div className="flex flex-col p-2 py-2.5 gap-2 w-64">
        <div className="flex flex-row justify-between items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-baseline gap-1">
              <small className="opacity-80">Note to self</small>
            </div>
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
        <p>{note.content}</p>
        <span className="opacity-60">{moment(note?.created_at).fromNow()}</span>
      </div>
    </InlinePopover>
  );
};
