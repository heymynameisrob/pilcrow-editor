"use client";

import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import { DashboardIcon } from "@radix-ui/react-icons";
import { DashboardDocs } from "@/components/dashboard/dash-docs";

export const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);

  useHotkeys("Mod+/", () => setOpen(!open), {
    enableOnContentEditable: true,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Toggle
          size="sm"
          title="Dashboard • ⌘/"
          aria-label="Dashboard • ⌘/"
          data-microtip-position="bottom-right"
          role="tooltip"
          pressed={open}
          onPressedChange={setOpen}
        >
          <DashboardIcon />
        </Toggle>
      </DialogTrigger>
      <DialogContent
        showOverlay={false}
        className="inset-0 origin-center translate-y-0 translate-x-0 max-w-none border-none w-screen h-screen bg-white/50 backdrop-blur-md dark:bg-black/50"
      >
        <div className="flex flex-col gap-4">
          <DialogHeader>Documents</DialogHeader>
          <DashboardDocs handleSetOpen={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
