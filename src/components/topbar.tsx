import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { Doc } from "@/utils/types";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/16/solid";

export function TopBar({
  document,
  userId,
}: {
  document: Doc;
  userId: string;
}) {
  return (
    <nav
      role="navigation"
      className="flex items-center justify-between px-4 h-12 md:px-2"
    >
      <span className="text-sm text-gray-10 font-medium">{document.title}</span>
      <div className="flex items-center justify-end gap-1">
        <Tooltip content="Jump to • ⌘J">
          <Button size="icon" variant="ghost">
            <MagnifyingGlassIcon className="size-4 opacity-70" />
          </Button>
        </Tooltip>
        <Tooltip content="New • ⇧N">
          <Button size="icon" variant="ghost">
            <PlusIcon className="size-4 opacity-70" />
          </Button>
        </Tooltip>
      </div>
    </nav>
  );
}
