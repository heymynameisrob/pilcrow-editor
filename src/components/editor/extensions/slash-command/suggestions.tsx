import { ReactNode } from "react";
// import { uploadEditorImage } from "@/components/tiptap/extensions/image-upload";
import {
  CheckBoxIcon,
  CodeIcon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  InfoIcon,
  ListIcon,
  MagicWandIcon,
  MixIcon,
  QuoteIcon,
  TextIcon,
} from "@/components/icons";
import { getEmbedUrl } from "@/utils/editor";

export type CommandItemProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: ReactNode;
};

export const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    {
      id: "ai-complete",
      title: "Continue writing",
      category: "AI",
      description: "Use AI to expand your thoughts",
      searchTerms: ["gpt", "ai"],
      icon: <MagicWandIcon />,
    },
    {
      id: "strapline",
      title: "Strapline",
      category: "Base",
      description: "A subtitle for your document",
      searchTerms: ["base", "subtitle", "strapline"],
      icon: <TextIcon />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setStrapline().run();
      },
    },
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
      icon: <InfoIcon />,
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
      icon: <ListIcon />,
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
      icon: <QuoteIcon />,
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
      icon: <CodeIcon />,
      command: ({ editor, range }: any) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      id: "task-list",
      title: "To-do List",
      category: "Base",
      description: "Track tasks and to-dos",
      searchTerms: ["todo", "task", "list"],
      icon: <CheckBoxIcon />,
      command: ({ editor, range }: any) =>
        editor.chain().focus().deleteRange(range).toggleTaskList().run(),
    },
    // {
    //   id: "image",
    //   title: "Image",
    //   category: "Media",
    //   description: "Upload an image",
    //   searchTerms: ["media", "image", "photo", "picture", "media"],
    //   icon: <ImageIcon />,
    //   command: ({ editor, range }: any) => {
    //     editor.chain().focus().deleteRange(range).run();
    //     editor.commands.insertContent("<loading-component />");
    //     // upload image
    //     const input = document.createElement("input");
    //     input.type = "file";
    //     input.accept = "image/*";
    //     input.onchange = async () => {
    //       if (input.files?.length) {
    //         const file = input.files[0];
    //         uploadEditorImage(file).then((url: string) => {
    //           editor.chain().focus().setFigure({ src: url, caption: "" }).run();
    //         });
    //       }
    //     };
    //     input.click();
    //   },
    // },
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
      icon: <MixIcon />,
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
