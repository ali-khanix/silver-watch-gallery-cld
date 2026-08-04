import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type OrderEmailPayload = {
  orderId: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  total: number;
  items: { name: string; quantity: number; color: string; price: number }[];
};

export async function sendOrderNotificationEmail(order: OrderEmailPayload) {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<li>${item.name} — رنگ: ${item.color} — تعداد: ${item.quantity} — ${item.price.toLocaleString()} تومان</li>`
    )
    .join("");

  try {
    await resend.emails.send({
      from: "Silver Watch Gallery <onboarding@resend.dev>",
      to: process.env.ADMIN_NOTIFICATION_EMAIL!,
      subject: `سفارش جدید از ${order.name}`,
      html: `
        <div dir="rtl" style="font-family: sans-serif;">
          <h2>سفارش جدید ثبت شد</h2>
          <p><strong>شماره سفارش:</strong> ${order.orderId}</p>
          <p><strong>نام مشتری:</strong> ${order.name}</p>
          <p><strong>تلفن:</strong> ${order.phone}</p>
          <p><strong>ایمیل:</strong> ${order.email}</p>
          <p><strong>شهر:</strong> ${order.city}</p>
          <p><strong>آدرس:</strong> ${order.address}</p>
          <h3>اقلام سفارش:</h3>
          <ul>${itemsHtml}</ul>
          <p><strong>مبلغ کل:</strong> ${order.total.toLocaleString()} تومان</p>
        </div>
      `,
    });
  } catch (err) {
    // Never let an email failure break order creation
    console.error("Failed to send order notification email:", err);
  }
}
