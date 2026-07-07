import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const productsWithBrand = await prisma.product.count({
    where: { brandId: id },
  });

  if (productsWithBrand > 0) {
    return NextResponse.json(
      {
        error: `این برند ${productsWithBrand} محصول دارد. ابتدا محصولات را حذف یا جابجا کنید`,
      },
      { status: 409 }
    );
  }

  try {
    await prisma.brand.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "برند یافت نشد" }, { status: 404 });
  }
}
