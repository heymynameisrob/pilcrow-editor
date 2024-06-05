"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { DocContext } from "@/context/doc";
import { useDocs } from "@/hooks/docs";
import { cn } from "@/utils";
import { ReturnIcon } from "@/components/icons";
import { updateScrollView } from "@/components/editor/extensions/slash-command";

import type { Doc } from "@/utils/types";

// TODO: Make command list?
// TODO: Clean up logic for getting docs. Probably okay but ya know.
// TODO: Make prettier.

export const SidebarDocs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [docs, setDocs] = useState<Array<Doc> | []>([]);
  const { docId, setDocId, isSidebarOpen, setIsSidebarOpen } =
    useContext(DocContext);
  const { getDocs } = useDocs();

  /**
   * #1 - Fetch all documents
   * Get documents from IndexedDB
   */

  useEffect(() => {
    const fetchDocs = async () => {
      const docs = await getDocs();
      setDocs(docs);
    };
    fetchDocs();
  }, []);

  const sortedDocs = docs.sort(
    (a, b) =>
      new Date(b.last_updated_at).getTime() -
      new Date(a.last_updated_at).getTime(),
  );

  /**
   * #2 - Select the document based on index in sortedDocuments
   * Allows for selecting with keyboard too
   */

  const selectDocument = useCallback(
    (index: number) => {
      const doc = sortedDocs[index];
      setDocId(doc.id);
      return setIsSidebarOpen(false);
    },
    [sortedDocs],
  );

  /**
   * #3 - Handle keyboard events
   * Loops round the list so when you hit the bottom you jump back to the top
   */

  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isSidebarOpen) return false;

      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          setSelectedIndex(
            (selectedIndex + sortedDocs.length - 1) % sortedDocs.length,
          );
          return true;
        }
        if (e.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % sortedDocs.length);
          return true;
        }
        if (e.key === "Enter") {
          selectDocument(selectedIndex);
          return true;
        }
        return false;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isSidebarOpen, sortedDocs, selectedIndex, setSelectedIndex]);

  useEffect(() => {
    const currentDocIndex = sortedDocs.findIndex((doc: Doc) => docId == doc.id);
    setSelectedIndex(currentDocIndex || 0);
  }, [sortedDocs]);

  /**
   * #4 - Handle scroll container
   * When we hit the bottom, scroll the view down so the selected item always stays in view
   * TODO: Buggy - When you get back to the top of the viewport is slightly cut off
   */

  useLayoutEffect(() => {
    const container = ref?.current;

    const item = container?.children[selectedIndex] as HTMLElement;

    if (item && container) updateScrollView(container, item);
  }, [selectedIndex]);

  return (
    <div className="flex flex-col gap-px h-full overflow-y-scroll" ref={ref}>
      {sortedDocs.map((doc: any, index: number) => (
        <button
          onClick={() => selectDocument(index)}
          key={doc.id}
          className={cn(
            "flex shrink-0 items-center justify-between overflow-hidden p-2 bg-transparent rounded-md h-9",
            "hover:bg-black/5 dark:hover:bg-white/5",
            index === selectedIndex &&
              "bg-black/10 dark:bg-white/10 shadow-[inset_0px_1px_0px_hsla(0_,0%_,100%_,.02)_,inset_0px_0px_0px_1px_hsla(0_,0%_,100%_,.02)_,0px_1px_2px_rgba(0_,0_,0_,.12)_,0px_2px_4px_rgba(0_,0_,0_,.08)_,0px_0px_0px_0.5px_rgba(0_,0_,0_,.24)]",
            docId === doc.id &&
              "bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-500 dark:bg-blue-500 text-white shadow-[inset_0px_1px_0px_hsla(0_,0%_,100%_,.02)_,inset_0px_0px_0px_1px_hsla(0_,0%_,100%_,.02)_,0px_1px_2px_rgba(0_,0_,0_,.12)_,0px_2px_4px_rgba(0_,0_,0_,.08)_,0px_0px_0px_0.5px_rgba(0_,0_,0_,.24)]",
          )}
        >
          <small className="font-medium">{doc.title}</small>
          {index === selectedIndex && (
            <ReturnIcon size={15} strokeWidth={1.5} absoluteStrokeWidth />
          )}
        </button>
      ))}
    </div>
  );
};
