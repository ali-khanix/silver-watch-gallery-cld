import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";
import { ProductType } from "@/lib/schema";

const ProductsList = async ({
  discountedOnly,
}: {
  discountedOnly?: boolean;
}) => {
  const rows = await prisma.product.findMany({
    where: discountedOnly ? { offer: { not: null } } : undefined,
    include: { category: true, brand: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const products = rows as unknown as ProductType[];

  if (products.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-6 mx-3 sm:mx-0">
        محصولی یافت نشد
      </p>
    );
  }

  return (
    <div className="flex flex-nowrap gap-2 overflow-scroll sm:overflow-hidden mx-3 sm:mx-0">
      {products.map((product) => (
        <div key={product.id} className="min-w-50 sm:w-full">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
