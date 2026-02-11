"use client";

import axios from "@/lib/api/axios";
import { PRODUCT } from "@/lib/api/endpoints";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ProductTable() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const res = await axios.get(PRODUCT.GET_ALL);
    setProducts(res.data.data);
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(PRODUCT.DELETE(id));
      toast.success("Product Deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-2">
                {p.imageUrl && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${p.imageUrl}`}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                )}
              </td>

              <td>{p.name}</td>
              <td>Rs. {p.price}</td>

              <td className="space-x-2">
                <Link href={`/admin/products/${p._id}`}>
                  <Button size="sm">View</Button>
                </Link>

                <Link href={`/admin/products/${p._id}/edit`}>
                  <Button size="sm" variant="secondary">
                    Edit
                  </Button>
                </Link>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteProduct(p._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
