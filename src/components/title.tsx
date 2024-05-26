"use client";

import { useContext } from "react";
import moment from "moment";
import { DocContext } from "@/context/doc";

export const Title = () => {
  const { title, lastSaved } = useContext(DocContext);

  return (
    <div className="flex items-baseline gap-1">
      <small className="font-medium">{title}</small>
      <small className="opacity-70">{moment(lastSaved).fromNow()}</small>
    </div>
  );
};
