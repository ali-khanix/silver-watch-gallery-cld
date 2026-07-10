import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@/lib/schema";
import ProductDetail from "@/components/ProductDetail";
import { normalizeImages } from "@/lib/normalize-images";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id: slug } = await params;

  const row = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, brand: true },
  });

  if (!row) {
    notFound();
  }

  const product = {
    ...(row as unknown as ProductType),
    images: normalizeImages((row as any).images),
  };

  return (
    <div dir="rtl" className="py-8 sm:py-14">
      <ProductDetail product={product} />
    </div>
  );
}
