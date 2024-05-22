import { Editor } from "@/components/editor";


export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll py-24">
      <Editor />
      <div className="fixed flex justify-between items-center gap-2 top-0 left-0 w-full p-4">
        <small>Pilcrow</small>
        <small>Top Menu Actions</small>
      </div>
    </main>
  );
}
