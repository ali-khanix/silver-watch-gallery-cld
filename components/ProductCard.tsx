"use client";
import { ProductType } from "@/lib/schema";
import useCartStore from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedColor: productTypes.color,
    });

    toast.success("محصول به کارت اضافه شد");
  };

  function handleProductType({
    type,
    value,
  }: {
    type: "color" | "";
    value: string;
  }) {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  }

  return (
    <div className="rounded-3xl overflow-hidden bg-white flex flex-col p-2 sm:mx-0 sm:px-4 sm:py-4 sm:my-4 hover:-translate-y-1 transition-all duration-300 hover:bg-zinc-50">
      {/* IMAGE */}
      <div className="relative aspect-3/4 ">
        <Link href={`/products/${product.slug}`} className="w-full ">
          <Image
            src={product.images?.[productTypes.color] || ""}
            alt={product.name}
            fill
            className="object-cover"
          />
        </Link>
        <Image
          width={16}
          height={16}
          src={"/icons/watch-logo.svg"}
          alt={"برند عکس"}
          className="absolute left-1 top-1"
        />
      </div>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-col py-2 gap-2 sm:w-full justify-center sm:block">
        <div className="flex flex-col items-start justify-center gap-1">
          <h1 className="font-medium text-zinc-700 line-clamp-1">
            {product.name}
          </h1>
          <p className=" font-medium text-zinc-700 line-clamp-1">
            {product.shortDescription}
          </p>
        </div>

        {/* COLORS */}
        <div className="flex items-center justify-start gap-1 mt-1">
          {product.colors.map((color) => (
            <div
              key={color}
              className={`p-px rounded-full`}
              onClick={() => handleProductType({ type: "color", value: color })}
            >
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          ))}
        </div>

        {/* PRICE AND ADD BUTTON*/}
        {/* PRICE AND ADD BUTTON*/}
        <div className="flex justify-center items-start sm:mt-4 flex-col gap-4">
          <div className="flex flex-col w-full">
            <span
              className={`line-through text-gray-500 ${
                product.offer ? "" : "invisible"
              }`}
            >
              {product.offer ? product.offer.toLocaleString() : "0"} تومان
            </span>
            <span className="font-bold">
              {product.price.toLocaleString()} تومان
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-zinc-950 rounded-full p-3 flex items-center justify-center  gap-1 mx-auto cursor-pointer w-full sm:h-full text-white hover:bg-zinc-800"
          >
            <span>افزودن</span>
            <ShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
