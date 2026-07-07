import { Prisma } from "./generated/prisma/client";

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}> & {
  images: Record<string, string>; // narrow Prisma's Json type
};
