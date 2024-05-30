/**
 * Main Page - Displays the editor, title, and menu actions
 */

import { DocProvider } from "@/context/doc";
import { Editor } from "@/components/editor";
import { Title } from "@/components/title";
import { TopMenu } from "@/components/top-menu";

export default function MainPage() {
  return (
    <DocProvider>
      <main className="h-screen overflow-y-scroll py-24 px-4">
        <Editor />
        <div className="fixed w-full bg-gradient-to-b from-white to-transparent z-50 top-0 left-0 flex gap-2 flex-row items-center justify-between px-4 py-2 h-14 backdrop-blur-sm dark:from-neutral-950 md:backdrop-blur-none">
          <Title />
          <TopMenu />
        </div>
      </main>
    </DocProvider>
  );
}
