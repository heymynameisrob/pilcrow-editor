'use client';

import { useContext } from "react";
import { DocContext } from "@/context/doc";

export const Title = () => {
 
  const { title } = useContext(DocContext);

  return(
    <small>{title}</small>
  )
};