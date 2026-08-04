import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div dir="rtl" className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-xl font-bold mb-6">سفارش های من</h1>

      {orders.length === 0 ? (
        <p className="text-zinc-500 text-sm">هنوز سفارشی ثبت نکرده اید</p>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="border rounded-xl p-4 flex justify-between items-center hover:bg-zinc-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{order.items.length} کالا</p>
                <p className="text-xs text-zinc-500">
                  {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                </p>
              </div>
              <span className="text-sm font-semibold">
                {order.total.toLocaleString()} تومان
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
