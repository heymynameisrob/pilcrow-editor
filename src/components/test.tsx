"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const TestDialog = () => (
  <Dialog open={true}>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>Test</DialogContent>
  </Dialog>
);
