"use client";

/**
 * Sidebar Command List
 * Lists all documents with query-based filtering and key events
 * TODO: Consider moving to dialog rather than drawer - might be cooler
 */

import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CommandLoading } from "cmdk";
import { useDocs } from "@/hooks/docs";
import { DocContext } from "@/context/doc";
import { ReturnIcon } from "@/components/icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getTimeFromNow } from "@/utils/time";

import type { Doc } from "@/utils/types";

export const SidebarCommandList = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [docs, setDocs] = useState<Array<Doc> | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const { setDocId, isSidebarOpen, setIsSidebarOpen } = useContext(DocContext);

  const { getDocs } = useDocs();

  /**
   * #1 - Fetch all documents
   * Get documents from IndexedDB
   */

  useEffect(() => {
    const fetchDocs = async () => {
      const docs = await getDocs();
      setDocs(docs);
      setLoading(false);
    };
    fetchDocs();
  }, []);

  /**
   * #2 - Input key event
   * Close sidebar on backspace when there isn't any value or escape
   */
  const onKeyDown = useCallback(
    (e: any) => {
      if (!isSidebarOpen) return;

      if ((e.key === "Backspace" && value.length < 1) || e.key === "Escape") {
        e.preventDefault();
        setIsSidebarOpen(false);
      }
    },
    [isSidebarOpen, value.length],
  );

  /**
   * #3 - Handle input focus
   * autoFocus doesn't seem to work with CMDK so built my own
   */
  useLayoutEffect(() => {
    const input = ref?.current;

    if (isSidebarOpen && input) {
      input?.focus();
    }
  }, [isSidebarOpen]);

  /**
   * #4 - Sort documents by last updated
   */

  const sortedDocs = docs.sort(
    (a, b) =>
      new Date(b.last_updated_at).getTime() -
      new Date(a.last_updated_at).getTime(),
  );

  if (!docs) return null;

  return (
    <Command
      loop={true}
      filter={(value, search) => {
        // split _ to get the title
        if (value.toLowerCase().includes(search.toLowerCase())) return 1;
        return 0;
      }}
      className="bg-neutral-100 rounded-none h-full dark:bg-neutral-800"
    >
      <CommandInput
        ref={ref}
        value={value}
        onKeyDown={onKeyDown}
        onValueChange={(value: string) => setValue(value)}
        placeholder="Search documents..."
        className="bg-transparent rounded-none"
        autoFocus
      />
      <CommandEmpty className="bg-white dark:bg-neutral-900 grid place-items-center h-full text-sm">
        No documents found.
      </CommandEmpty>
      <CommandGroup
        className="h-full bg-white dark:bg-neutral-900"
        heading="Documents"
      >
        <CommandList className="h-full max-h-none p-px">
          {loading && <CommandLoading>Fetching documents…</CommandLoading>}
          {sortedDocs.map((doc: Doc) => (
            <CommandItem
              key={doc.id}
              value={`${doc.title} ${doc.id}`}
              className="group flex justify-between items-center gap-1"
              onSelect={() => {
                setDocId(doc.id);
                setIsSidebarOpen(false);
              }}
            >
              <div className="flex items-baseline gap-1">
                <small className="font-medium">{doc.title}</small>
                <span className="text-neutral-700 dark:text-neutral-400">
                  {getTimeFromNow(doc.last_updated_at)}
                </span>
              </div>
              <ReturnIcon
                size={15}
                strokeWidth={1.5}
                absoluteStrokeWidth
                className="hidden [[aria-selected]_&]:block"
              />
            </CommandItem>
          ))}
        </CommandList>
      </CommandGroup>
    </Command>
  );
};
