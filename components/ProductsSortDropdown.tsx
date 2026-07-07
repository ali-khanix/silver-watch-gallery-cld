"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "", label: "پیش فرض" },
  { value: "newest", label: "جدیدترین" },
  { value: "bestselling", label: "پرفروش ترین" },
  { value: "cheapest", label: "ارزان ترین" },
  { value: "priciest", label: "گران ترین" },
];

const ProductsSortDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <select
      className="border border-zinc-300 rounded-lg p-2 text-sm"
      defaultValue={searchParams.get("sort") ?? ""}
      onChange={(e) => handleChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default ProductsSortDropdown;
