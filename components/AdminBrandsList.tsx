"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Brand = { id: string; name: string; slug: string };

const AdminBrandsList = ({ brands }: { brands: Brand[] }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`حذف برند "${name}"؟`)) return;
    setDeletingId(id);
    const res = await fetch(`/api/brands/${id}`, { method: "DELETE" });
    setDeletingId(null);

    if (!res.ok) {
      const { error } = await res.json();
      toast.error(error || "خطا در حذف برند");
      return;
    }
    toast.success("برند حذف شد");
    router.refresh();
  };

  return (
    <ul className="mt-4 flex flex-col gap-1">
      {brands.map((b) => (
        <li key={b.id} className="flex items-center justify-between text-sm">
          <span>
            {b.name} ({b.slug})
          </span>
          <button
            onClick={() => handleDelete(b.id, b.name)}
            disabled={deletingId === b.id}
            className="text-red-500 underline disabled:opacity-50"
          >
            حذف
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AdminBrandsList;
