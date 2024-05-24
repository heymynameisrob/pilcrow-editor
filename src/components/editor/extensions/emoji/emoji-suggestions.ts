import tippy from "tippy.js";
import { ReactRenderer } from "@tiptap/react";
import { EmojiList } from "@/components/editor/extensions/emoji/emoji-list";

/**
 * Emoji suggestions extension
 * Uses tippy.js for inline popover suggestions of emojis
 */

/* eslint-disable import/no-anonymous-default-export */
export default {
  decorationClass: "suggestion inline text-[1em]",
  items: ({ editor, query }: any) => {
    return editor.storage.emoji.emojis
      .filter(({ shortcodes, tags }: any) => {
        return (
          shortcodes.find((shortcode: string) =>
            shortcode.startsWith(query.toLowerCase()),
          ) || tags.find((tag: string) => tag.startsWith(query.toLowerCase()))
        );
      })
      .slice(0, 5);
  },

  allowSpaces: false,

  render: () => {
    let component: any;
    let popup: any;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(EmojiList, {
          props,
          editor: props.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: any) {
        component.updateProps(props);

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === "Escape") {
          popup[0].hide();
          component.destroy();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
/* eslint-disable import/no-anonymous-default-export */
