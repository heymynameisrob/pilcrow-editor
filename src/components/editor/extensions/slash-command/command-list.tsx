"use client";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { Editor } from "@tiptap/react";
import { toast } from "sonner";
import { useCompletion } from "ai/react";
import { updateScrollView } from "@/components/editor/extensions/slash-command";
import { CommandItemProps } from "@/components/editor/extensions/slash-command/suggestions";
import { CommandListItem } from "@/components/editor/extensions/slash-command/command-list-item";
import { getPreviousText } from "@/utils/editor";


export const CommandList = ({
  items,
  editor,
  command,
}: {
  items: Array<CommandItemProps>;
  editor: Editor;
  command: any;
  range?: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  /**
   * AI Completion for 'Continue Writing'.
   * Uses 'ai/complete' endpoint.
   */
  const { complete, isLoading } = useCompletion({
    id: "complete",
    api: "api/ai/complete",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        // TODO: Add VA tracking
        return;
      }
    },
    onError: (e) => {
      toast.error(e.message);
      // TODO: Add VA tracking
    },
  });

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];

      if (item && item.id === "ai-complete") {
        if (isLoading) return;
        const selection = editor?.state.selection;
        if (!selection) return;

        editor?.commands.deleteRange({
          from: selection.from - 1,
          to: selection.from,
        });
        return complete(
          getPreviousText(editor, {
            chars: 500,
            offset: 1,
          }),
        );
      }

      return command(item);
    },
    [complete, isLoading, command, editor, items],
  );

  /**
   * Handle keyboard events for navigating the list.
   * Tippy.js doesn't provide out-of-the-box support for this.
   */
  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
    const onKeyDown = (e: KeyboardEvent) => {
      console.log("Keydown", e.key);
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }
        if (e.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }
        if (e.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [items, selectedIndex, setSelectedIndex, selectItem]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const commandListContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = commandListContainer?.current;

    const item = container?.children[selectedIndex] as HTMLElement;

    if (item && container) updateScrollView(container, item);
  }, [selectedIndex]);

  return items.length > 0 ? (
    <div
      id="slash-command"
      ref={commandListContainer}
      className="dark z-50 w-80 h-auto max-h-[330px] overflow-y-auto bg-black rounded-lg border border-white/10 p-1 text-white animate-in shadow-lg"
    >
      {items.map((item: CommandItemProps, index: number) => {
        return (
          <CommandListItem
            key={item.id}
            item={item}
            index={index}
            selectedIndex={selectedIndex}
            isLoading={isLoading}
            onSelect={selectItem}
          />
        );
      })}
    </div>
  ) : null;
};
