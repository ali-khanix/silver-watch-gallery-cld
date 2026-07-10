import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@/lib/schema";
import ProductGallery from "@/components/ProductGallery";
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mx-3 sm:mx-0">
        <ProductGallery product={product} />

        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-wide text-zinc-500 mb-3">
            {product.category.name}
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-2 leading-tight">
            {product.name}
          </h1>

          {product.shortDescription && (
            <p className="text-zinc-500 mb-6">{product.shortDescription}</p>
          )}

          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-2xl sm:text-3xl font-bold text-zinc-900">
              {product.price.toLocaleString("fa-IR")} تومان
            </span>
            {product.offer && (
              <span className="text-base line-through text-zinc-400">
                {product.offer.toLocaleString("fa-IR")} تومان
              </span>
            )}
          </div>

          {product.description && (
            <>
              <div className="h-px bg-zinc-200 mb-6" />
              <div>
                <h2 className="text-sm font-medium text-zinc-900 mb-2">
                  توضیحات محصول
                </h2>
                <p className="text-zinc-600 leading-8 text-sm">
                  {product.description}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
