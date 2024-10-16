"use client";
import React from "react";
import lightAnimation from "@/assets/light-bulb-animation.json";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="h-[100dvh] overflow-hidden flex md:flex-col flex-col-reverse justify-center items-center">
      <div className="h-3/4 overflow-hidden">
        <Lottie animationData={lightAnimation} loop={true} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold my-4">Oh No..You Are lost</h1>
        <Button onClick={() => router.replace("/dashboard")}>
          <ArrowLeftIcon className="mr-3" />
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
