import ProductsGrid from "@/components/ProductsGrid";

type Props = {
  searchParams: Promise<{ category?: string; gender?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { category, gender } = await searchParams;

  return (
    <div dir="rtl" className="py-8">
      <h1 className="text-xl font-bold mx-3 sm:mx-0 mb-6">همه محصولات</h1>
      <ProductsGrid categorySlug={category} gender={gender} />
    </div>
  );
}
