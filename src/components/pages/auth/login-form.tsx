"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignInMutation } from "@/services/auth/auth-api";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ApiError {
  data?: {
    errors?: { message: string }[];
  };
}

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");

  const [signIn, { isSuccess, isLoading, error, data }] = useSignInMutation();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors({
        ...validationErrors,
        [name]: "",
      });
    }

    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
    };

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signIn(formData).unwrap();
    } catch (err: unknown) {
      const apiError = err as ApiError;
      if (apiError.data?.errors?.length) {
        setApiError(apiError.data.errors[0].message);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  useEffect(() => {
    if (isSuccess && data) {
      //@ts-expect-error
      const { access_token, refresh_token, expires } = data.data;

      //localStorage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      const expirationTime = Date.now() + expires * 1000;
      localStorage.setItem("token_expires_at", expirationTime.toString());

      toast.success("Login successful!");
      router.push("/dashboard");
    }
  }, [isSuccess, data, router]);

  return (
    <Card className="w-full max-w-md border-0 shadow-none ">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <Image alt="logo" src={"/logo.png"} width={60} height={60} />
          </div>
          <span className="font-bold text-3xl text-[#006D21]">SLDA</span>
        </div>
        <CardTitle className="text-md font-semibold text-green-700">
          Somaliland Diaspora Engagement Platform.
        </CardTitle>
        <CardDescription className="text-base font-medium text-gray-900 mt-4">
          Welcome Back !
        </CardDescription>
        <p className="text-sm text-[#74788D]">Sign in to continue to Skote.</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {apiError && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {apiError}
            </div>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              className={`h-11 border-gray-300 text-[#495057] focus:border-green-500 focus:ring-green-500 ${
                validationErrors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }`}
            />
            {validationErrors.email && (
              <p className="text-sm text-red-600">{validationErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              className={`h-11 border-gray-300 text-[#495057] focus:border-green-500 focus:ring-green-500 ${
                validationErrors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }`}
            />
            {validationErrors.password && (
              <p className="text-sm text-red-600">
                {validationErrors.password}
              </p>
            )}
          </div>

          <div className="pt-2">
            <p className="text-xs flex items-center gap-2 text-gray-600 mb-4">
              <input type="checkbox" className="w-5 h-5 rounded-[4px]" />
              <span className="text-[#495057] text-xl ">remember</span>
            </p>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full h-11 bg-[#006D21] hover:bg-green-700 text-white font-medium cursor-pointer"
            >
              {isLoading ? <Loader2 className="animate-spin " /> : "Login"}
            </Button>
          </div>
        </form>

        <div className="pt-4 text-center">
          <p className=" text-gray-600 text-xs">
            Don&apos;t have an account?
            <a href="#" className="text-green-600 hover:underline font-medium">
              Signup now
            </a>
          </p>
        </div>

        <div className="pt-6 text-center -mt-8">
          <p className="text-xs text-gray-500 ">
            2025© Somaliland Diaspora Engagement Platform
          </p>
          <p className="text-xs text-gray-500">
            ❤️ Design & Develop by Tiigsi Solutions
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
