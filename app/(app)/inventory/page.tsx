import AppPagination from "@/components/app-pagination";
import ProductsTable from "@/components/products-table";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/lib/actions/products";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Search } from "lucide-react";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getUser();
  const userId = user?.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();

  const pageSize = 5;
  const page = Math.max(1, Number(params.page ?? 1));

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const serializedItems = items.map((item) => ({
    ...item,
    price: Number(item.price),
  }));

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="min-h-screen bg-page">
      <main className="p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Inventory
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your products and track inventory levels
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div className="bg-popover/70 rounded-lg border border-border p-6">
            <form action="/inventory" method="GET" className="flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="Search Products..."
                className="w-full md:flex-1 px-4 py-2 border border-border rounded-lg"
              />
              <Button
                type="submit"
                variant="default"
                className="h-11 px-4 md:px-2">
                <Search /> <span className="md:block hidden">Search</span>
              </Button>
            </form>
          </div>

          {/* Products Table */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-popover">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-popover-foreground/80 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-popover-foreground/80 uppercase">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-popover-foreground/80 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-popover-foreground/80 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-popover-foreground/80 uppercase">
                      Low Stock At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-popover-foreground/80 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <ProductsTable items={serializedItems} />
              </table>
            </div>
          </div>
          {totalPages > 1 && (
            <div className="bg-popover rounded-lg border border-border p-6">
              <AppPagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl="/inventory"
                searchParams={{
                  q,
                  pageSize: String(pageSize),
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
