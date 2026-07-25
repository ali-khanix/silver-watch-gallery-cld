import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { imageUrl, link } = await req.json();

  try {
    const slide = await prisma.heroSlide.update({
      where: { id },
      data: { imageUrl, link: link || null },
    });
    return NextResponse.json(slide);
  } catch {
    return NextResponse.json({ error: "اسلاید یافت نشد" }, { status: 404 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.heroSlide.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "اسلاید یافت نشد" }, { status: 404 });
  }
}
