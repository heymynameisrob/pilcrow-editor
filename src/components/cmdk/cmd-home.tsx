"use client";

import { useContext } from "react";
import { DocContext } from "@/context/doc";
import { CommandGroup } from "@/components/ui/command";
import { CommandItem } from "@/components/cmdk/cmd-item";
import { NewDocIcon, SearchIcon } from "@/components/icons";

import type { PageType } from "@/components/cmdk";
import { getTimeFromNow } from "@/utils/time";
import { Doc } from "@/utils/types";
import { nanoid } from "ai";

export const CommandGroupHome = ({
  docs,
  handleSetPage,
  handleSetOpen,
}: {
  docs: any;
  handleSetPage: (page: PageType) => void;
  handleSetOpen: any;
}) => {
  const { setDocId } = useContext(DocContext);

  const handleNewDocument = () => {
    setDocId(nanoid());
    handleSetOpen();
  };

  return (
    <>
      <CommandGroup heading="Actions">
        <CommandItem onSelect={handleNewDocument}>
          <div className="flex items-center gap-3">
            <NewDocIcon />
            <small className="font-medium">New document</small>
          </div>
        </CommandItem>
        <CommandItem onSelect={() => handleSetPage("docs")}>
          <div className="flex items-center gap-3">
            <SearchIcon />
            <small className="font-medium">Search documents</small>
          </div>
        </CommandItem>
      </CommandGroup>
      <CommandGroup heading="Recent documents">
        {docs.map((doc: Doc) => (
          <CommandItem
            key={doc.id}
            value={`${doc.title} ${doc.id}`}
            className="group flex justify-between items-center gap-1"
            onSelect={() => {
              setDocId(doc.id);
              handleSetOpen(false);
            }}
          >
            <div className="flex items-baseline gap-3">
              <small className="font-medium">{doc.title}</small>
              <span className="text-neutral-300">
                {getTimeFromNow(doc.last_updated_at)}
              </span>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
};
