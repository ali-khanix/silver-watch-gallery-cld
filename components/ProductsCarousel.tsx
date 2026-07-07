"use client";

import { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductType } from "@/lib/schema";

const ProductsCarousel = ({ products }: { products: ProductType[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeftStart(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const walk = e.pageX - startX;
    scrollRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      className={`flex flex-nowrap gap-2 sm:gap-4 overflow-x-auto mx-3 sm:mx-0 pb-2 ${
        isDragging ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
      style={{ scrollbarWidth: "thin" }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="w-[45%] sm:w-[calc((100%-4rem)/5)] shrink-0"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsCarousel;
