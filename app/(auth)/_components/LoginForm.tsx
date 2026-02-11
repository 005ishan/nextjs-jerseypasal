"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoginData, loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { handleLogin } from "@/lib/actions/auth-action";
import Link from "next/link";
import { AppToast } from "@/lib/toast";

import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [pending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values: LoginData) => {
    setServerError(null);

    startTransition(async () => {
      try {
        const response = await handleLogin(values);

        if (response.success && response.data) {
          login(response.data);
          reset();
          AppToast.success("Logged in successfully");

          const { token, role } = response.data;

          localStorage.setItem("token", token);

          if (role === "admin") {
            router.push("/admin");
          } else {
            router.push("/auth/dashboard");
          }
        } else {
          setServerError(response.message ?? "Invalid email or password");
          AppToast.error(response.message ?? "Invalid email or password");
        }
      } catch (err: any) {
        setServerError(err.message ?? "Invalid email or password");
      }
    });
  };

  const loading = isSubmitting || pending;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        {/* EMAIL */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-[#161499] font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="yourmail@example.com"
            className="h-10 w-full rounded-md border border-black/10 bg-background px-3 text-sm outline-none focus:border-foreground/40"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-[#161499] font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="h-10 w-full rounded-md border border-black/10 bg-background px-3 pr-10 text-sm outline-none focus:border-foreground/40"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 text-xs opacity-70 hover:opacity-100"
              onClick={() => setShowPassword((p) => !p)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        <Link
          href="/request-password-reset"
          className="text-[#161499] text-sm block text-right"
        >
          Forget Password?
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="h-10 w-full rounded-md bg-[#F25019] text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60 mt-2"
        >
          {loading ? "Logging in ↻" : "Login"}
        </button>

        <p className="text-[#161499] text-sm text-center mt-2">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold">
            Register
          </Link>
        </p>
      </form>
    </>
  );
}
