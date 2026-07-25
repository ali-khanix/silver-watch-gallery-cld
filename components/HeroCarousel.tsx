"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { id: string; imageUrl: string; link: string | null };

const HeroCarousel = ({ slides }: { slides: Slide[] }) => {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = (i: number) => {
    setIndex((i + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      // RTL-friendly: swipe right => previous, swipe left => next
      deltaX > 0 ? goTo(index - 1) : goTo(index + 1);
    }
    touchStartX.current = null;
  };

  if (slides.length === 0) {
    return (
      <div className="relative aspect-square sm:aspect-3/1 bg-zinc-100 flex items-center justify-center text-zinc-400 text-sm">
        اسلایدی اضافه نشده
      </div>
    );
  }

  const slide = slides[index];
  const content = (
    <Image
      src={slide.imageUrl}
      alt="عکس ساعت حرفه ای"
      fill
      priority
      className="object-cover"
    />
  );

  return (
    <div
      className="relative aspect-square sm:aspect-3/1 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slide.link ? (
        <Link href={slide.link} className="block w-full h-full">
          {content}
        </Link>
      ) : (
        content
      )}

      {slides.length > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors z-10"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors z-10"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;
