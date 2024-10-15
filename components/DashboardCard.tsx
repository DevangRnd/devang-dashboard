import React from "react";
import { LucideIcon, Info, CircleDotIcon } from "lucide-react";
import { motion } from "framer-motion";

import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  index: number;
  info: string;
  hasView: boolean;
  viewPath?: string;
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
  hasView,
  viewPath,
}: DashboardCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className={`group relative overflow-hidden w-full h-36 ${color} dark:bg-opacity-80 rounded-lg shadow-sm`}
    >
      <div className="relative z-10 h-full p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-semibold text-white dark:text-gray-200 uppercase tracking-wider">
            {title}
          </h3>
          <div
            className={`group-hover:scale-125 transition-transform p-1.5 rounded-full ${iconColor} bg-white/20 dark:bg-black/20`}
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <motion.div
          className="text-2xl font-bold text-white dark:text-gray-100 flex justify-between"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            delay: 0.2 + index * 0.05,
          }}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
          <div className="flex gap-5 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
            {hasView && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={viewPath || "#"}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <CircleDotIcon size={20} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit Page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <Popover>
              <PopoverTrigger>
                <Info className="text-black dark:text-white" size={20} />
              </PopoverTrigger>
              <PopoverContent>{info}</PopoverContent>
            </Popover>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
