"use client";

import { useContext } from "react";
import { CommandItem } from "@/components/cmdk/cmd-item";
import { CommandGroup } from "@/components/ui/command";
import { DocContext } from "@/context/doc";
import { getTimeFromNow } from "@/utils/time";

import type { Doc } from "@/utils/types";

export const CommandGroupDocs = ({
  docs,
  handleOpenChange,
}: {
  docs: any;
  handleOpenChange: any;
}) => {
  const { setDocId } = useContext(DocContext);

  return (
    <CommandGroup className="h-full max-h-none p-px">
      {docs.map((doc: Doc) => (
        <CommandItem
          key={doc.id}
          value={`${doc.title} ${doc.id}`}
          className="group flex justify-between items-center gap-1"
          onSelect={() => {
            setDocId(doc.id);
            handleOpenChange(false);
          }}
        >
          <div className="flex items-baseline gap-3">
            <small className="font-medium">{doc.title}</small>
            <span className="text-neutral-700 dark:text-neutral-400">
              {getTimeFromNow(doc.last_updated_at)}
            </span>
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};
