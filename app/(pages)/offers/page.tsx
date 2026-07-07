import ProductsGrid from "@/components/ProductsGrid";

export default function OffersPage() {
  return (
    <div dir="rtl" className="py-8">
      <h1 className="text-xl font-bold mx-3 sm:mx-0 mb-6">
        ساعت های دارای تخفیف
      </h1>
      <ProductsGrid discountedOnly />
    </div>
  );
}
