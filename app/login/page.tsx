// * Just a simple form here will implement logically here
"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulating authentication process and setting cookie
    const loginDetails = { email, password }; // Normally you'd get this from an API response
    Cookies.set("loginDetails", JSON.stringify(loginDetails), { expires: 1 }); // Cookie expires in 1 day
    router.push("/dashboard");
    console.log(loginDetails);
  };

  const isLoginDisabled = !email || !password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
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
                placeholder="john@example.com"
                required
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
            <Button
              className="w-full disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoginDisabled}
            >
              Log In
            </Button>
            <div className="text-sm text-center text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
