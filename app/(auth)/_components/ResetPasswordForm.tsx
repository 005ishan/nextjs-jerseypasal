"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleResetPassword } from "@/lib/actions/auth-action";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm({ token }: { token: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordDTO>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: ResetPasswordDTO) => {
    try {
      const response = await handleResetPassword(token, data.password);
      if (response.success) {
        toast.success("Password reset successfully");
        router.replace("/login");
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <h1 className="text-2xl font-black text-[#161499]">Reset Password</h1>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="text-[#161499] font-semibold mb-1 block"
        >
          New Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          className="h-10 w-full rounded-md border border-black/10 bg-background px-3 pr-10 text-sm outline-none focus:border-foreground/40"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="text-[#161499] font-semibold mb-1 block"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
          className="h-10 w-full rounded-md border border-black/10 bg-background px-3 pr-10 text-sm outline-none focus:border-foreground/40"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-4 text-sm mb-4">
        <Link href="/login" className="text-blue-500 hover:underline">
          Back to Login
        </Link>
        <Link
          href="/request-password-reset"
          className="text-blue-500 hover:underline"
        >
          Request another reset email
        </Link>
      </div>

      <button
        type="submit"
        className="h-10 w-full rounded-md bg-[#F25019] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
