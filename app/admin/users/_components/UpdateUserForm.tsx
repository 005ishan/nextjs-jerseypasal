"use client";

import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleUpdateUser } from "@/lib/actions/admin/user-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface UpdateUserFormProps {
  user: any;
}

export default function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState(user.role || "user");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("email", email);
        formData.append("role", role);

        const response = await handleUpdateUser(user._id, formData);
        if (!response.success) throw new Error(response.message || "Update failed");

        toast.success("User updated successfully");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
      } catch (error: any) {
        console.error(error);
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    });
  };

  const isLoading = loading || pending;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="rounded-3xl shadow-xl border overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-blue-500 to-purple-500" />

          <CardHeader className="pt-8 pb-2 px-8">
            <div className="flex flex-col items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                ✏️
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Update User
              </CardTitle>
              <p className="text-sm text-muted-foreground text-center">
                Edit the user's email address or role below.
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={submit} className="space-y-5">

              {/* Current user badge */}
              <div className="flex items-center gap-3 bg-muted/50 border rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {user.email?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Editing user</p>
                  <p className="text-sm font-medium truncate">{user.email}</p>
                </div>
                <span className={`ml-auto text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                  user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {user.role}
                </span>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Email Address</Label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl h-11 px-4 text-sm focus-visible:ring-primary"
                />
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Role</Label>
                <div className="flex gap-3">
                  {["user", "admin"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition capitalize ${
                        role === r
                          ? r === "admin"
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-primary text-white border-primary"
                          : "bg-background text-muted-foreground border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {r === "admin" ? "🛡️" : "👤"} {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading || success}
                className={`w-full h-11 rounded-xl font-semibold text-sm transition-all ${
                  success ? "bg-green-500 hover:bg-green-500" : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Updating...
                  </span>
                ) : success ? (
                  <span className="flex items-center justify-center gap-2">✓ Updated!</span>
                ) : (
                  "Update User"
                )}
              </Button>

            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}