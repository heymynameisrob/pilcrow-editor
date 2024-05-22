'use client';

import { ReactNode } from "react";
import { motion } from "framer-motion";

export const MotionDiv = (props: any) => (
  <motion.div {...props}>{props.children}</motion.div>
)
