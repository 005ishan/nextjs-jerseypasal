import ProductTable from "./_components/ProductTable";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products Management</h1>

        <Link
          href="/admin/products/create"
          className="px-4 py-2 rounded-xl bg-foreground text-background text-sm"
        >
          + Create Product
        </Link>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>

        <CardContent>
          <ProductTable />
        </CardContent>
      </Card>
    </div>
  );
}
