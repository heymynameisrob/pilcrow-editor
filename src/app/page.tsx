/**
 * Main Page - Displays the editor, title, and menu actions
 */

import { Suspense } from "react";
import { DocProvider } from "@/context/doc";
import { Editor } from "@/components/editor";
import { TopBar } from "@/components/topbar";
import { CommandPallete } from "@/components/cmdk";

export default function MainPage() {
  return (
    <DocProvider>
      <main className="relative h-screen overflow-y-scroll py-24 px-4 lg:px-12">
        <TopBar />
        <Editor />
      </main>
      <Suspense fallback={null}>
        <CommandPallete />
      </Suspense>
    </DocProvider>
  );
}
