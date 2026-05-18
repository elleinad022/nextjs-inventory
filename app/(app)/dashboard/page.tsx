import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await getUser();
  const userId = user.id;
  const totalProducts = await prisma.product.count({
    where: {
      userId,
    },
  });
  const lowStockProducts = await prisma.product.count({
    where: {
      userId,
    },
  });
  const recentProducts = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const allProducts = await prisma.product.findMany({
    where: {userId},
    
  })

  return (
    <div className="min-h-screen bg-page">
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
      </main>
    </div>
  );
}
