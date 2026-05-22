import ProductsChart from "@/components/products-chart";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const user = await getUser();
  const userId = user.id;

  const [totalProducts, lowStockProducts, allProducts] = await Promise.all([
    prisma.product.count({
      where: {
        userId,
      },
    }),
    prisma.product.count({
      where: {
        userId,
        lowStockAt: { not: null },
        quantity: { lte: 5 },
      },
    }),
    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true, createdAt: true },
    }),
  ]);

  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

  const weeklyProductsData = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekStart.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, "0")}/${String(weekStart.getDate() + 1).padStart(2, "0")}`;

    const weekProducts = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    });
  }

  const recentProducts = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="min-h-screen w-full bg-page">
      <main className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-primary-foreground tracking-wide">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back! Here is an overview of you inventory.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ">
          {/* Key Metrics */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-card-foreground mb-6">
              Key Metrics
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-xl font-bold text-card-foreground">
                  {totalProducts}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Products
                </div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +{totalProducts}
                  </span>
                  <TrendingUp className="size-3 text-green-600 ml-1"></TrendingUp>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-card-foreground">
                  ${Number(totalValue).toFixed(0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Value</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +${Number(totalValue).toFixed(0)}
                  </span>
                  <TrendingUp className="size-3 text-green-600 ml-1"></TrendingUp>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-card-foreground">
                  {lowStockProducts}
                </div>
                <div className="text-sm text-muted-foreground">Low Stock</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +{lowStockProducts}
                  </span>
                  <TrendingUp className="size-3 text-green-600 ml-1"></TrendingUp>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory over time */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2>New products per week</h2>
            </div>
            <div className="h-48">
              <ProductsChart data={weeklyProductsData} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ">
          {/* Stock Levels */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-card-foreground">
                Stock Levels
              </h2>
            </div>
            <div className="space-y-3">
              {recentProducts.map((product, key) => {
                const stockLevel =
                  product.quantity === 0
                    ? 0
                    : product.quantity <= (product.lowStockAt || 5)
                      ? 1
                      : 2;

                const bgColors = [
                  "bg-red-600",
                  "bg-yellow-600",
                  "bg-green-600",
                ];
                const textColors = [
                  "text-red-600",
                  "text-yellow-600",
                  "text-green-600",
                ];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg bg-accent">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`size-3 rounded-full ${bgColors[stockLevel]}`}
                      />
                      <span className="text-sm font-medium text-accent-foreground">
                        {product.name}
                      </span>
                    </div>
                    <div
                      className={`text-sm font-medium ${textColors[stockLevel]}`}>
                      {product.quantity} units
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
