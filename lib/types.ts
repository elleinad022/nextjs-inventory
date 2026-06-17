import { Product } from "./generated/prisma/client";

export type SerializedProduct = Omit<Product, "price"> & { price: number };
