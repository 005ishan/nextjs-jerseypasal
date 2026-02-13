"use client";

import { useState, useRef, useTransition } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
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
  const [previewImage, setPreviewImage] = useState<string | null>(
    user.imageUrl
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.imageUrl}`
      : null,
  );
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [pending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      setPreviewImage(null);
      setImageFile(undefined);
    }
  };

  const handleDismissImage = () => {
    setPreviewImage(null);
    setImageFile(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("email", email);
        formData.append("role", role);
        if (imageFile) formData.append("image", imageFile);

        const response = await handleUpdateUser(user._id, formData);

        if (!response.success)
          throw new Error(response.message || "Update failed");

        toast.success("Profile updated successfully");
      } catch (error: any) {
        console.error(error);
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-lg border">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Update User
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              {/* Profile Image */}
              <div className="flex flex-col items-center space-y-2">
                {previewImage ? (
                  <div className="relative w-24 h-24">
                    <img
                      src={previewImage}
                      alt="Profile Image"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleDismissImage}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600">No Image</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) => handleImageChange(e.target.files?.[0])}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label>Role</Label>
                <select
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={loading || pending}
                className="w-full rounded-xl"
              >
                {loading || pending ? "Updating..." : "Update User"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
