"use client";

import { useParams } from "next/navigation";
import UpdateProductForm from "../../_components/UpdateProductForm";

export default function UpdateProductPage() {
  const params = useParams();
  const productId = params.id as string;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <div className="w-full max-w-md">
        <UpdateProductForm productId={productId} />
      </div>
    </div>
  );
}
