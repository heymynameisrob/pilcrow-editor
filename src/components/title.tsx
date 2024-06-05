"use client";

import { useContext } from "react";
import { DocContext } from "@/context/doc";
import { getTimeFromNow } from "@/utils/time";

export const Title = () => {
  const { title, lastSaved } = useContext(DocContext);

  return (
    <div className="flex items-baseline gap-1">
      <small className="font-medium">{title || "Untitled"}</small>
      <small className="opacity-70">{getTimeFromNow(lastSaved)}</small>
    </div>
  );
};
