import localFont from "next/font/local";

export const iranYekan = localFont({
  src: [
    {
      path: "./iranyekanweblightfanum.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./iranyekanwebregularfanum.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./iranyekanwebmediumfanum.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./iranyekanwebboldfanum.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iranyekan",
  display: "swap",
});
