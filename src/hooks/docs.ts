import { useContext, useEffect } from "react";
import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";
import { useLocalStorage } from "@/hooks/local";
import { idbConfig } from "@/utils/db";
import { DocContext } from "@/context/doc";
import { Doc, Note } from "@/utils/types";

type UseDocType = {
  saveDoc: (doc: Doc) => Promise<void>;
  getDoc: (id: string) => Promise<Array<Doc>>;
  getDocs: () => Promise<Array<Doc>>;
  updateDoc: (doc: Doc) => Promise<void>;
  saveNoteToDoc: (id: string, note: Note) => Promise<void>;
  newDocument: () => void;
};

export function useDocs(): UseDocType {
  const { setDocId, setTitle, setLastSaved } = useContext(DocContext);

  /**
   * #1 - Setup IndexedDB
   * TODO: Look for an ORM-style solution. Would make life so much easier.
   */
  useEffect(() => {
    setupIndexedDB(idbConfig)
      .then(() => console.log("success"))
      .catch((e) => console.error("error / unsupported", e));
  }, []);

  const { add, getAll, update, getByID } = useIndexedDBStore("docs");

  /**
   * #2 - When an existing document is updated, store the ID in Local Storage for quick retreival
   * This means when we load back up again, we can pick up where we left off.
   */
  const [recent, setRecent] = useLocalStorage<string>("recent_doc", "");

  const saveDoc = async (doc: Doc) => {
    const doesDocExist = await getByID(doc.id);

    if (doesDocExist) {
      update(doc);
    } else {
      await add(doc);
    }
    if (doc.id === recent) return;

    setRecent(doc.id);
  };

  const saveNoteToDoc = async (id: string, note: Note) => {
    if (!id) return console.error("No ID provided");

    const doc: any = await getByID(id);

    const docWithNotes = {
      ...doc,
      notes: [...doc.notes, note],
    };

    return update(docWithNotes);
  };

  const newDocument = () => {
    setDocId(null);
    setTitle("Untitled");
    setLastSaved(new Date());
  };

  return {
    saveDoc,
    getDoc: getByID as (id: string) => Promise<Array<Doc>>,
    getDocs: getAll as () => Promise<Array<Doc>>,
    updateDoc: update,
    saveNoteToDoc,
    newDocument,
  };
}
