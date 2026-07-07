"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: number;
  category: { name: string };
};

const AdminProductsTable = ({ products }: { products: Product[] }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `حذف محصول "${name}"؟ این عمل غیرقابل بازگشت است`
    );
    if (!confirmed) return;

    setDeletingId(id);
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    setDeletingId(null);

    if (!res.ok) {
      const { error } = await res.json();
      toast.error(error || "خطا در حذف محصول");
      return;
    }

    toast.success("محصول حذف شد");
    router.refresh();
  };

  if (products.length === 0) {
    return <p className="text-zinc-500 text-sm">هنوز محصولی اضافه نشده</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between border rounded-md p-3"
        >
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-zinc-500">
              {product.category.name} — {product.price.toLocaleString()} تومان
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/admin/products/${product.id}`}
              className="text-sm underline"
            >
              ویرایش
            </Link>
            <button
              onClick={() => handleDelete(product.id, product.name)}
              disabled={deletingId === product.id}
              className="text-sm text-red-500 underline disabled:opacity-50"
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProductsTable;
