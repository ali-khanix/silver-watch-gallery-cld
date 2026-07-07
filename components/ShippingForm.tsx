import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingFormInputs, shippingFormSchema } from "@/lib/schema";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shippingFormSchema),
  });

  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);

    router.push("/cart?step=3", { scroll: false });
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleShippingForm)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-xs text-zinc-500 font-medium">
            اسم
          </label>
          <input
            id="name"
            placeholder="علیرضا محمدی"
            type="text"
            className="border-b border-b-zinc-300 py-2 outline-none text-sm"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-xs text-zinc-500 font-medium">
            ایمیل
          </label>
          <input
            id="email"
            placeholder="johndoe@gmail.com"
            type="email"
            className="border-b border-b-zinc-300 py-2 outline-none text-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-xs text-zinc-500 font-medium">
            شماره تماس
          </label>
          <input
            id="phone"
            placeholder="09121234567"
            type="text"
            className="border-b border-b-zinc-300 py-2 outline-none text-sm"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="address"
            className="text-xs text-zinc-500 font-medium"
          >
            آدرس
          </label>
          <input
            id="address"
            placeholder="کرج، گوهردشت، خیابان کاج..."
            type="text"
            className="border-b border-b-zinc-300 py-2 outline-none text-sm"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="text-xs text-zinc-500 font-medium">
            شهر
          </label>
          <input
            id="city"
            placeholder="کرج"
            type="text"
            className="border-b border-b-zinc-300 py-2 outline-none text-sm"
            {...register("city")}
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>

        <Button type="submit">
          <span>ادامه دهید</span>
          <span>
            <ChevronLeft />
          </span>
        </Button>
      </form>
    </div>
  );
};

export default ShippingForm;
