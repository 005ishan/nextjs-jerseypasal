import Link from "next/link";
import ProductTable from "./_components/ProductTable";

export default function ProductsPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:opacity-90"
        >
          Create Product
        </Link>
      </div>

      <ProductTable />
    </div>
  );
}
