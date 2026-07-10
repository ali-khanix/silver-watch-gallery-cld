"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/lib/schema";
import { ShoppingCart } from "lucide-react";

const ProductGallery = ({ product }: { product: ProductType }) => {
  const [color, setColor] = useState(product.colors[0]);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCartStore();

  const images = product.images[color] || [];

  const handleColorChange = (c: string) => {
    setColor(c);
    setActiveImage(0);
  };

  const handleAdd = () => {
    addToCart({ ...product, quantity: 1, selectedColor: color });
    toast.success("محصول به کارت اضافه شد");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN IMAGE */}
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-50">
        <Image
          src={images[activeImage] || ""}
          alt={product.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, index) => (
            <button
              key={img + index}
              onClick={() => setActiveImage(index)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 ${
                activeImage === index ? "border-zinc-950" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* COLOR SWATCHES */}
      <div className="flex items-center gap-2">
        {product.colors.map((c) => (
          <button
            key={c}
            onClick={() => handleColorChange(c)}
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

export default ProductGallery;
