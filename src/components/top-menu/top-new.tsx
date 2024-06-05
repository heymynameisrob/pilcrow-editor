"use client";

import { Button } from "@/components/ui/button";
import { useDocs } from "@/hooks/docs";
import { PlusIcon } from "@radix-ui/react-icons";
import { useHotkeys } from "react-hotkeys-hook";

export const TopMenuNewDocument = () => {
  useHotkeys("n", () => newDocument(), {
    enableOnContentEditable: false,
    enableOnFormTags: false,
  });

  const { newDocument } = useDocs();

  return (
    <Button
      size="sm"
      variant="ghost"
      title="New document"
      aria-label="New document"
      data-microtip-position="bottom"
      role="tooltip"
      onClick={newDocument}
    >
      <PlusIcon />
    </Button>
  );
};
