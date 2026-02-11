"use client";

import { useParams } from "next/navigation";
import UpdateProductForm from "../../_components/UpdateProductForm";
import Link from "next/link";

export default function UpdateProductPage() {
  const params = useParams();
  const productId = params.id as string;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start p-4">
      {/* Back button */}
      <div className="self-start mb-4">
        <Link
          href="/admin/products"
          className="text-blue-500 hover:underline"
        >
          ← Back to Products
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Edit Jersey</h1>

      <div className="w-full max-w-md">
        <UpdateProductForm productId={productId} />
      </div>
    </div>
  );
}
