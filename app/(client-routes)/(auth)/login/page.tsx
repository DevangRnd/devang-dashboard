"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import solarAnimation from "@/assets/solarAnimationTwo.json";
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
import { Loader2 } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import Lottie from "lottie-react";

const LoginPage = () => {
  const { login, isLoading, user } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
        <FlipWords
          className="text-5xl font-bold text-white"
          words={["Logging In", "Hold Tight", "Please Wait"]}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="mx-auto flex w-full max-w-7xl">
        <div className="flex w-1/2 items-center justify-center p-8">
          <Card className="w-full max-w-md">
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
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Enter Your Password here.."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-right text-sm">
                  <Link
                    href="/forgot-password"
                    className="text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
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
                {/* <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-blue-500 hover:underline"
                  >
                    Sign up
                  </Link>
                </div> */}
              </CardFooter>
            </form>
          </Card>
        </div>
        <div className="flex w-1/2 items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Lottie animationData={solarAnimation} loop />
          </div>
        </div>
      </div>
      <span className="text-white">
        &copy; {new Date().getFullYear()} MukhyaMantri Solar Street Light Yojana
      </span>
    </div>
  );
};

export default LoginPage;
