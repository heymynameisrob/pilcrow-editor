"use client";

import { Title } from "@/components/title";
import { TopMenu } from "@/components/top-menu";

export const TopBar = () => (
  <div className="fixed w-full bg-gradient-to-b from-white to-transparent z-40 top-0 left-0 flex gap-2 flex-row items-center justify-between px-2 py-2 h-14 backdrop-blur-sm dark:from-neutral-950 md:backdrop-blur-none md:absolute md:px-4">
    <Title />
    <TopMenu />
  </div>
);
