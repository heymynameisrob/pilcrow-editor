"use client";

import { useTheme } from "next-themes";
import { CommandGroup } from "@/components/ui/command";
import { CommandItem } from "@/components/cmdk/cmd-item";
import { MoonIcon, SunIcon, TrashIcon } from "@/components/icons";

export const CommandGroupSettings = ({
  handleSetOpen,
}: {
  handleSetOpen: () => void;
}) => {
  const { theme, setTheme } = useTheme();

  const handleClearDatabase = () => {
    alert("Clear database");
  };

  const handleSetTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    handleSetOpen();
  };

  return (
    <>
      <CommandGroup heading="Settings">
        <CommandItem onSelect={handleSetTheme}>
          <div className="flex items-center gap-3">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            <small className="font-medium">
              {theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"}
            </small>
          </div>
        </CommandItem>
        <CommandItem onSelect={handleClearDatabase}>
          <div className="flex items-center gap-3">
            <TrashIcon />
            <small className="font-medium">Clear database storage</small>
          </div>
        </CommandItem>
      </CommandGroup>
    </>
  );
};
