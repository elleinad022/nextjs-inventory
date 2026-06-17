"use client";

import ProductSheet from "./product-sheet";
import { Product } from "@/lib/generated/prisma/client";
import { useState } from "react";
import { Button } from "./ui/button";
import { deleteProduct } from "@/lib/actions/products";
import { SerializedProduct } from "@/lib/types";

export default function ProductsTable({
  items,
}: {
  items: SerializedProduct[];
}) {
  const [selectedProduct, setSelectedProduct] =
    useState<SerializedProduct | null>(null);

  return (
    <>
      <ProductSheet
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null);
        }}
      />

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
              ₱{product.price.toFixed(2)}
            </td>
            <td className="px-6 py-4 text-sm text-popover-foreground ">
              {product.quantity}
            </td>
            <td className="px-6 py-4 text-sm text-popover-foreground/70 ">
              {product.lowStockAt || "--"}
            </td>
            <td className="px-6 py-4 text-sm text-popover-foreground/70 flex flex-row gap-2">
              <form action={deleteProduct.bind(null, product.id)}>
                <Button variant="destructive" type="submit">
                  Delete
                </Button>
              </form>

              <Button
                variant="outline"
                type="button"
                onClick={() => setSelectedProduct(product)}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
