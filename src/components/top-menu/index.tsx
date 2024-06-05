"use client";

import { TopMenuNewDocument } from "@/components/top-menu/top-new";
import { TopMenuMore } from "@/components/top-menu/top-more";

export const TopMenu = () => (
  <div className="flex justify-end items-center gap-1">
    <TopMenuNewDocument />
    <TopMenuMore />
  </div>
);
