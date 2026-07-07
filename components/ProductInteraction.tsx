"use client";

import useCartStore from "@/stores/cartStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Minus } from "lucide-react";
import { ProductType } from "@/lib/schema";

const ProductInteraction = ({
  product,
  selectedColor,
}: {
  product: ProductType;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  console.log(quantity);

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
    });
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* COLOR */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500">رنگ</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border rounded-full p-1px ${
                selectedColor === color ? "border-zinc-500" : "border-white"
              }`}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div
                className={`w-6 h-6 rounded-full`}
                style={{ backgroundColor: color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500">تعداد</span>
        <div className="flex items-center gap-2">
          <Button
            className="border border-gray-300 bg-transparent text-gray-700 hover:text-white"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="text-black">{quantity}</span>
          <Button
            className="border border-gray-300 bg-transparent text-gray-700 hover:text-white"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* BUTTONS */}
      <Button onClick={handleAddToCart}>
        <Plus />
        افزودن به سبد
      </Button>

      <Button className="bg-white text-gray-700 border hover:bg-transparent hover:border-gray-500">
        <ShoppingCart />
        خرید این محصول
      </Button>
    </div>
  );
};

export default ProductInteraction;
