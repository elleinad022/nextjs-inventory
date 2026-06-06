import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createProduct } from "@/lib/actions/products";
import { getUser } from "@/lib/auth";
import Link from "next/link";

export default async function AddProductPage() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-page">
      <main className="p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Add Products
              </h1>
              <p className="text-sm text-muted-foreground">
                Add a new product to your inventory
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="bg-card rounded-lg border border-border p-6">
            <form action={createProduct} className="space-y-6">
              <Field>
                <FieldLabel
                  htmlFor="name"
                  className="block text-sm font-medium text-card-foreground mb-2">
                  Product Name *
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg h-10"
                  placeholder="Enter product name"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FieldLabel
                      htmlFor="price"
                      className="block text-sm font-medium text-card-foreground mb-2">
                      Price *
                    </FieldLabel>
                    <Input
                      id="price"
                      type="number"
                      name="price"
                      step="0.01"
                      min="0"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg h-10"
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <FieldLabel
                      htmlFor="quantity"
                      className="block text-sm font-medium text-card-foreground mb-2">
                      Quantity *
                    </FieldLabel>
                    <Input
                      id="quantity"
                      type="number"
                      name="quantity"
                      min="0"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg h-10"
                      placeholder="0"
                    />
                  </div>
                </div>
                <FieldLabel
                  htmlFor="sku"
                  className="block text-sm font-medium text-card-foreground mb-2">
                  SKU (optional)
                </FieldLabel>
                <Input
                  id="sku"
                  type="text"
                  name="sku"
                  className="w-full px-4 py-2 border border-border rounded-lg h-10"
                  placeholder="Enter SKU"
                />
                <div>
                  <FieldLabel
                    htmlFor="lowStockAt"
                    className="block text-sm font-medium text-card-foreground mb-2">
                    Low Stock At (optional)
                  </FieldLabel>
                  <Input
                    id="lowStockAt"
                    type="number"
                    name="lowStockAt"
                    min="0"
                    className="w-full px-4 py-2 border border-border rounded-lg h-10"
                    placeholder="Enter low stock threshold"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" size="lg" variant="default">
                    Add Product
                  </Button>
                  <div className="flex items-center bg-secondary border border-border rounded-lg hover:bg-secondary/80">
                    <Link
                      href="/inventory"
                      className="text-sm font-normal text-foreground px-3">
                      Cancel
                    </Link>
                  </div>
                </div>
              </Field>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
