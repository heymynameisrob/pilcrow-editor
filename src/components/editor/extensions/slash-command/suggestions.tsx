import { ReactNode } from "react";
import {
  CodeIcon,
  Heading2Icon,
  Heading3Icon,
  InfoIcon,
  ListIcon,
  SparkleIcon,
  QuoteIcon,
  TextIcon,
  ShapesIcon,
  CheckCircleIcon,
} from "lucide-react";
import { getEmbedUrl } from "@/utils/editor";

export type CommandItemProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: ReactNode;
  shortcut?: string;
};

export type CommandSeparatorProps = {
  id: string;
  type: "separator";
};

export type SuggestionItem = CommandItemProps | CommandSeparatorProps;

export const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    {
      id: "heading2",
      title: "Heading 2",
      category: "Base",
      description: "Medium section heading",
      searchTerms: ["base", "heading", "medium", "h2", "##"],
      icon: <Heading2Icon size={15} strokeWidth={1} absoluteStrokeWidth />,
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      id: "heading3",
      title: "Heading 3",
      category: "Base",
      description: "Small section heading",
      searchTerms: ["base", "heading", "small", "h3", "###"],
      icon: <Heading3Icon size={15} />,
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      id: "callout",
      title: "Callout",
      category: "Base",
      description: "Make text standout",
      searchTerms: ["base", "panel", "info"],
      icon: <InfoIcon className="size-4 opacity-70" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setCallout().run();
      },
    },
    {
      id: "bullet-list",
      title: "Bullet List",
      category: "Base",
      description: "Create a simple bullet list",
      searchTerms: ["Base", "unordered", "point"],
      icon: <ListIcon className="size-4 opacity-70" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      id: "blockquote",
      title: "Blockquote",
      category: "Base",
      description: "Capture a quote",
      searchTerms: ["blockquote"],
      icon: <QuoteIcon className="size-4 opacity-70" />,
      command: ({ editor, range }: any) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
    },
    {
      id: "codeblock",
      title: "Codeblock",
      category: "Base",
      description: "Create a code snippet",
      searchTerms: ["base", "code", "codeblock"],
      icon: <CodeIcon className="size-4 opacity-70" />,
      command: ({ editor, range }: any) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      id: "task-list",
      title: "To-do List",
      category: "Base",
      description: "Track tasks and to-dos",
      searchTerms: ["todo", "task", "list"],
      icon: <CheckCircleIcon className="size-4 opacity-70" />,
      command: ({ editor, range }: any) =>
        editor.chain().focus().deleteRange(range).toggleTaskList().run(),
    },
    {
      id: "embed",
      title: "Embed",
      category: "Media",
      description: "Embed from Loom, Figma and more",
      searchTerms: [
        "media",
        "embed",
        "video",
        "media",
        "figma",
        "loom",
        "youtube",
      ],
      icon: <ShapesIcon className="size-4 opacity-70" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).run();

        const url = window.prompt("Enter the URL:");
        const embedUrl = getEmbedUrl(url);

        if (embedUrl) {
          editor.chain().focus().setIframe({ src: embedUrl }).run();
        }

        return;
      },
    },
  ].filter((item) => {
    if (typeof query === "string" && query.length > 0) {
      const search = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        (item.searchTerms &&
          item.searchTerms.some((term: string) => term.includes(search)))
      );
    }
    return true;
  });
};
