/**
 * Main Page - Displays the editor, title, and menu actions
 */

import { DocProvider } from "@/context/doc";
import { Editor } from "@/components/editor";
import { TopBar } from "@/components/topbar";
import { Sidebar } from "@/components/sidebar";

export default function MainPage() {
  return (
    <DocProvider>
      <Sidebar />
      <main className="relative h-screen overflow-y-scroll py-24 px-4 lg:px-12">
        <TopBar />
        <Editor />
      </main>
    </DocProvider>
  );
}
