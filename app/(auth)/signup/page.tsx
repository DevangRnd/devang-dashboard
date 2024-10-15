"use client";
import React, { useState } from "react";
import Link from "next/link";
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
import { Check, X, AlertTriangle, Loader2 } from "lucide-react";
import { useUserStore } from "@/store/userStore"; // Import the Zustand store
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUp, isLoading, isError } = useUserStore();
  const passwordCriteria = [
    { label: "At least 8 characters", regex: /.{8,}/ },
    // { label: "At least one uppercase letter", regex: /[A-Z]/ },
    // { label: "At least one lowercase letter", regex: /[a-z]/ },
    // { label: "At least one number", regex: /\d/ },
    // {
    //   label: "At least one special character",
    //   regex: /[!@#$%^&*(),.?":{}|<>]/,
    // },
  ];

  const checkPasswordStrength = (value: string) => {
    return passwordCriteria.map((criterion) => ({
      ...criterion,
      isMet: criterion.regex.test(value),
    }));
  };

  const passwordStrength = checkPasswordStrength(password);
  const allCriteriaMet = passwordStrength.every((criterion) => criterion.isMet);
  const passwordsMatch = password === confirmPassword && password !== "";

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (allCriteriaMet && passwordsMatch) {
      try {
        await signUp(name, email, password);
        toast({
          title: "Account created successfully!",
          description: "You are now being redirected to the dashboard.",
        });
        router.replace("/dashboard");
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: isError || "Error Occured",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error Occurred",
            description: "An unexpected error occurred during sign up",
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
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
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Password Strength:</p>
              <div className="grid grid-cols-2 gap-2">
                {passwordStrength.map((criterion, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {criterion.isMet ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm ${
                        criterion.isMet ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      {criterion.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {password && confirmPassword && !passwordsMatch && (
              <div className="mt-4 flex items-center space-x-2 text-yellow-500">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">Passwords do not match</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing Up..Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full max-w-md"
                disabled={!allCriteriaMet || !passwordsMatch || isLoading}
              >
                Sign Up
              </Button>
            )}
            <div className="text-sm text-center text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUpPage;
