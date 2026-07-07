import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminProductForm from "@/components/AdminProductForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const [product, categories, brands] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div dir="rtl" className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-xl font-bold mb-6">ویرایش محصول</h1>
      <AdminProductForm
        categories={categories}
        brands={brands}
        existingProduct={product as any}
      />
    </div>
  );
}
