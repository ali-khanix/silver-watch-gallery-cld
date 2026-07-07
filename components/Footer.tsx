import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const staticFooterLinks = [
  {
    title: "دسترسی سریع",
    subTitle: [
      { value: "صفحه ی اصلی", link: "/" },
      { value: "محصولات", link: "/products" },
      { value: "برند ها", link: "/brands" },
      { value: "پنل کاربری", link: "/orders" },
    ],
  },
  {
    title: "گالری ساعت سیلور",
    subTitle: [
      { value: "درباره ما", link: "/about" },
      { value: "تماس با ما", link: "/call-us" },
      { value: "شرایط و عودت کالا", link: "/" },
    ],
  },
];

const Footer = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    take: 5,
  });

  return (
    <footer className=" bg-zinc-950">
      <div className="p-8 flex justify-between items-center sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl mx-auto text-white">
        <div className="flex flex-col gap-8 sm:gap-4 sm:flex-row w-full justify-between">
          <div className="sm:max-w-[25%] flex flex-col gap-2 border-b sm:border-b-0 pb-2">
            <Link href={"/"}>
              <Image src={"/logo.svg"} width={100} height={100} alt="logo" />
            </Link>
            <h2>شعبه کرج</h2>
            <p className="text-zinc-400">
              فردیس، بین فلکه دوم و کانال غربی، فروشگاه ساعت سیلور
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h1>{staticFooterLinks[0].title}</h1>
            <ul className="flex flex-col gap-1">
              {staticFooterLinks[0].subTitle.map((item) => (
                <li key={item.value}>
                  <Link
                    className="text-zinc-400 hover:text-zinc-500"
                    href={item.link}
                  >
                    {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-col gap-2">
              <h1>لینک های کاربران</h1>
              <ul className="flex flex-col gap-1">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      className="text-zinc-400 hover:text-zinc-500"
                      href={`/products?category=${category.slug}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    className="text-zinc-400 hover:text-zinc-500"
                    href="/offers"
                  >
                    ساعت های دارای تخفیف
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h1>{staticFooterLinks[1].title}</h1>
            <ul className="flex flex-col gap-1">
              {staticFooterLinks[1].subTitle.map((item) => (
                <li key={item.value}>
                  <Link
                    className="text-zinc-400 hover:text-zinc-500"
                    href={item.link}
                  >
                    {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Link href={"https://enamad.ir"}>
              <Image
                src={"/e-namad-logo.webp"}
                width={140}
                height={140}
                alt="logo"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
