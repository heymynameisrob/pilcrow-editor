"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { CommandLoading } from "cmdk";
import { useDocs } from "@/hooks/docs";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { CommandGroupDocs } from "@/components/cmdk/cmd-docs";
import { CommandGroupHome } from "@/components/cmdk/cmd-home";

import type { Doc } from "@/utils/types";

export type PageType = "home" | "docs" | null;

const RECENT_MAX_LIMIT = 5;

export const CommandPallete = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [docs, setDocs] = useState<Array<Doc> | []>([]);
  const [value, setValue] = useState<string>("");
  const [activePage, setActivePage] = useState<PageType>("home");

  const { getDocs } = useDocs();

  useHotkeys("Mod+k", () => setOpen(!open), {
    enableOnContentEditable: true,
  });

  /**
   * #1 - Key Events
   * Handle key events on CommandInput
   * - Backsapce on an empty input closes the window or goes back to home, depending on the active page
   * - > is a shortcut to go to the docs page
   */

  const onKeyDown = useCallback(
    (e: any) => {
      if (!open) return;

      if (e.key === "Backspace" && value.length < 1 && activePage !== "home") {
        e.preventDefault();
        setActivePage("home");
        bounce();
      }
      if (e.key === "Backspace" && value.length < 1 && activePage === "home") {
        e.preventDefault();
        setOpen(false);
      }
    },
    [activePage, value.length],
  );

  const bounce = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "scale(0.96)";
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = "";
        }
      }, 100);

      setValue("");
    }
  }, []);

  /**
   * #2 - Change the page
   * Change the active page and bounce the dialog
   */
  const handlePageSelect = useCallback(
    (page: PageType) => {
      setActivePage(page);
      bounce();
      setValue("");
    },
    [activePage],
  );

  /**
   * #3 - Fetch all documents
   * Get documents from IndexedDB
   */

  useEffect(() => {
    const fetchDocs = async () => {
      const docs = await getDocs();
      setDocs(docs);
      console.log(docs);
    };
    fetchDocs();
    setLoading(false);
  }, []);

  /**
   * #4 - Sort documents by last updated
   */
  const sortedDocs = docs.sort(
    (a, b) =>
      new Date(b.last_updated_at).getTime() -
      new Date(a.last_updated_at).getTime(),
  );

  /**
   * #5 - Mount
   * So because next js bullshit, we need to do this so hydration errors dont occur
   */
  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <CommandDialog ref={ref} open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search everything..."
        activePage={activePage === "home" ? null : activePage}
        value={value}
        onKeyDown={onKeyDown}
        onValueChange={(value: string) => setValue(value)}
      />
      <CommandList>
        {loading && <CommandLoading>Fetching documents…</CommandLoading>}
        <CommandEmpty>No results found.</CommandEmpty>
        {activePage === "docs" ? (
          <CommandGroupDocs docs={sortedDocs} handleOpenChange={setOpen} />
        ) : (
          <CommandGroupHome
            docs={sortedDocs.slice(0, RECENT_MAX_LIMIT)}
            handleSetPage={(page: PageType) => handlePageSelect(page)}
            handleSetOpen={() => setOpen(false)}
          />
        )}
      </CommandList>
    </CommandDialog>
  );
};
