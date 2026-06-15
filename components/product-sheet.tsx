"use client";

import { updateProduct } from "@/lib/actions/products";
import { Product } from "@/lib/generated/prisma/client";
import { useTransition } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ProductSheetProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductSheet({
  product,
  open,
  onOpenChange,
}: ProductSheetProps) {
  const [isPending, startTransition] = useTransition();

  if (!product) return null;

  function handleUpdate(formData: FormData) {
    startTransition(async () => {
      await updateProduct(product!.id, formData);
      onOpenChange(false);
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{product.name}</SheetTitle>
          <SheetDescription>
            Manage product details and update stock levels
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="edit" className="px-6 flex-1 overflow-y-auto">
          <TabsList variant="line">
            <TabsTrigger value="edit">Edit Details</TabsTrigger>
            <TabsTrigger value="restock">Restock</TabsTrigger>
            <TabsTrigger value="adjust">Adjust Stock</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Edit Details Tab */}
          <TabsContent value="edit">
            <form action={handleUpdate} className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={product.name} />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="sku">
                  SKU{" "}
                  <span className="text-muted-foreground text-sm">
                    (optional)
                  </span>
                </Label>
                <Input id="sku" name="sku" defaultValue={product.sku ?? ""} />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  step="0.01"
                  type="number"
                  defaultValue={Number(product.price)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="lowStockAt">Low Stock Alert</Label>
                <Input
                  id="lowStockAt"
                  name="lowStockAt"
                  type="number"
                  defaultValue={Number(product.lowStockAt ?? "")}
                />
              </div>

              <SheetFooter className="">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving" : "Save Changes"}
                </Button>
              </SheetFooter>
            </form>
          </TabsContent>

          {/* Placeholder tabs — to be added next */}
          <TabsContent value="restock">
            <p className="text-muted-foreground py-4">Coming soon</p>
          </TabsContent>
          <TabsContent value="adjust">
            <p className="text-muted-foreground py-4">Coming soon</p>
          </TabsContent>
          <TabsContent value="history">
            <p className="text-muted-foreground py-4">Coming soon</p>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
