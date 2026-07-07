import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(brands);
}

export async function POST(req: Request) {
  const { name, slug } = await req.json();

  if (!name || !slug) {
    return NextResponse.json(
      { error: "نام و اسلاگ الزامی است" },
      { status: 400 }
    );
  }

  try {
    const brand = await prisma.brand.create({ data: { name, slug } });
    return NextResponse.json(brand, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "این اسلاگ قبلا استفاده شده" },
      { status: 409 }
    );
  }
}
