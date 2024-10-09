import React from "react";
import { LucideIcon, Info } from "lucide-react";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  index: number;
  info: string;
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
  iconColor,
  index,
  info,
}: DashboardCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className={`group relative overflow-hidden w-full h-32 ${color} dark:bg-opacity-80 rounded-lg shadow-sm`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-black/30" />
      <div className="relative z-10 h-full p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-semibold text-white dark:text-gray-200 uppercase tracking-wider">
            {title}
          </h3>
          <div
            className={`group-hover:-rotate-12 group-hover:scale-125 transition-transform p-1.5 rounded-full ${iconColor} bg-white/20 dark:bg-black/20`}
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold text-white dark:text-gray-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              delay: 0.2 + index * 0.05,
            }}
          >
            {typeof value === "number" ? value.toLocaleString() : value}
          </motion.div>
          <Popover>
            <PopoverTrigger>
              <Info className="text-black dark:text-white" size={20} />
              {/* <span>Info</span> */}
            </PopoverTrigger>
            <PopoverContent>{info}</PopoverContent>
          </Popover>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30 dark:bg-black/30"
        whileHover={{ scaleX: [1, 1.5, 1] }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
