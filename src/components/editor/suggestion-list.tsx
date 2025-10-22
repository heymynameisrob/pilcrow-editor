import * as React from "react";
import { cn } from "@/utils";

type SuggestionListProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export const SuggestionList = React.forwardRef<
  HTMLDivElement,
  SuggestionListProps
>(({ id, className, children }, ref) => {
  return (
    <div
      id={id}
      ref={ref}
      className={cn(
        "flex flex-col gap-px z-50 h-auto max-h-[min(600px,calc(100vh-12rem))] w-64 overflow-y-auto rounded-lg bg-background p-1 text-secondary shadow-popover animate-in animate-out dark:bg-gray-2 pointer-events-auto",
        className,
      )}
    >
      {children}
    </div>
  );
});

SuggestionList.displayName = "SuggestionList";

type SuggestionListItemProps = {
  isSelected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  className?: string;
};

export const SuggestionListItem = ({
  isSelected,
  onSelect,
  children,
  className,
}: SuggestionListItemProps) => {
  return (
    <button
      className={cn(
        "flex w-full flex-row items-center justify-between gap-2 rounded-md text-primary px-2 py-1.5 text-left text-sm hover:bg-gray-3 dark:hover:bg-gray-4 focus",
        isSelected && "bg-gray-3 dark:bg-gray-4",
        className,
      )}
      onClick={onSelect}
    >
      {children}
    </button>
  );
};

export const SuggestionListSeperator = () => {
  return <div className="-mx-1 my-1 border-t" />;
};
