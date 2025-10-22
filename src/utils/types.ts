import { JSONContent } from "@tiptap/core";

export type Note = {
  id: number;
  content: string;
  created_at?: string;
};

export type Doc = {
  id: number;
  title: string;
  content: JSONContent;
  created_at: string | Date;
  last_updated_at: string | Date;
  notes: Array<Note> | [];
};
