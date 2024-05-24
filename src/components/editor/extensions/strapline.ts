import { mergeAttributes, Node } from "@tiptap/core";

/**
 * Strapline Extension
 * Custom H5 element gives sub-heading to h1, like Notion
 * TODO: Consider moving from H5 as breaks cascading headings
 */

export interface HeadingOptions {
  HTMLAttributes: Record<string, any>;
}

/* eslint-disable no-unused-vars */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    strapline: {
      /**
       * Set a heading node
       */
      setStrapline: (attributes: any) => ReturnType;
    };
  }
}
/* eslint-disable no-unused-vars */

export const Strapline = Node.create<HeadingOptions>({
  name: "strapline",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: "inline*",

  group: "block",

  defining: true,

  parseHTML() {
    return [{ tag: "h5" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "h5",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setStrapline:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },
});
