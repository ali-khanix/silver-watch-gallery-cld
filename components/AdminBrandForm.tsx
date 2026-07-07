"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { brandFormSchema, BrandFormValues } from "@/lib/admin-schema";

const AdminBrandForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({ resolver: zodResolver(brandFormSchema) });

  const onSubmit = async (values: BrandFormValues) => {
    const res = await fetch("/api/brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const { error } = await res.json();
      toast.error(error || "خطلا در ایجاد برند");
      return;
    }

    toast.success("برند اضافه شد");
    reset();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <input
          placeholder="نام برند: (مثلا رولکس)"
          className="border rounded-md p-2 w-full"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-red-500 text-sm"> {errors.name.message} </p>
        )}
      </div>

      <div>
        <input
          placeholder="اسلاگ (مثلا: rolex)"
          className="border rounded-md p-2 w-full"
          {...register("slug")}
        />

        {errors.slug && (
          <p className="text-red-500 text-sm"> {errors.slug.message} </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-zinc-950 text-white rounded-md p-2 disabled:opacity-50"
      >
        افزودن برند
      </button>
    </form>
  );
};

export default AdminBrandForm;
