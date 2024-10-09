"use client";
import React from "react";
import animation from "@/assets/404-animation.json";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col justify-center items-center">
      <div className="h-3/4 overflow-hidden">
        <Lottie animationData={animation} loop={true} />
      </div>
      <h1 className="text-3xl font-bold my-4">Oh No..You Are lost</h1>
      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
};

export default NotFoundPage;
