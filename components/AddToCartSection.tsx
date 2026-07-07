"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/lib/schema";
import { ShoppingCart } from "lucide-react";

const AddToCartSection = ({ product }: { product: ProductType }) => {
  const [color, setColor] = useState(product.colors[0]);
  const { addToCart } = useCartStore();

  const handleAdd = () => {
    addToCart({ ...product, quantity: 1, selectedColor: color });
    toast.success("محصول به کارت اضافه شد");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {product.colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-6 h-6 rounded-full border-2 ${
              color === c ? "border-zinc-950" : "border-transparent"
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <button
        onClick={handleAdd}
        className="bg-zinc-950 text-white rounded-full p-3 flex items-center justify-center gap-2 w-full sm:w-fit sm:px-8"
      >
        <span>افزودن به سبد</span>
        <ShoppingCart />
      </button>
    </div>
  );
};

export default AddToCartSection;
