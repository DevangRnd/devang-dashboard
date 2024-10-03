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
import { Check, X, AlertTriangle } from "lucide-react";

const SignUpPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordCriteria = [
    { label: "At least 8 characters", regex: /.{8,}/ },
    { label: "At least one uppercase letter", regex: /[A-Z]/ },
    { label: "At least one lowercase letter", regex: /[a-z]/ },
    { label: "At least one number", regex: /\d/ },
    {
      label: "At least one special character",
      regex: /[!@#$%^&*(),.?":{}|<>]/,
    },
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
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
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
          <Button
            className="w-full max-w-md"
            disabled={!allCriteriaMet || !passwordsMatch}
          >
            Sign Up
          </Button>
          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
