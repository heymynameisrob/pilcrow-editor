import { Mark, mergeAttributes, Range } from "@tiptap/core";
import { Mark as PMMark } from "@tiptap/pm/model";

/* eslint-disable no-unused-vars */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    note: {
      /**
       * Set a note (add)
       */
      setNote: (noteId: string) => ReturnType;
      /**
       * Unset a note (remove)
       */
      unsetNote: (noteId: string) => ReturnType;
    };
  }
}
/* eslint-disable no-unused-vars */

export interface MarkWithRange {
  mark: PMMark;
  range: Range;
}

export interface NoteOptions {
  HTMLAttributes: Record<string, any>;
  onNoteActivated: (noteId: string | null) => void;
}

export interface NoteStorage {
  currentNoteIdId: string | null;
}

export const NoteExtension = Mark.create<NoteOptions, NoteStorage>({
  name: "note",

  addOptions() {
    return {
      HTMLAttributes: {},
      onNoteActivated: () => {},
    };
  },

  addAttributes() {
    return {
      noteId: {
        default: null,
        parseHTML: (el) => (el as HTMLSpanElement).getAttribute("data-note-id"),
        renderHTML: (attrs) => ({ "data-note-id": attrs.noteId }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-note-id]",
        getAttrs: (el) =>
          !!(el as HTMLSpanElement).getAttribute("data-note-id")?.trim() &&
          null,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  onSelectionUpdate() {
    const { $from } = this.editor.state.selection;

    const marks = $from.marks();

    if (!marks.length) {
      this.storage.currentNoteIdId = null;
      this.options.onNoteActivated(this.storage.currentNoteIdId);
      return;
    }

    const noteMark = this.editor.schema.marks.note;

    const currentNoteIdMark = marks.find((mark) => mark.type === noteMark);

    this.storage.currentNoteIdId = currentNoteIdMark?.attrs.noteId || null;

    this.options.onNoteActivated(this.storage.currentNoteIdId);
  },

  addStorage() {
    return {
      currentNoteIdId: null,
    };
  },

  addCommands() {
    return {
      setNote:
        (noteId) =>
        ({ commands }) => {
          if (!noteId) return false;

          commands.setMark("note", { noteId });
          return true;
        },
      unsetNote:
        (noteId) =>
        ({ tr, dispatch }) => {
          if (!noteId) return false;

          const noteMarksWithRange: MarkWithRange[] = [];

          tr.doc.descendants((node, pos) => {
            const noteMark = node.marks.find(
              (mark) =>
                mark.type.name === "note" && mark.attrs.noteId === noteId,
            );

            if (!noteMark) return;

            noteMarksWithRange.push({
              mark: noteMark,
              range: {
                from: pos,
                to: pos + node.nodeSize,
              },
            });
          });

          noteMarksWithRange.forEach(({ mark, range }) => {
            tr.removeMark(range.from, range.to, mark);
          });

          return dispatch?.(tr);
        },
    };
  },
});

export default NoteExtension;
