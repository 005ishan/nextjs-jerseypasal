"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordReset } from "@/lib/api/auth";
import { toast } from "react-toastify";
export const RequestPasswordResetSchema = z.object({
  email: z.email(),
});

export type RequestPasswordResetDTO = z.infer<
  typeof RequestPasswordResetSchema
>;
export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestPasswordResetDTO>({
    resolver: zodResolver(RequestPasswordResetSchema),
  });
  const onSubmit = async (data: RequestPasswordResetDTO) => {
    try {
      const response = await requestPasswordReset(data.email);
      if (response.success) {
        toast.success("Password reset link sent to your email.");
      } else {
        toast.error(response.message || "Failed to request password reset.");
      }
    } catch (error) {
      toast.error(
        (error as Error).message || "Failed to request password reset.",
      );
    }
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-[#161499]">
        Request Password Reset
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
        <div className="mb-4">
          <label className="text-[#161499] font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="h-10 w-full rounded-md border border-black/10 bg-background px-3 pr-10 text-sm outline-none focus:border-foreground/40"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="h-10 w-full rounded-md bg-[#F25019] text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60 mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
