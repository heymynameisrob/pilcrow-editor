"use client";

import { RichText } from "@/components/rich-text";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getTimeFromNow } from "@/utils/time";
import ExtensionList from "@/components/editor/extensions";
import NoteExtension from "@/components/editor/extensions/note";

import type { Doc } from "@/utils/types";

export const DashboardDocItem = ({
  doc,
  onSelect,
}: {
  doc: Doc;
  onSelect: any;
}) => {
  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-start justify-center gap-3 cursor-pointer group outline-none focus:ring-2 focus:ring-white"
    >
      <AspectRatio
        tabIndex={-1}
        ratio={4 / 3}
        className="p-3 rounded-md text-left overflow-hidden bg-neutral-100 border border-black/10 pointer-events-none group-hover:opacity-80 dark:border-white/10 dark:bg-neutral-800"
      >
        <RichText
          content={doc.content}
          extensions={[...ExtensionList, NoteExtension]}
          className="origin-top-left prose-h1:text-sm prose-h2:text-sm prose-h3:prose-sm prose-p:text-xs"
        />
      </AspectRatio>
      <div className="flex flex-col items-start gap-1">
        <small className="font-medium">{doc.title}</small>
        <small className="opacity-70">
          {getTimeFromNow(doc.last_updated_at)}
        </small>
      </div>
    </button>
  );
};
