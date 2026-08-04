"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { brandFormSchema, BrandFormValues } from "@/lib/admin-schema";

const AdminBrandForm = () => {
  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({ resolver: zodResolver(brandFormSchema) });

  const handleLogoUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error || "خطا در آپلود لوگو");
        return;
      }
      const { url } = await res.json();
      setLogoUrl(url);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: BrandFormValues) => {
    const res = await fetch("/api/brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, logo: logoUrl }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      toast.error(error || "خطا در ایجاد برند");
      return;
    }
    toast.success("برند اضافه شد");
    reset();
    setLogoUrl(null);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <input
          placeholder="نام برند (مثلا: رولکس)"
          className="border rounded-md p-2 w-full"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <input
          placeholder="اسلاگ (مثلا: rolex)"
          className="border rounded-md p-2 w-full"
          {...register("slug")}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {logoUrl ? (
          <div className="relative w-16 h-16 rounded-md overflow-hidden border shrink-0">
            <Image
              src={logoUrl}
              alt=""
              fill
              className="object-contain bg-white"
            />
            <button
              type="button"
              onClick={() => setLogoUrl(null)}
              className="absolute top-0.5 left-0.5 bg-black/60 rounded-full p-0.5"
            >
              <X size={12} className="text-white" />
            </button>
          </div>
        ) : (
          <label className="flex-1 border border-dashed rounded-md p-3 text-sm text-center cursor-pointer hover:bg-zinc-50 flex items-center justify-center gap-2">
            {uploading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> در حال آپلود...
              </>
            ) : (
              <>
                <Upload size={16} /> آپلود لوگو (اختیاری)
              </>
            )}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleLogoUpload(e.target.files[0])
              }
            />
          </label>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || uploading}
        className="bg-zinc-950 text-white rounded-md p-2 disabled:opacity-50"
      >
        افزودن برند
      </button>
    </form>
  );
};

export default AdminBrandForm;
