import {
  BoldIcon,
  CodeBracketIcon,
  ItalicIcon,
  LinkIcon,
  UnderlineIcon,
} from "@heroicons/react/16/solid";
import { Toggle } from "@/components/ui/toggle";

import type { Editor } from "@tiptap/react";
import { Tooltip } from "@/components/ui/tooltip";

export const ToolbarFormat = ({ editor }: { editor: Editor }) => {
  const onSetLink = () => {
    const isLink = editor.isActive("link");

    if (isLink) {
      editor.commands.unsetLink();
      return;
    }

    const url = window.prompt("Enter the URL of the link:");
    if (url) editor.commands.setLink({ href: url });
  };

  return (
    <div className="flex justify-center items-center">
      <Tooltip content="Bold">
        <Toggle
          size="icon"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.commands.toggleBold()}
        >
          <BoldIcon className="size-4 opacity-70" />
        </Toggle>
      </Tooltip>
      <Tooltip content="Italic">
        <Toggle
          size="icon"
          pressed={editor.isActive("italic")}
          title="Italic"
          aria-label="Italic"
          data-microtip-position="top"
          role="tooltip"
          onPressedChange={() => editor.commands.toggleItalic()}
        >
          <ItalicIcon className="size-4 opacity-70" />
        </Toggle>
      </Tooltip>
      <Tooltip content="Underline">
        <Toggle
          size="icon"
          pressed={editor.isActive("underline")}
          title="Underline"
          aria-label="Underline"
          data-microtip-position="top"
          role="tooltip"
          onPressedChange={() => editor.commands.toggleUnderline()}
        >
          <UnderlineIcon className="size-4 opacity-70" />
        </Toggle>
      </Tooltip>
      <Tooltip content="Link">
        <Toggle
          size="icon"
          pressed={editor.isActive("link")}
          title="Link"
          aria-label="Link"
          data-microtip-position="top"
          role="tooltip"
          onPressedChange={onSetLink}
        >
          <LinkIcon className="size-4 opacity-70" />
        </Toggle>
      </Tooltip>
      <Tooltip content="Code">
        <Toggle
          size="icon"
          pressed={editor.isActive("code")}
          title="Inline code"
          aria-label="Inline code"
          data-microtip-position="top"
          role="tooltip"
          onPressedChange={() => editor.commands.toggleCode()}
        >
          <CodeBracketIcon className="size-4 opacity-70" />
        </Toggle>
      </Tooltip>
    </div>
  );
};
