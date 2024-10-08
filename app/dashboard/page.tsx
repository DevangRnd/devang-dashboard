"use client";
// import NumberTicker from "@/components/ui/number-ticker";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

const DashboardPage = () => {
  const { user, getUser } = useUserStore();
  console.log(user?.name);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      {/* <NumberTicker value={20000} /> */}
      <span className="dark:text-white test-black text-2xl">{user?.name}</span>
    </div>
  );
};

export default DashboardPage;
