import AppPagination from "@/components/app-pagination";
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
                className="flex-1 px-4 py-2 border border-border rounded-lg"
              />
              <Button type="submit" variant="default" className="h-11">
                <Search /> Search
              </Button>
            </form>
          </div>

          {/* Products Table */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
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

              <tbody className="bg-popover/60 divide-y divide-popover-foreground/70">
                {items.map((product, key) => (
                  <tr key={key} className="hover:bg-popover-foreground/20">
                    <td className="px-6 py-4 text-sm text-popover-foreground/70 ">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-popover-foreground/70 ">
                      {product.sku || "--"}
                    </td>
                    <td className="px-6 py-4 text-sm text-popover-foreground ">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-popover-foreground ">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-popover-foreground/70 ">
                      {product.lowStockAt || "--"}
                    </td>
                    <td className="px-6 py-4 text-sm text-popover-foreground/70 ">
                      <form action={deleteProduct.bind(null, product.id)}>
                        <Button variant="destructive" type="submit">
                          Delete
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
