"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  productFormSchema,
  ProductFormInput,
  ProductFormValues,
} from "@/lib/admin-schema";

type Brand = {
  id: string;
  name: string;
  slug: string;
};
type Category = { id: string; name: string; slug: string };

type ExistingProduct = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  price: number;
  offer: number | null;
  gender: string | null;
  colors: string[];
  images: Record<string, string>;
  categoryId: string;
  brandId: string | null;
  inStock: boolean;
};

const AdminProductForm = ({
  categories,
  brands,
  existingProduct,
}: {
  categories: Category[];
  brands: Brand[];
  existingProduct?: ExistingProduct;
}) => {
  const router = useRouter();
  const isEditMode = Boolean(existingProduct);

  const defaultVariants = existingProduct
    ? existingProduct.colors.map((color) => ({
        color,
        imageUrl: existingProduct.images[color] || "",
      }))
    : [{ color: "#000000", imageUrl: "" }];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, any, ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: existingProduct
      ? {
          name: existingProduct.name,
          slug: existingProduct.slug,
          shortDescription: existingProduct.shortDescription ?? "",
          description: existingProduct.description ?? "",
          price: existingProduct.price,
          offer: existingProduct.offer ?? undefined,
          gender: (existingProduct.gender ?? undefined) as any,
          categoryId: existingProduct.categoryId,
          variants: defaultVariants,
          brandId: existingProduct.brandId ?? undefined,
          inStock: existingProduct.inStock,
        }
      : { variants: defaultVariants },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (values: ProductFormValues) => {
    const images: Record<string, string> = {};
    const colors: string[] = [];
    values.variants.forEach((v) => {
      images[v.color] = v.imageUrl;
      colors.push(v.color);
    });

    const payload = {
      name: values.name,
      slug: values.slug,
      shortDescription: values.shortDescription,
      description: values.description,
      price: values.price,
      offer: values.offer,
      gender: values.gender,
      categoryId: values.categoryId,
      colors,
      images,
      brandId: values.brandId,
      inStock: values.inStock,
    };

    const url = isEditMode
      ? `/api/products/${existingProduct!.id}`
      : "/api/products";
    const method = isEditMode ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const { error } = await res.json();
      toast.error(error || "خطا در ذخیره محصول");
      return;
    }

    toast.success(isEditMode ? "محصول ویرایش شد" : "محصول اضافه شد");

    if (isEditMode) {
      router.push("/admin");
      router.refresh();
    } else {
      reset({ variants: [{ color: "#000000", imageUrl: "" }] });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <input
          placeholder="نام محصول"
          className="border rounded-md p-2 w-full"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          placeholder="اسلاگ (مثلا: rolex-classic-1)"
          className="border rounded-md p-2 w-full"
          {...register("slug")}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
        )}
      </div>

      <input
        placeholder="توضیح کوتاه"
        className="border rounded-md p-2 w-full"
        {...register("shortDescription")}
      />

      <textarea
        placeholder="توضیحات کامل"
        className="border rounded-md p-2 w-full"
        {...register("description")}
      />

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="number"
            placeholder="قیمت (تومان)"
            className="border rounded-md p-2 w-full"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div className="flex-1">
          <input
            type="number"
            placeholder="قیمت قبل از تخفیف (اختیاری)"
            className="border rounded-md p-2 w-full"
            {...register("offer")}
          />
        </div>
      </div>

      <select
        className="border rounded-md p-2 w-full"
        {...register("gender")}
        defaultValue={existingProduct?.gender ?? ""}
      >
        <option value="">بدون جنسیت (اختیاری)</option>
        <option value="men">مردانه</option>
        <option value="women">زنانه</option>
        <option value="kids">بچگانه</option>
      </select>

      <div>
        <select
          className="border rounded-md p-2 w-full"
          {...register("categoryId")}
          defaultValue={existingProduct?.categoryId ?? ""}
        >
          <option value="" disabled>
            انتخاب دسته بندی
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
        )}
      </div>

      <select
        className="border rounded-md p-2 w-full"
        {...register("brandId")}
        defaultValue={existingProduct?.brandId ?? ""}
      >
        <option value="">بدون برند (اختیاری)</option>
        {brands.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          {...register("inStock")}
          defaultChecked={existingProduct ? existingProduct.inStock : true}
        />
        موجود در انبار
      </label>

      <div className="flex flex-col gap-2">
        <p className="font-medium">رنگ ها و تصاویر</p>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-start">
            <input
              type="color"
              className="w-12 h-10 border rounded-md"
              {...register(`variants.${index}.color` as const)}
            />
            <input
              placeholder="آدرس تصویر (URL)"
              className="border rounded-md p-2 flex-1"
              {...register(`variants.${index}.imageUrl` as const)}
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 px-2"
              >
                حذف
              </button>
            )}
          </div>
        ))}
        {errors.variants?.root && (
          <p className="text-red-500 text-sm">{errors.variants.root.message}</p>
        )}
        <button
          type="button"
          onClick={() => append({ color: "#000000", imageUrl: "" })}
          className="text-sm underline w-fit"
        >
          + افزودن رنگ دیگر
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-zinc-950 text-white rounded-md p-2 disabled:opacity-50 mt-2"
      >
        {isEditMode ? "ذخیره تغییرات" : "افزودن محصول"}
      </button>
    </form>
  );
};

export default AdminProductForm;
