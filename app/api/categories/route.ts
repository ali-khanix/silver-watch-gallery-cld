import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}
export async function POST(req: Request) {
  const body = await req.json();
  const { name, slug, group } = body;

  if (!name || !slug) {
    return NextResponse.json(
      { error: "نام و اسلاگ الزامی است" },
      { status: 400 }
    );
  }

  try {
    const category = await prisma.category.create({
      data: { name, slug, group: group || null },
    });
    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "این اسلاگ قبلا استفاده شده" },
      { status: 409 }
    );
  }
}
