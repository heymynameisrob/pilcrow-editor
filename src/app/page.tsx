import { DocProvider } from "@/context/doc";
import { Editor } from "@/components/editor";
import { Title } from "@/components/title";
import { TopMenu } from "@/components/top-menu";

export default function MainPage() {
  return (
    <DocProvider>
      <main className="h-screen overflow-y-scroll py-24">
        <Editor />
        <div className="fixed flex justify-between items-center gap-2 top-0 left-0 w-full p-4">
          <Title />
          <TopMenu />
        </div>
      </main>
    </DocProvider>
  );
}
