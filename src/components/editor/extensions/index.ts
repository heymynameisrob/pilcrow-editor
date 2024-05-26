import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Paragraph from "@tiptap/extension-paragraph";
import CharacterCount from "@tiptap/extension-character-count";
import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import { Color } from "@/components/tiptap/extensions/color";
// import CustomKeyMap from "@/components/tiptap/extensions/custom-keys";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Emoji from "@tiptap-pro/extension-emoji";
import FileHandler from "@tiptap-pro/extension-file-handler";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import ListKeymap from "@tiptap/extension-list-keymap";
import { Markdown } from "tiptap-markdown";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import TiptapLink from "@tiptap/extension-link";
import TiptapUnderline from "@tiptap/extension-underline";
import UniqueID from "@tiptap-pro/extension-unique-id";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Color } from "@/components/editor/extensions/color";
import emojiSuggestions from "@/components/editor/extensions/emoji/emoji-suggestions";

import CustomKeyMap from "@/components/editor/extensions/custom-keys";
import { InputRule } from "@tiptap/core";
import SlashCommand from "@/components/editor/extensions/slash-command";
import { Strapline } from "@/components/editor/extensions/strapline";
import Callout from "@/components/editor/extensions/callout";
import Iframe from "@/components/editor/extensions/iframe";
import { Figure } from "@/components/editor/extensions/figure";

export default [
  Document.extend({
    content: "heading block*",
  }),
  TiptapUnderline,
  TextStyle,
  Color,
  Markdown.configure({
    linkify: true,
    transformPastedText: true,
    html: true,
  }),
  Text,
  Heading.configure({
    levels: [1, 2, 3, 4],
  }),
  Bold,
  Italic,
  Strike,
  Paragraph,
  HardBreak,
  History,
  CustomKeyMap,
  CharacterCount,
  Image,
  SlashCommand,
  Strapline.configure({
    HTMLAttributes: {
      class:
        "strapline text-secondary prose text-[1.25em] font-normal leading-[inherit] mt-0 mb-[1.33em]",
    },
  }),
  Callout.configure({
    emoji: "📣",
    HTMLAttributes: {
      class:
        "relative p-4 pl-12 rounded-md bg-ui-low text-primary before:content-[attr(data-emoji)] before:absolute before:top-4 before:left-4 before:text-base",
    },
  }),
  // Loading,
  // AIBlock,
  Figure.configure({
    HTMLAttributes: {
      class:
        "flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    },
  }),
  Iframe.configure({
    HTMLAttributes: {
      class: "w-full aspect-video mb-[1.33em]",
    },
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "!pl-0 list-style-none",
    },
  }),
  TaskItem.configure({
    nested: true,
    HTMLAttributes: {
      class:
        "flex flex-row items-center gap-2 checked:line-through !my-0 [&_p]:m-0",
    },
  }),
  Emoji.configure({
    HTMLAttributes: {
      class: "inline text-[1em]",
    },
    enableEmoticons: true, // E.g. <3 will be converted to ❤️
    suggestion: emojiSuggestions,
  }),
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc list-outside leading-3 -mt-2",
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: "list-decimal list-outside leading-3 -mt-2",
    },
  }),
  ListItem.configure({
    HTMLAttributes: {
      class: "leading-normal -mb-2",
    },
  }),
  ListKeymap,
  Code.configure({
    HTMLAttributes: {
      class:
        "rounded-md bg-ui-low px-1.5 py-1 font-mono font-medium text-primary text-sm",
      spellcheck: "false",
    },
  }),
  // CodeBlockLowlight.extend({
  //   addNodeView() {
  //     return ReactNodeViewRenderer(CodeBlockComponent);
  //   },
  // }).configure({
  //   HTMLAttributes: {
  //     class: "rounded-lg bg-ui-low px-1.5 py-1 font-mono text-sm text-primary",
  //     spellcheck: "false",
  //   },
  //   lowlight,
  // }),
  Blockquote.configure({
    HTMLAttributes: {
      class: "border-l-4 border-primary",
    },
  }),
  Dropcursor.configure({
    color: "#DBEAFE",
    width: 4,
  }),
  UniqueID.configure({
    attributeName: "id",
    generateID: () => `tiptap-${Math.random().toString(36).slice(2, 9)}`, // 7 characters unique id
    types: [
      "heading",
      "paragraph",
      "codeBlock",
      "listItem",
      "blockquote",
      "callout",
    ],
  }),
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end),
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: "mt-4 mb-6 border-t border-black/10 dark:border-white/10",
    },
  }),
  TiptapLink.extend({
    inclusive: false,
  }).configure({
    linkOnPaste: true,
    HTMLAttributes: {
      class:
        "text-primary underline underline-offset-[3px] hover:text-opacity-70 transition-colors cursor-pointer",
    },
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "# Write something";
      }

      return "Type / for commands or start writing...";
    },
    includeChildren: true,
  }),
  // CustomHighlight.configure({
  //   multicolor: true,
  // }),
  FileHandler.configure({
    allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    onDrop: (currentEditor: any, files: Array<File>, pos: any) => {
      files.forEach((file: any) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          currentEditor
          .chain()
          .insertContentAt(pos, {
            type: "figure",
            attrs: {
              src: fileReader.result,
            },
          })
          .run();        
        };

        return false;
      });
    },
    onPaste: (
      currentEditor: any,
      files: Array<File>,
      htmlContent: string | undefined,
    ) => {
      if (htmlContent) {
        // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
        // you could extract the pasted file from this url string and upload it to a server for example
        console.log(htmlContent); // eslint-disable-line no-console
        return false;
      }
      // currentEditor.commands.insertContent("<loading-component />");

      files.forEach((file: any) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor.chain().focus().setFigure({ src: fileReader.result }).run();
        };
        return false;
      });
    },
  }),
];
