import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });

  return (
    <div dir="rtl" className="py-8 mx-3 sm:mx-0">
      <h1 className="text-xl font-bold mb-6">برند ها</h1>

      {brands.length === 0 ? (
        <p className="text-zinc-500">هنوز برندی اضافه نشده</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="border rounded-2xl p-6 text-center font-medium hover:bg-zinc-50 transition-colors"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
