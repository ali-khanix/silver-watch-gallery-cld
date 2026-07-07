import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const productsInCategory = await prisma.product.count({
    where: { categoryId: id },
  });

  if (productsInCategory > 0) {
    return NextResponse.json(
      {
        error: `این دسته بندی ${productsInCategory} محصول دارد. ابتدا محصولات را حذف یا جابجا کنید`,
      },
      { status: 409 }
    );
  }

  try {
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "دسته بندی یافت نشد" }, { status: 404 });
  }
}
