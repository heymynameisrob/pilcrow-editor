import { JSONContent } from "@tiptap/core";

export type Note = {
  id: string;
  content: string;
  created_at?: string;
};

export type Doc = {
  id: string;
  title: string;
  content: JSONContent;
  created_at: string | Date;
  last_updated_at: string | Date;
  notes: Array<Note> | [];
};
