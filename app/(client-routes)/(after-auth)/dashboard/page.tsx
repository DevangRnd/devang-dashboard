"use client";

import { useUserStore } from "@/store/userStore";
import { motion } from "framer-motion";
import DashboardCard from "@/components/DashboardCard";
import {
  Sun,
  CheckCircle,
  AlertTriangle,
  Map,
  Grid,
  Home,
  Users,
  Leaf,
  Zap,
  Cable,
  LucideIcon,
  Loader2,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

import WelcomeCard from "@/components/WelcomeCard";
const DashboardPage = () => {
  const { isLoading } = useUserStore();

  const pathname = usePathname();

  const mockData = [
    {
      title: "SOLAR STREET LIGHTS",
      value: 16899,
      color: "bg-amber-400",
      iconColor: "text-amber-100",
      icon: Sun,
      category: "Lights Info",
      hasView: false,
      info: "This card shows the total lights provided.",
    },
    {
      title: "HEALTHY SOLAR LIGHTS",
      value: 16464,
      color: "bg-emerald-500",
      iconColor: "text-emerald-100",
      icon: CheckCircle,
      category: "Lights Info",
      hasView: false,
      info: "This card shows the total healthy lights.",
    },
    {
      title: "FAULTY SOLAR LIGHTS",
      value: 435,
      color: "bg-rose-500",
      iconColor: "text-rose-100",
      icon: AlertTriangle,
      category: "Lights Info",
      hasView: true,
      viewPath: `${pathname}/faulty-lights`,
      info: "This card shows the faulty  lights.",
    },
    {
      title: "UNPLUGGED CONTROLLERS",
      value: 10,
      color: "bg-red-500",
      iconColor: "text-white",
      icon: Cable,
      category: "Lights Info",
      hasView: true,
      viewPath: `${pathname}/unplugged-controllers`,
      info: "The lights which would not send data for 72 hours due to any fault would move to this card.",
    },
    {
      title: "TOTAL DISTRICTS",
      value: 12,
      color: "bg-slate-500",
      iconColor: "text-slate-100",
      icon: Map,
      category: "Location Info",
      hasView: true,
      viewPath: `${pathname}/total-districts`,
      info: "The total No of districts.",
    },
    {
      title: "TOTAL BLOCKS",
      value: 46,
      color: "bg-cyan-500",
      iconColor: "text-cyan-100",
      icon: Grid,
      category: "Location Info",
      hasView: true,
      viewPath: `${pathname}/total-blocks`,
      info: "The total No of districts.",
    },
    {
      title: "TOTAL PANCHAYATS",
      value: 450,
      color: "bg-fuchsia-500",
      iconColor: "text-fuchsia-100",
      icon: Home,
      category: "Location Info",
      hasView: true,
      viewPath: `${pathname}/total-panchayats`,
      info: "The total No of panchayats.",
    },
    {
      title: "TOTAL WARDS",
      value: 55,
      color: "bg-orange-500",
      iconColor: "text-orange-100",
      icon: Users,
      category: "Location Info",
      hasView: true,
      viewPath: `${pathname}/total-wards`,
      info: "The total No of wards.",
    },
    {
      title: "CO2 EMISSION REDUCED",
      value: "2.6M KG",
      color: "bg-teal-500",
      iconColor: "text-teal-100",
      icon: Leaf,
      category: "Energy Info",
      hasView: false,
      info: "The total amount of CO2 emission reduced.",
    },
    {
      title: "ENERGY SAVINGS",
      value: "2.8M KWH",
      color: "bg-indigo-500",
      iconColor: "text-indigo-100",
      icon: Zap,
      category: "Energy Info",
      hasView: false,
      info: "The total amount of energy saved.",
    },
  ];
  interface DashboardData {
    title: string;
    value: number | string;
    color: string;
    iconColor: string;
    icon: LucideIcon;
    category: string;
    hasView: boolean;
    viewPath?: string;
    info: string;
  }
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const groupedData = mockData.reduce<Record<string, DashboardData[]>>(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-4/5 mx-auto">
      <WelcomeCard />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {Object.entries(groupedData).map(([category, items], categoryIndex) => (
          <motion.div
            key={category}
            variants={categoryVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 p-4">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
              {items.map((data, index) => (
                <DashboardCard
                  key={`${data.title}-${index}`}
                  title={data.title}
                  value={data.value}
                  icon={data.icon}
                  color={data.color}
                  iconColor={data.iconColor}
                  index={categoryIndex * items.length + index}
                  info={data.info}
                  hasView={data.hasView}
                  viewPath={data.viewPath}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DashboardPage;
