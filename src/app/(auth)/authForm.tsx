"use client";

import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
  Label,
} from "@/components";
import { useLogin, useRegister } from "@/services";
import { LoginFormValues } from "@/types";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const router = useRouter();
  const loginHook = useLogin();
  const registerHook = useRegister();

  const { mutate, isPending } = mode === "login" ? loginHook : registerHook;

  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(
          mode === "login" ? "Login successful!" : "Registration successful!",
          {
            description: mode === "login" ? `Welcome back` : `Welcome aboard!`,
          }
        );
        Cookies.set("access_token", res.accessToken);
        Cookies.set("refresh_token", res.refreshToken);
        router.push("/");
      },
      onError: (error: Error) => {
        toast.error(mode === "login" ? "Login failed" : "Registration failed", {
          description: error.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-linear-to-br from-white via-teal-50 to-teal-100">
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="relative w-full max-w-md">
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-12 left-0 flex items-center gap-2 text-gray-600 hover:text-teal-600"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <Card className="w-full bg-transparent border-none shadow-none">
            <CardHeader className="space-y-3 pb-2">
              <CardTitle className="text-3xl font-bold text-gray-900">
                {mode === "login" ? "Welcome Back 👋" : "Create an Account 🚀"}
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                {mode === "login"
                  ? "Access your workspace and start creating slides"
                  : "Join us and design slides that impress"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {mode === "register" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        {...register("name", { required: true })}
                        className="rounded-xl"
                      />
                    </div>
                  </>
                ) : null}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", { required: true })}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", { required: true })}
                    className="rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl py-2.5"
                  disabled={isPending}
                >
                  {isPending
                    ? mode === "login"
                      ? "Signing in..."
                      : "Creating account..."
                    : mode === "login"
                    ? "Sign In"
                    : "Sign Up"}
                </Button>

                <p className="text-sm mt-3 text-gray-600">
                  {mode === "login" ? (
                    <>
                      Don’t have an account?{" "}
                      <Link
                        href="/register"
                        className="text-teal-600 font-semibold hover:underline"
                      >
                        Sign up
                      </Link>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="text-teal-600 font-semibold hover:underline"
                      >
                        Sign in
                      </Link>
                    </>
                  )}
                </p>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    window.location.href =
                      "http://localhost:8080/api/auth/google";
                  }}
                  variant="outline"
                  className="flex items-center gap-2 w-full rounded-xl border-gray-300 hover:bg-gray-50"
                >
                  <FcGoogle className="h-5 w-5" /> Google
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center rounded-3xl">
        <Image
          src="/auth-ill.png"
          alt="Auth illustration"
          width={700}
          height={700}
          className="rounded-3xl object-contain"
        />
      </div>
    </div>
  );
}
