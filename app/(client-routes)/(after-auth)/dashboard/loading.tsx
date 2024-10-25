"use client";

import lightAnimation from "@/assets/light-bulb-animation.json";
import Lottie from "lottie-react";
const loading = () => {
  return (
    <div className="h-screen grid place-items-center z-10000 bg-[rgba(0,0,0.5)] inset-0 fixed">
      <Lottie animationData={lightAnimation} loop={true} />
    </div>
  );
};

export default loading;
