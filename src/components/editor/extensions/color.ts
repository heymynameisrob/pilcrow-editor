import "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";

/**
 * Custom Color Extension
 * Tiptap's extension uses style attribute to set color
 * This extension uses Tailwind classes instead (as we're using Tailwind Typography for editor styles)
 * 
 */

export type ColorOptions = {
  types: string[];
};

/* eslint-disable no-unused-vars */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    color: {
      /**
       * Set the text color
       */
      setColor: (color: string) => ReturnType;
      /**
       * Unset the text color
       */
      unsetColor: () => ReturnType;
    };
  }
}
/* eslint-disable no-unused-vars */

export const Color = Extension.create<ColorOptions>({
  name: "color",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (element) => {
              return element.hasAttribute("data-color")
                ? element.getAttribute("data-color")
                : null;
            },
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {};
              }

              return {
                "data-color": attributes.color,
                class: attributes.color,
                style: ``, // Add an empty style attribute because TextStyle removes spans without a style attribute
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setColor:
        (color) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { color }).run();
        },
      unsetColor:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { color: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
