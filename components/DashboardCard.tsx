import React from "react";
import { LucideIcon, Info, ArrowRight } from "lucide-react";
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
  info: string;
  hasView: boolean;
  viewPath?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
  iconColor,
  info,
  hasView,
  viewPath,
}: DashboardCardProps) {
  return (
    <div
      className={`group relative h-40 w-full overflow-hidden ${color} rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl`}
    >
      <div className="absolute right-0 top-0 -mr-8 -mt-8 h-24 w-24 scale-0 rounded-full bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-100" />
      <div className="absolute inset-0 bg-white/5 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
      <div className="relative z-10 flex h-full flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium uppercase tracking-wider text-white dark:text-gray-100">
            {title}
          </h3>
          <div
            className={`rounded-full p-2 ${iconColor} bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 dark:bg-black/20`}
          >
            <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>

        <div className="text-3xl font-bold text-white dark:text-gray-100">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>

        <div className="flex items-center justify-between">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <button>
                      <Info className="h-4 w-4 cursor-pointer text-white" />
                    </button>
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
              className="group flex items-center gap-1 text-sm text-white/70 transition-colors duration-200 hover:text-white"
            >
              <span>View</span>
              <ArrowRight className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
