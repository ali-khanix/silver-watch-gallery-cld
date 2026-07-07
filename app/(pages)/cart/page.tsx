"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { Button } from "@/components/ui/button";
import { ShippingFormInputs } from "@/lib/schema";
import useCartStore from "@/stores/cartStore";
import { ChevronLeft } from "lucide-react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "سبد خرید",
  },
  {
    id: 2,
    title: "آدرس",
  },
  {
    id: 3,
    title: "روش پرداخت",
  },
];

// const cartItems = [
//   {
//     id: 1,
//     name: "کاسیو",
//     shortDescription: "MTP-1381L-1AV",
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
//     price: 5200000,
//     offer: 4900000,
//     colors: ["black", "green", "red"],
//     images: {
//       black: "/products/watch-image.png",
//     },
//     selectedColor: "black",
//   },
//   {
//     id: 2,
//     name: "کاسیو",
//     shortDescription: "MTP-1381L-1AV",
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
//     price: 5200000,
//     offer: 4900000,
//     colors: ["black", "blue"],
//     images: {
//       black: "/products/watch-image.png",
//     },
//     selectedColor: "black",
//   },
//   {
//     id: 3,
//     name: "کاسیو",
//     shortDescription: "MTP-1381L-1AV",
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
//     price: 5200000,
//     offer: 4900000,
//     colors: ["black", "gray"],
//     images: {
//       black: "/products/watch-image.png",
//     },
//     selectedColor: "black",
//   },
// ];
const colorTranslations: Record<string, string> = {
  blue: "آبی",
  black: "مشکی",
  white: "سفید",
  red: "قرمز",
  green: "سبز",
  brown: "قهوه‌ای",
  gray: "طوسی",
  gold: "طلایی",
  silver: "نقره‌ای",
};

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get("step") || "1");

  const { cart, removeFromCart } = useCartStore();

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-8">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">سبد خرید شما</h1>

      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center justify-start lg:justify-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep ? "border-zinc-800" : "border-zinc-400"
            }`}
          >
            {/* STEP ID */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center font-medium text-white text-sm ${
                step.id === activeStep ? "bg-zinc-800" : "bg-zinc-400"
              }`}
            >
              {step.id}
            </div>
            {/* STEP TITLE */}
            <p
              className={`font-medium ${
                step.id === activeStep ? "text-zinc-800" : "text-zinc-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* STEPS & DETAILS */}
      <div className="w-full flex flex-col gap-8 lg:flex-row">
        {/* STEPS */}
        <div className="cartSteps mx-4 sm:mx-0 sm:w-7/12 bg-zinc-100">
          {/* SINGLE CART */}
          {activeStep === 1 ? (
            cart.map((item) => (
              <div
                key={item.id + item.selectedColor}
                className="flex items-center justify-between border-b-2 pb-4 border-zinc-200"
              >
                {/* IAMGE AND DETAILS */}
                <div className="flex gap-8">
                  {/* IMAGE */}
                  <div className="relative w-32 h-32 bg-zinc-200 rounded-lg overflow-hidden">
                    <Image
                      src={item.images?.[item.selectedColor] || ""}
                      fill
                      className="object-contain"
                      alt={item.name}
                    />
                  </div>

                  {/*ITEM DETAILS */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1 justify-between">
                      <p className="font-medium ">
                        {item.name} {item.shortDescription}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-zinc-500">
                          رنگ:{" "}
                          {colorTranslations[item.selectedColor] ||
                            item.selectedColor}
                        </p>

                        <div
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                      </div>

                      <p className="text-zinc-500">تعداد: {item.quantity}</p>
                    </div>

                    <p className="font-medium">
                      {item.price.toLocaleString()} تومان
                    </p>
                  </div>

                  {/* DELTE BUTTON */}
                </div>
                <Button
                  onClick={() => removeFromCart(item)}
                  className="w-8 h-8 bg-red-100 rounded-full hover:bg-red-200 transition-all duration-300 text-red-400"
                >
                  <Trash2 />
                </Button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-zinc-500">
              لطفا اطلاعات ارسال برای ادامه کامل پر کنید
            </p>
          )}
        </div>

        {/* DETAILS */}
        <div className="cartSteps sm:w-5/12 h-max">
          <h2 className="">جزئیات خرید</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-zinc-500">جمع خرید</p>
              <p className="font-medium">
                {cart
                  .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                  .toLocaleString()}{" "}
                تومان
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-zinc-500">تخفیف %10</p>
              <p className="font-medium">10%</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-zinc-500">هزینه ارسال</p>
              <p className="font-medium">100,000 تومان</p>
            </div>

            <hr className="border-zinc-300" />

            <div className="flex justify-between text-sm">
              <p className="text-zinc-800 font-semibold">جمع کل</p>
              <p className="font-medium">
                {(
                  cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0) *
                    0.9 +
                  100000
                ).toLocaleString()}{" "}
                تومان
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <Button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
            >
              <span>ادامه خرید</span>
              <span>
                <ChevronLeft />
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
