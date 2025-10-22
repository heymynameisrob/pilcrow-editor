import * as React from "react";

import { cn } from "@/utils";
import { useOS } from "@/hooks/useOS";

const KEY_SYMBOLS: Record<string, Record<string, string>> = {
  mac: {
    shift: "⇧",
    mod: "⌘",
    alt: "⌥",
    ctrl: "⌃",
    enter: "↵",
    escape: "⎋",
  },
  windows: {
    shift: "⇧",
    mod: "Ctrl",
    alt: "Alt",
    ctrl: "Ctrl",
    enter: "↵",
    escape: "Esc",
  },
  linux: {
    shift: "⇧",
    mod: "Ctrl",
    alt: "Alt",
    ctrl: "Ctrl",
    enter: "↵",
    escape: "Esc",
  },
  default: {
    shift: "Shift",
    mod: "Ctrl",
    alt: "Alt",
    ctrl: "Ctrl",
    enter: "Enter",
    escape: "Esc",
  },
};

function getKeySymbol(key: string, os: string): string {
  const osMap =
    KEY_SYMBOLS[os as keyof typeof KEY_SYMBOLS] || KEY_SYMBOLS.default;
  return osMap[key.toLowerCase()] || key;
}

export function Key({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const os = useOS();

  return (
    <kbd
      className={cn(
        "bg-black/5 text-primary pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded px-1 font-sans text-xs font-medium select-none dark:bg-white/5",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className,
      )}
    >
      {getKeySymbol(children as string, os)}
    </kbd>
  );
}

export function Keys({ keys }: { keys: string[] }) {
  const os = useOS();

  return (
    <div className="flex items-center gap-1">
      {keys.map((key) => (
        <Key key={key}>{getKeySymbol(key, os)}</Key>
      ))}
    </div>
  );
}
