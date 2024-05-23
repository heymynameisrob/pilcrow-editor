'use client';

import { useContext } from "react";
import { DocContext } from "@/context/doc";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { AiIcon, MoreIcon, TrashIcon } from "@/components/icons";

export const TopMenu = () => {

  const { handleSetApiKey } = useContext(DocContext);

  const handleClearStorage = () => {
    confirm("Are you sure?") && 
      localStorage.clear();
      window.location.reload();    
  }

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Toggle        
        size="sm"        
        title="More"
        aria-label="More"
        data-microtip-position="bottom"
        role="tooltip"        
        className="data-[state=open]:bg-black/10 dark:data-[state=open]:bg-white/10 "
      >
        <MoreIcon />
      </Toggle>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">      
        <DropdownMenuItem 
          className="gap-2"
          onSelect={(e) => {
            e.preventDefault();
            handleSetApiKey();
          } 
        }>
          <AiIcon size={15} strokeWidth={1.5} />
          <>Add OpenAI key</>
        </DropdownMenuItem>    
        <DropdownMenuSeparator />
        <DropdownMenuItem 
        className="gap-2"
        onSelect={(e) => {
          e.preventDefault();
          handleClearStorage();
        }}>
          <TrashIcon />
          <>Clear storage</>
        </DropdownMenuItem>     
      </DropdownMenuContent>
    </DropdownMenu>
  )
}