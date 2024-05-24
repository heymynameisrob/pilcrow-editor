import { mergeAttributes, Node } from "@tiptap/core";

/**
 * Callout Extension
 * Container in well-style that breaks out from usual content, like Notion
 */

export interface CalloutOptions {
  /**
   * An emoji that should be used as a prefix.
   */
  emoji: string;
  /**
   * Custom HTML attributes that should be added to the rendered HTML tag.
   */
  HTMLAttributes: Record<string, any>;
}

/* eslint-disable no-unused-vars */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      /**
       * Set a callout
       */
      setCallout: (attributes?: any) => ReturnType;
      /**
       * Toggle a callout
       */
      toggleCallout: (attributes?: any) => ReturnType;
    };
  }
}
/* eslint-disable no-unused-vars */

const Callout = Node.create<CalloutOptions>({
  name: "callout",
  content: "inline*",
  group: "block",
  defining: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: "section",
        preserveWhitespace: false,
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "section",
      mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
        this.options.emoji ? { "data-emoji": this.options.emoji } : {},
      ),
      ["p", { class: "!m-0 w-full prose-p" }, 0],
    ];
  },
  addKeyboardShortcuts() {
    return {
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty, $anchor } = this.editor.state.selection;
        const isAtStart = $anchor.pos === 1;

        if (!empty || $anchor.parent.type.name !== this.name) {
          return false;
        }

        if (isAtStart || !$anchor.parent.textContent.length) {
          return this.editor.commands.clearNodes();
        }

        return false;
      },
      "Shift-Enter": () => {
        return this.editor.commands.setHardBreak();
      },
    };
  },
  addCommands() {
    return {
      setCallout:
        (attributes: any) =>
        ({ commands }: any) => {
          return commands.setNode(this.name, attributes);
        },
      toggleCallout:
        (attributes: any) =>
        ({ commands }: any) => {
          return commands.toggleNode(this.name, "paragraph", attributes);
        },
    };
  },
});

export default Callout;
