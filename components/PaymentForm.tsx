import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentFormSchema } from "@/lib/schema";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentFormSchema),
  });

  const router = useRouter();

  const handlePaymentForm = () => {};

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handlePaymentForm)}
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="cardHolder"
            className="text-xs text-zinc-500 font-medium"
          >
            اسم روی کارت
          </label>
          <input
            id="cardHolder"
            placeholder="علیرضا محمدی"
            type="text"
            className="border-b border-b-zinc-300 py-2 outline-none text-sm"
            {...register("cardHolder")}
          />
          {errors.cardHolder && (
            <p className="text-red-500">{errors.cardHolder.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="cardNumber"
            className="text-xs text-zinc-500 font-medium"
          >
            شماره کارت
          </label>
          <input
            id="cardNumber"
            placeholder="1234567891234567"
            type="text"
            className="border-b border-b-zinc-300 py-2 outline-none text-sm"
            {...register("cardNumber")}
          />
          {errors.cardNumber && (
            <p className="text-red-500">{errors.cardNumber.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="expirationDate"
            className="text-xs text-zinc-500 font-medium"
          >
            تاریخ انقضاء
          </label>
          <input
            id="expirationDate"
            placeholder="12/08"
            type="text"
            className="border-b border-b-zinc-300 py-2 outline-none text-sm"
            {...register("expirationDate")}
          />
          {errors.expirationDate && (
            <p className="text-red-500">{errors.expirationDate.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cvv" className="text-xs text-zinc-500 font-medium">
            CVV
          </label>
          <input
            id="cvv"
            placeholder="123"
            type="text"
            className="border-b border-b-zinc-300 py-2 outline-none text-sm"
            {...register("cvv")}
          />
          {errors.cvv && <p className="text-red-500">{errors.cvv.message}</p>}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Image
            src={"/Bank_Mellat_Logo.svg"}
            alt="لوگو بانک ملت"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src={"/blu-bank.png"}
            alt="لوگو بلو بانک"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>

        <Button type="submit">
          <span>پرداخت</span>
          <span>
            <ChevronLeft />
          </span>
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
