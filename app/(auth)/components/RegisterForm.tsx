"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterData } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values: RegisterData) => {
    setServerError(null);

    startTransition(async () => {
      try {
        await new Promise((res) => setTimeout(res, 2000));

        if (values.email === "fail@example.com") {
          throw new Error("Email already in use");
        }

        reset();
        router.push("/auth/dashboard");
      } catch (err: any) {
        setServerError(err.message ?? "Something went wrong. Try again.");
      }
    });
  };

  const loading = isSubmitting || pending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      {/* EMAIL */}
      <div className="flex flex-col space-y-0.5">
        <label htmlFor="email" className="text-[#161499] font-semibold mb-0.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="yourmail@example.com"
          className="h-9 w-full rounded-md border border-black/10 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("email")}
        />
        <div className="h-4">
          {errors.email?.message && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* PASSWORD */}
      <div className="flex flex-col space-y-0.5">
        <label htmlFor="password" className="text-[#161499] font-semibold mb-0.5">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••"
            className="h-9 w-full rounded-md border border-black/10 bg-background px-3 pr-10 text-sm outline-none focus:border-foreground/40"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 text-xs opacity-70 hover:opacity-100"
            onClick={() => setShowPassword((p) => !p)}
            tabIndex={-1}
          >
            {showPassword ? <img src="/icons/eyeclosed.svg" className="h-5 w-5" alt="Hide"/> : <img src="/icons/eye.svg" className="h-5 w-5" alt="Show"/>}
          </button>
        </div>
        <div className="h-4">
          {errors.password?.message && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="flex flex-col space-y-0.5">
        <label htmlFor="confirmPassword" className="text-[#161499] font-semibold mb-0.5">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••••"
            className="h-9 w-full rounded-md border border-black/10 bg-background px-3 pr-10 text-sm outline-none focus:border-foreground/40"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 text-xs opacity-70 hover:opacity-100"
            onClick={() => setShowConfirmPassword((p) => !p)}
            tabIndex={-1}
          >
            {showConfirmPassword ? <img src="/icons/eyeclosed.svg" className="h-5 w-5" alt="Hide"/> : <img src="/icons/eye.svg" className="h-5 w-5" alt="Show"/>}
          </button>
        </div>
        <div className="h-4">
          {errors.confirmPassword?.message && (
            <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {/* REGISTER BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="h-9 w-full rounded-md bg-[#F25019] text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60 mt-2"
      >
        {loading ? " Creating user ↻ " : "Sign up"}
      </button>

      {/* SOCIAL LOGIN */}
      <div className="text-center mt-3 text-[#161499] text-sm">
        or continue with
      </div>
      <div className="flex justify-center items-center gap-12 mt-2">
        <div className="bg-white w-20 h-10 rounded-4xl border flex items-center justify-center cursor-pointer">
          <img src={"/icons/google.svg"} className="w-5 h-5"/>
        </div>
        <div className="bg-white w-20 h-10 rounded-4xl border flex items-center justify-center cursor-pointer">
          <img src={"/icons/facebook.svg"} className="w-5 h-5"/>
        </div>
      </div>

      {/* LOGIN LINK */}
      <p className="text-[#161499] text-sm block text-center mt-2">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
}
