"use client";
import { useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
const WelcomeCard = () => {
  const { getCurrentUser, user } = useUserStore();
  console.log("card ran");
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Welcome, {user?.name}
      </h1>

      <Badge>{user?.role}</Badge>
    </div>
  );
};

export default WelcomeCard;
