"use client";
import React, { useContext, useState } from "react";
import { nanoid } from "ai";
// import { useHotkeys } from "react-hotkeys-hook";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { DocContext } from "@/context/doc";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { NoteForm } from "@/components/notes/note-form";
import { PenIcon } from "@/components/icons";

import type { Editor } from "@tiptap/react";

export const ToolbarNotes = ({ editor }: { editor: Editor }) => {
  const [open, setIsOpen] = useState(false);
  const { currentNoteId, setcurrentNoteId } = useContext(DocContext);

  // useHotkeys(KeyboardShortcuts.ToggleNoteToSelf, () => handleToggleNote(), {
  //   preventDefault: true,
  //   enableOnContentEditable: true,
  //   enableOnFormTags: true,
  // });

  const handleToggleNote = () => {
    if (editor.isActive("note")) {
      const noteId = editor.getAttributes("note").noteId;
      editor.commands.unsetNote(noteId);
      return;
    }

    const id = `note_${nanoid()}`;

    editor.commands.setNote(id);
    setcurrentNoteId(id);
    setIsOpen(true);
  };

  return (
    <Popover open={open} onOpenChange={setIsOpen} modal={true}>
      <PopoverAnchor>
        <Toggle
          size="sm"
          title="Note to self"
          aria-label="Note to self"
          data-microtip-position="top"
          role="tooltip"
          pressed={editor.isActive("note")}
          onPressedChange={handleToggleNote}
        >
          <PenIcon />
        </Toggle>
      </PopoverAnchor>
      <PopoverContent
        onInteractOutside={() => {
          if (editor?.isActive("note") && currentNoteId) {
            editor?.commands.unsetNote(currentNoteId);
          }
          setIsOpen(false);
        }}
      >
        <NoteForm onAfterSubmit={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};
