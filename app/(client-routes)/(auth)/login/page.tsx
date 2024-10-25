// * Just a simple form here will implement logically here
"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FlipWords } from "@/components/ui/flip-words";
import ShimmerButton from "@/components/ui/shimmer-button";

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
        title: "Logged In Succesfully",
        description: "Redirecting..",
        duration: 2000,
      });
      router.replace("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error?.message || "Error Occured",
          variant: "destructive",
          duration: 2000,
        });
      } else {
        toast({
          title: "Error Occurred",
          description: "An unexpected error occurred during sign up",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
  };

  const isLoginDisabled = !email || !password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
      {isLoading || user ? (
        <FlipWords
          className="text-5xl font-bold"
          words={["Logging In", "Hold Tight", "Please Wait"]}
        />
      ) : (
        <Card className="w-full max-w-md">
          <form onSubmit={handleLogin}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
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
                  placeholder="Enter Your Password here.."
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-sm text-right">
                <Link
                  href="/forgot-password"
                  className="text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging In
                </Button>
              ) : (
                <Button
                  className="w-full disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoginDisabled}
                >
                  Log In
                </Button>
              )}

              <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default LoginPage;
