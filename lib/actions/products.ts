"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "../auth";
import { prisma } from "../prisma";
import { z } from "zod";
import { redirect } from "next/navigation";

const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce
    .number()
    .int()
    .nonnegative("Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

export async function deleteProduct(id: string) {
  const user = await getUser();

  await prisma.product.deleteMany({
    where: {
      id,
      userId: user?.id,
    },
  });

  revalidatePath("/inventory");
}

export async function createProduct(formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  const parsedData = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || undefined,
  });

  if (!parsedData.success) {
    throw new Error("Validation failed");
  }

  try {
    await prisma.product.create({
      data: { ...parsedData.data, userId: user.id },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create product");
  }

  revalidatePath("/dashboard");
  redirect("/inventory");
}
