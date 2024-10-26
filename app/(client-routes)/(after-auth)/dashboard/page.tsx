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

const DashboardPage = () => {
  const { isLoading } = useUserStore();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const mockData: DashboardData[] = [
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
      info: "This card shows the faulty lights.",
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
      info: "The total No of blocks.",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
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
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <WelcomeCard />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {Object.entries(groupedData).map(([category, items], categoryIndex) => (
          <motion.div
            key={category}
            variants={categoryVariants}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((data, index) => (
                <motion.div
                  key={`${data.title}-${index}`}
                  variants={cardVariants}
                  custom={categoryIndex * items.length + index}
                >
                  <DashboardCard
                    title={data.title}
                    value={data.value}
                    icon={data.icon}
                    color={data.color}
                    iconColor={data.iconColor}
                    info={data.info}
                    hasView={data.hasView}
                    viewPath={data.viewPath}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DashboardPage;
