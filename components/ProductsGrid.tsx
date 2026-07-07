import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";
import { ProductType } from "@/lib/schema";

const ProductsGrid = async ({
  categorySlug,
  gender,
  discountedOnly,
}: {
  categorySlug?: string;
  gender?: string;
  discountedOnly?: boolean;
}) => {
  const rows = await prisma.product.findMany({
    where: {
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      ...(gender ? { gender } : {}),
      ...(discountedOnly ? { offer: { not: null } } : {}),
    },
    include: { category: true, brand: true },
    orderBy: { createdAt: "desc" },
  });

  const products = rows as unknown as ProductType[];

  if (products.length === 0) {
    return <p className="text-center text-zinc-500 py-10">محصولی یافت نشد</p>;
  }

  return (
    <div className="px-3 sm:px-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
