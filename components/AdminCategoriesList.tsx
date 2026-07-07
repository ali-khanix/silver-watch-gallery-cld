"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string; slug: string };

const AdminCategoriesList = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(`حذف دسته بندی "${name}"؟`);
    if (!confirmed) return;

    setDeletingId(id);
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    setDeletingId(null);

    if (!res.ok) {
      const { error } = await res.json();
      toast.error(error || "خطا در حذف دسته بندی");
      return;
    }

    toast.success("دسته بندی حذف شد");
    router.refresh();
  };

  return (
    <ul className="mt-4 flex flex-col gap-1">
      {categories.map((c) => (
        <li key={c.id} className="flex items-center justify-between text-sm">
          <span>
            {c.name} ({c.slug})
          </span>
          <button
            onClick={() => handleDelete(c.id, c.name)}
            disabled={deletingId === c.id}
            className="text-red-500 underline disabled:opacity-50"
          >
            حذف
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AdminCategoriesList;
