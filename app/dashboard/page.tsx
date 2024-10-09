"use client";

import { useEffect } from "react";
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
} from "lucide-react";

const DashboardPage = () => {
  const { user, getUser } = useUserStore();

  const mockData = [
    {
      title: "SOLAR STREET LIGHTS",
      value: 16899,
      color: "bg-amber-400",
      iconColor: "text-amber-100",
      icon: Sun,
      category: "Lights Info",
      info: "This card shows the total lights provided.",
    },
    {
      title: "HEALTHY SOLAR LIGHTS",
      value: 16464,
      color: "bg-emerald-500",
      iconColor: "text-emerald-100",
      icon: CheckCircle,
      category: "Lights Info",
      info: "This card shows the total healthy lights.",
    },
    {
      title: "FAULTY SOLAR LIGHTS",
      value: 435,
      color: "bg-rose-500",
      iconColor: "text-rose-100",
      icon: AlertTriangle,
      category: "Lights Info",
      info: "This card shows the faulty  lights.",
    },
    {
      title: "UNPLUGGED CONTROLLERS",
      value: 10,
      color: "bg-red-500",
      iconColor: "text-white",
      icon: Cable,
      category: "Lights Info",
      info: "The lights which would not send data for 72 hours due to ay fault would move to this card.",
    },
    {
      title: "TOTAL DISTRICTS",
      value: 12,
      color: "bg-slate-500",
      iconColor: "text-slate-100",
      icon: Map,
      category: "Location Info",
      info: "The total No of districts.",
    },
    {
      title: "TOTAL BLOCKS",
      value: 46,
      color: "bg-cyan-500",
      iconColor: "text-cyan-100",
      icon: Grid,
      category: "Location Info",
      info: "The total No of districts.",
    },
    {
      title: "TOTAL PANCHAYATS",
      value: 450,
      color: "bg-fuchsia-500",
      iconColor: "text-fuchsia-100",
      icon: Home,
      category: "Location Info",
      info: "The total No of panchayats.",
    },
    {
      title: "TOTAL WARDS",
      value: 55,
      color: "bg-orange-500",
      iconColor: "text-orange-100",
      icon: Users,
      category: "Location Info",
      info: "The total No of wards.",
    },
    {
      title: "CO2 EMISSION REDUCED",
      value: "2.6M KG",
      color: "bg-teal-500",
      iconColor: "text-teal-100",
      icon: Leaf,
      category: "Energy Info",
      info: "The total amount of CO2 emission reduced.",
    },
    {
      title: "ENERGY SAVINGS",
      value: "2.8M KWH",
      color: "bg-indigo-500",
      iconColor: "text-indigo-100",
      icon: Zap,
      category: "Energy Info",
      info: "The total amount of energy saved.",
    },
  ];

  useEffect(() => {
    getUser();
  }, [getUser]);
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
  const groupedData = mockData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  return (
    <div className="w-4/5 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome, {user?.name}
        </h1>
      </div>
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
