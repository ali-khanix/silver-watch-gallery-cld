import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(slides);
}

export async function POST(req: Request) {
  const { imageUrl, link } = await req.json();

  if (!imageUrl) {
    return NextResponse.json({ error: "تصویر الزامی است" }, { status: 400 });
  }

  const count = await prisma.heroSlide.count();
  if (count >= 3) {
    return NextResponse.json(
      { error: "حداکثر ۳ اسلاید مجاز است" },
      { status: 409 }
    );
  }

  const slide = await prisma.heroSlide.create({
    data: { imageUrl, link: link || null, order: count },
  });
  return NextResponse.json(slide, { status: 201 });
}
