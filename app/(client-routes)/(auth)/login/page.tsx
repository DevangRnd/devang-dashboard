"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import solarAnimation from "@/assets/solar-animation.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2, MoonIcon, SunIcon } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import Lottie from "lottie-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LoginPage = () => {
  const { login, isLoading, user } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setTheme } = useTheme();
  const [viewPassword, setViewPassword] = useState(false);
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Logged In Successfully",
        description: "Redirecting..",
        duration: 2000,
      });
      router.replace("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error?.message || "Error Occurred",
          variant: "destructive",
          duration: 2000,
        });
      } else {
        toast({
          title: "Error Occurred",
          description: "An unexpected error occurred during login",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
  };

  const isLoginDisabled = !email || !password;

  if (isLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-pink-300 to-blue-600 dark:from-slate-900 dark:to-slate-700">
        <FlipWords
          className="text-5xl font-bold text-white"
          words={["Logging In", "Hold Tight", "Please Wait"]}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-fuchsia-300 to-rose-200 dark:from-slate-900 dark:to-slate-700">
      <div className="mx-auto flex w-full max-w-7xl">
        <div className="flex w-1/2 items-center justify-center p-8">
          <Card className="relative w-full max-w-md">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-4 mt-4" variant="outline" size="icon">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <form onSubmit={handleLogin}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-center text-2xl font-bold">
                  Log in to your account
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter Your Email Here.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={`${viewPassword ? "text" : "password"}`}
                    required
                    placeholder="Enter Your Password here.."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {viewPassword ? (
                    <EyeOff
                      onClick={() => setViewPassword(!viewPassword)}
                      size={20}
                      className="absolute right-3 top-[1.93rem] cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={() => setViewPassword(!viewPassword)}
                      size={20}
                      className="absolute right-3 top-[1.93rem] cursor-pointer"
                    />
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  className="w-full disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoginDisabled || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging In
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        <div className="flex w-1/2 items-center justify-center p-8">
          <div className="w-full max-w-md scale-150">
            <Lottie animationData={solarAnimation} loop />
          </div>
        </div>
      </div>
      <span className="font-bold text-black dark:text-white">
        &copy; {new Date().getFullYear()} MukhyaMantri Solar Street Light Yojana
      </span>
    </div>
  );
};

export default LoginPage;
