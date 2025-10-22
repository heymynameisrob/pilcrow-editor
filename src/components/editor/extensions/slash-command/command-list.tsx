import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useCurrentEditor } from "@tiptap/react";

import { updateScrollView } from "@/components/editor/extensions/slash-command";
import {
  CommandItemProps,
  SuggestionItem,
} from "@/components/editor/extensions/slash-command/suggestions";
import { CommandListItem } from "@/components/editor/extensions/slash-command/command-list-item";
import {
  SuggestionList,
  SuggestionListItem,
  SuggestionListSeperator,
} from "@/components/editor/suggestion-list";

export const CommandList = forwardRef(
  (
    {
      items,
      command,
      range,
    }: {
      items: Array<SuggestionItem>;
      command: any;
      range?: any;
    },
    ref,
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { editor } = useCurrentEditor();

    // Helper to check if an item is a separator
    const isSeparator = (item: SuggestionItem): boolean => {
      return "type" in item && item.type === "separator";
    };

    // Helper to find next non-separator index
    const findNextSelectableIndex = (
      currentIndex: number,
      direction: 1 | -1,
    ): number => {
      let nextIndex = currentIndex;
      do {
        nextIndex = (nextIndex + direction + items.length) % items.length;
      } while (isSeparator(items[nextIndex]) && nextIndex !== currentIndex);
      return nextIndex;
    };

    const selectItem = useCallback(
      (index: number) => {
        const item = items[index];

        // Don't select separators
        if (isSeparator(item)) return;

        if (item && item.id === "ai-complete") {
          const selection = editor?.state.selection;
          if (!selection) return;

          editor?.commands.deleteRange({
            from: selection.from - 1,
            to: selection.from,
          });
        }
        return command(item);
      },
      [command, editor, items],
    );

    /**
     * Expose keyboard handler to parent via ref.
     * This allows the TipTap suggestion plugin to call our handler and prevent editor from processing keys.
     */
    const onKeyDown = useCallback(
      ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          event.stopPropagation();
          setSelectedIndex(findNextSelectableIndex(selectedIndex, -1));
          return true;
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          event.stopPropagation();
          setSelectedIndex(findNextSelectableIndex(selectedIndex, 1));
          return true;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          event.stopPropagation();
          selectItem(selectedIndex);
          return true;
        }
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          // Returning true tells TipTap suggestion plugin that we handled the event
          // This will close the suggestion menu without bubbling to parent
          return true;
        }
        return false;
      },
      [items, selectedIndex, selectItem],
    );

    useImperativeHandle(ref, () => ({
      onKeyDown,
    }));

    useEffect(() => {
      // Set initial selection to first non-separator item
      const firstSelectableIndex = items.findIndex(
        (item) => !isSeparator(item),
      );
      setSelectedIndex(firstSelectableIndex >= 0 ? firstSelectableIndex : 0);
    }, [items]);

    const commandListContainer = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const container = commandListContainer?.current;

      const item = container?.children[selectedIndex] as HTMLElement;

      if (item && container) updateScrollView(container, item);
    }, [selectedIndex]);

    return items.length > 0 ? (
      <SuggestionList ref={commandListContainer}>
        {items.map((item: SuggestionItem, index: number) => {
          if (isSeparator(item)) {
            return <SuggestionListSeperator key={item.id} />;
          }
          return (
            <CommandListItem
              key={item.id}
              item={item as CommandItemProps}
              index={index}
              selectedIndex={selectedIndex}
              isLoading={false}
              onSelect={selectItem}
            />
          );
        })}
      </SuggestionList>
    ) : null;
  },
);

CommandList.displayName = "CommandList";
