import React from "react";
import { LucideIcon, Info, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
      className={`group relative overflow-hidden w-full h-40 ${color} rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full bg-white/10 backdrop-blur-sm scale-0 group-hover:scale-100 transition-transform duration-300" />
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
      <div className="relative z-10 h-full p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-white dark:text-gray-100 uppercase tracking-wider">
            {title}
          </h3>
          <div
            className={`p-2 rounded-full ${iconColor} bg-white/20 dark:bg-black/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
          >
            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>

        <motion.div
          className="text-3xl font-bold text-white dark:text-gray-100"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            delay: 0.2 + index * 0.05,
          }}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </motion.div>

        <div className="flex justify-between items-center">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger>
                    <Info className="w-4 h-4 text-white/70 hover:text-white cursor-pointer transition-colors duration-200" />
                  </PopoverTrigger>
                  <PopoverContent>{info}</PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>More Info</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {hasView && (
            <Link
              href={viewPath || "#"}
              className="group flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              <span>View</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
