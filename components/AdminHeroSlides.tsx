"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X } from "lucide-react";

type HeroSlide = {
  id: string;
  imageUrl: string;
  link: string | null;
  order: number;
};

const AdminHeroSlides = ({ slides }: { slides: HeroSlide[] }) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [link, setLink] = useState("");

  const handleUpload = async (file: File) => {
    if (slides.length >= 3) {
      toast.error("حداکثر ۳ اسلاید مجاز است. ابتدا یکی را حذف کنید");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) {
        const { error } = await uploadRes.json();
        toast.error(error || "خطا در آپلود تصویر");
        return;
      }
      const { url } = await uploadRes.json();

      const createRes = await fetch("/api/hero-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: url, link }),
      });

      if (!createRes.ok) {
        const { error } = await createRes.json();
        toast.error(error || "خطا در ذخیره اسلاید");
        return;
      }

      toast.success("اسلاید اضافه شد");
      setLink("");
      router.refresh();
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("حذف این اسلاید؟")) return;
    const res = await fetch(`/api/hero-slides/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("خطا در حذف اسلاید");
      return;
    }
    toast.success("اسلاید حذف شد");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative aspect-video rounded-lg overflow-hidden border"
          >
            <Image src={slide.imageUrl} alt="" fill className="object-cover" />
            <button
              onClick={() => handleDelete(slide.id)}
              className="absolute top-1 left-1 bg-black/60 rounded-full p-1"
            >
              <X size={14} className="text-white" />
            </button>
          </div>
        ))}
      </div>

      {slides.length < 3 && (
        <div className="flex flex-col gap-2">
          <input
            placeholder="لینک (اختیاری، مثلا: /products?gender=men)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border rounded-md p-2 w-full text-sm"
          />
          <label className="border border-dashed rounded-md p-3 text-sm text-center cursor-pointer hover:bg-zinc-50 flex items-center justify-center gap-2">
            {uploading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> در حال آپلود...
              </>
            ) : (
              <>
                <Upload size={16} /> افزودن اسلاید ({slides.length}/۳)
              </>
            )}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleUpload(e.target.files[0])
              }
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default AdminHeroSlides;
