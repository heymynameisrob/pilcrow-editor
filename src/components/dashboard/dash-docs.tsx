"use client";

import { useContext, useEffect, useState } from "react";
import { nanoid } from "ai";
import { useDocs } from "@/hooks/docs";
import { DocContext } from "@/context/doc";

import { DashboardDocItem } from "@/components/dashboard/dash-doc-item";
import { DashboardNewDoc } from "@/components/dashboard/dash-new-doc";

import type { Doc } from "@/utils/types";

export const DashboardDocs = ({
  handleSetOpen,
}: {
  handleSetOpen: () => void;
}) => {
  const [docs, setDocs] = useState<Array<Doc> | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { setDocId } = useContext(DocContext);

  const { getDocs } = useDocs();

  /**
   * #1 - Fetch all documents
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

  const handleOnSelect = (id: string | null) => {
    setDocId(id);
    handleSetOpen();
  };

  /**
   * #3 - Sort documents by last updated
   */
  const sortedDocs = docs.sort(
    (a, b) =>
      new Date(b.last_updated_at).getTime() -
      new Date(a.last_updated_at).getTime(),
  );

  if (loading) return null;

  return (
    <div className="grid items-start grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
      <DashboardNewDoc onSelect={() => handleOnSelect(nanoid())} />
      {sortedDocs.map((doc: Doc) => {
        return (
          <DashboardDocItem
            key={doc.id}
            doc={doc}
            onSelect={() => handleOnSelect(doc.id)}
          />
        );
      })}
    </div>
  );
};
