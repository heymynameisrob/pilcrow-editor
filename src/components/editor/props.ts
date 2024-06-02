import { cn } from "@/utils";
import { EditorProps } from "@tiptap/pm/view";

export const defaultEditorProps: EditorProps = {
  attributes: {
    class: cn(
      "focus:outline-none",
      "prose prose-sm md:prose-base dark:prose-invert",
      "prose-code:before:hidden prose-code:after:hidden",
      "prose-h1:font-semibold prose-h2:font-medium prose-h3:font-medium prose-h4:font-medium prose-h5:font-regular prose-h6:font-regular",
      // Dynamic Metrics - https://d.rsms.me/inter-website/v3/dynmetrics/
      "prose-h1:tracking-[-0.0021em] prose-h2:tracking-[-0.0018em] prose-h3:tracking-[-0.0015em] prose-h4:tracking-[-0.0012em] prose-p:tracking-[-0.0011em]",
      "prose-h2:mb-[0.666em] prose-h3:mb-[0.666em]",
    ),
  },
  handleDOMEvents: {
    keydown: (_view, event) => {
      if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
        // prevent default event listeners from firing when slash command is active
        const slashCommand = document.querySelector("#slash-command");
        if (slashCommand) return true;
      }
    },
  },
};
