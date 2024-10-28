"use client";
import React from "react";
import lightAnimation from "@/assets/not-foundanimation.json";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="flex h-[100dvh] flex-col-reverse items-center justify-between overflow-hidden md:flex-col">
      <div className="w-[35%] scale-90">
        <Lottie animationData={lightAnimation} loop={false} />
      </div>
      <div className="my-4 flex flex-col">
        <h1 className="my-4 text-3xl font-bold">Oh No..You Are lost</h1>
        <Button onClick={() => router.replace("/dashboard")}>
          <ArrowLeftIcon className="mr-3" />
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
