"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.35 }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
