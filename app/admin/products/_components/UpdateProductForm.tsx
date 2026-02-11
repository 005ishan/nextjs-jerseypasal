"use client";

import axios from "@/lib/api/axios";
import { PRODUCT } from "@/lib/api/endpoints";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

export default function UpdateProductForm({ product }: { product: any }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await axios.put(PRODUCT.UPDATE(product._id), formData);

      toast.success("Product Updated");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-md">
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <Label>Price</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <Label>Image</Label>
        <Input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>

      <Button disabled={loading}>
        {loading ? "Updating..." : "Update Product"}
      </Button>
    </form>
  );
}
