"use client";
import React from "react";
import Lottie from "lottie-react";
import animation from "@/assets/error-animation.json";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center overflow-hidden">
      <div className="h-3/4 overflow-hidden">
        <Lottie animationData={animation} />
      </div>
      <h1 className="my-4 text-3xl font-bold">Oh No..Some Error Occured</h1>
      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
};

export default NotFound;
