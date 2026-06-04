"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "../auth";
import { prisma } from "../prisma";

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
