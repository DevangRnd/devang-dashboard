"use client";
import { useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const WelcomeCard = () => {
  const { getCurrentUser, user, isLoggedOut } = useUserStore();

  useEffect(() => {
    // Only call getCurrentUser if the user is not already in the store
    if (!user && !isLoggedOut) {
      getCurrentUser();
      console.log("Fired");
    }
  }, [getCurrentUser, user, isLoggedOut]); // Dependency array now includes `user`

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Welcome, {user?.name || "Guest"}
      </h1>

      <Badge>{user?.role || "Visitor"}</Badge>
    </div>
  );
};

export default WelcomeCard;
