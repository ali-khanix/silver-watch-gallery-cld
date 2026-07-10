"use client";

import useCartStore from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ShoppingCartIconProps = {
  size?: number;
  className?: string;
};

const ShoppingCartIcon = ({ size = 28, className }: ShoppingCartIconProps) => {
  const { cart } = useCartStore();

  const totalItems = cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const recentItems = [...cart].reverse().slice(0, 3);

  return (
    <div className={`relative group ${className ?? ""}`}>
      <Link href="/cart" className="hover:text-zinc-400 relative block">
        <ShoppingCart size={size} />
        <span className="absolute -top-3 -right-3 bg-zinc-100 text-zinc-900 rounded-full w-6 h-6 translate-y-1 flex items-center justify-center text-xs font-semibold">
          {totalItems}
        </span>
      </Link>

      {/* DROPDOWN */}
      <div
        dir="rtl"
        className="hidden group-hover:block absolute left-0 top-full pt-3 w-80 z-30"
      >
        <div className="bg-white text-zinc-900 rounded-2xl shadow-lg border border-zinc-200 overflow-hidden">
          {recentItems.length === 0 ? (
            <p className="text-center text-sm text-zinc-500 py-6 px-4">
              سبد خرید شما خالی است
            </p>
          ) : (
            <>
              <div className="flex flex-col">
                {recentItems.map((item) => (
                  <Link
                    key={`${item.id}-${item.selectedColor}`}
                    href={`/products/${item.slug}`}
                    className="flex items-center gap-3 p-3 hover:bg-zinc-50 transition-colors border-b last:border-b-0 border-zinc-100"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-zinc-100">
                      <Image
                        src={item.images?.[item.selectedColor]?.[0] ?? ""}
                        fill
                        className="object-contain"
                        alt={item.name}
                      />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-medium line-clamp-1">
                        {item.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {item.quantity} عدد &middot;{" "}
                        {item.price.toLocaleString()} تومان
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/cart"
                className="block text-center text-sm font-medium bg-zinc-950 text-white py-3 hover:bg-zinc-800 transition-colors"
              >
                مشاهده سبد خرید
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartIcon;
