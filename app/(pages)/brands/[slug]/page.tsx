import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;

  const brand = await prisma.brand.findUnique({ where: { slug } });
  if (!brand) {
    notFound();
  }

  const rows = await prisma.product.findMany({
    where: { brandId: brand.id },
    include: { category: true, brand: true },
    orderBy: { createdAt: "desc" },
  });

  const products = rows as unknown as ProductType[];

  return (
    <div dir="rtl" className="py-8 mx-3 sm:mx-0">
      <h1 className="text-xl font-bold mb-6">محصولات {brand.name}</h1>

      {products.length === 0 ? (
        <p className="text-zinc-500">هنوز محصولی برای این برند اضافه نشده</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
