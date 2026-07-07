import ProductsList from "@/components/ProductsList";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative aspect-square sm:aspect-3/1">
        {/* HERO */}
        <Image
          src={"/images/hero-1.webp"}
          alt="عکس ساعت حرفه ای"
          fill
          className="object-cover"
        />
      </div>

      <section id="products" className="mt-10">
        <div className="flex justify-between items-center mx-3 sm:mx-0 mb-4">
          <h2 className="font-bold text-[18px]">تازه های سیلور واچ</h2>
          <Link href={"/products"} className="underline">
            مشاهده همه
          </Link>
        </div>
        <ProductsList />
      </section>

      {/* BANNERS */}
      <section id="banners" className="mt-8 mx-2 sm:mx-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div className="relative h-62.5 sm:h-100 rounded-[20px] overflow-hidden">
            <Image
              src={"/images/mens-watch-with-call-to-action-banner.webp"}
              alt="ساعت های مردانه"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-62.5 sm:h-100 rounded-[20px] overflow-hidden">
            <Image
              src={"/images/womens-watch-with-call-to-action-banner.webp"}
              fill
              alt="ساعت های مردانه"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="products" className="mt-10">
        <div className="flex justify-between items-center mx-3 sm:mx-0 mb-4">
          <h2 className="font-bold text-[18px]">ساعت های دارای تخفیف</h2>
          <Link href={"/products"} className="underline">
            مشاهده همه
          </Link>
        </div>
        <ProductsList discountedOnly />
      </section>
    </>
  );
}
