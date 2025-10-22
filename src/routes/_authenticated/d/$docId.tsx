import { createFileRoute } from "@tanstack/react-router";
import { TipTapEditor } from "@/components/editor";
import { useGetDoc } from "@/hooks/useGetDoc";
import { useSession } from "@/lib/auth-client";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { TopBar } from "@/components/topbar";
import { JSONContent } from "@tiptap/react";
import { useSaveDoc } from "@/hooks/useSaveDoc";

export const Route = createFileRoute("/_authenticated/d/$docId")({
  component: DocumentPage,
});

function DocumentPage() {
  const { docId } = Route.useParams();
  const { data: session } = useSession();
  if (!session) return null;

  const idSplit = docId.split("-");
  const actualDocId = idSplit[idSplit.length - 1] as string;

  return (
    <DocumentEditor userId={session.user.id} docId={Number(actualDocId)} />
  );
}

function DocumentEditor({ userId, docId }: { userId: string; docId: number }) {
  const { data: document } = useGetDoc({ userId, docId });
  const { mutate: saveDoc } = useSaveDoc(userId);

  const handleOnContentSave = useDebouncedCallback(async (editor: any) => {
    const content = editor.getJSON() as JSONContent;
    const isContentEmpty =
      content.content && content.content[0].content === undefined;

    // Prevents saving empty or multiple copies of documents
    if (isContentEmpty || !docId) return;

    saveDoc({
      id: docId,
      content,
    });
  }, 500);

  const handleOnTitleSave = useDebouncedCallback(async (title: string) => {
    if (title.length === 0 || !docId) return;

    saveDoc({
      id: docId,
      title,
    });
  }, 500);

  if (!document) return null;

  return (
    <>
      <TopBar document={document} userId={userId} />
      <main className="flex flex-col w-full h-screen overflow-y-scroll px-4 max-w-4xl mx-auto pt-8">
        <Input
          name="title"
          defaultValue={document.title}
          onChange={(e) => {
            handleOnTitleSave(e.target.value);
          }}
          placeholder="Title"
          className="!p-0 rounded-none !bg-transparent border-none h-auto text-4xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:caret-emerald-500-500"
        />
        <TipTapEditor
          readOnly={false}
          content={document.content}
          onContentChange={handleOnContentSave}
        />
        <div className="fixed bottom-0 inset-x-0 pointer-events-none h-12 bg-gradient-to-t from-background to-transparent" />
      </main>
    </>
  );
}
