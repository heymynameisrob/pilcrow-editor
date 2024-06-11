"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlusIcon } from "@radix-ui/react-icons";

export const DashboardNewDoc = ({ onSelect }: { onSelect: any }) => {
  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-start justify-center gap-3 cursor-pointer rounded-md group outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-black dark:focus:ring-white dark:focus:ring-offset-black"
    >
      <AspectRatio
        tabIndex={-1}
        ratio={4 / 3}
        className="p-3 grid place-items-center rounded-md text-left overflow-hidden bg-neutral-100 border border-black/10 pointer-events-none group-hover:bg-blue-500 dark:border-white/10 dark:bg-neutral-800"
      >
        <div className="flex flex-col items-center gap-3">
          <PlusIcon />
          <small className="font-medium">New document...</small>
        </div>
      </AspectRatio>
    </button>
  );
};
