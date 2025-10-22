import * as React from "react";
import { Key } from "@/components/ui/key";
import { SuggestionListItem } from "@/components/editor/suggestion-list";
import { CommandItemProps } from "@/components/editor/extensions/slash-command/suggestions";

/* eslint-disable no-unused-vars */
type CommandListItemProps = {
  item: CommandItemProps;
  index: number;
  selectedIndex: number;
  isLoading: boolean;
  onSelect: (index: number) => void;
};
/* eslint-disable no-unused-vars */

export const CommandListItem = ({
  item,
  index,
  selectedIndex,
  onSelect,
}: CommandListItemProps) => {
  return (
    <SuggestionListItem
      isSelected={selectedIndex === index}
      onSelect={() => onSelect(index)}
    >
      <div className="flex flex-row items-center justify-center gap-2 [&_svg]:pointer-events-none [&_svg]:opacity-70 [&_svg]:shrink-0">
        {item.icon}
        <p className="text-sm text-primary font-medium">{item.title}</p>
      </div>
      {item.shortcut && (
        <Key className="w-auto px-1 dark:border-secondary">{item.shortcut}</Key>
      )}
    </SuggestionListItem>
  );
};
