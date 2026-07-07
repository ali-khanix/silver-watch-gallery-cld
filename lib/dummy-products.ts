// client/lib/dummy-products.ts

export type Product = {
  slug: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "mens" | "womens" | "boys" | "girls" | "brand";
};

export const dummyProducts: Product[] = [
  // ---------- مردانه ----------
  {
    slug: "mens-watch",
    name: "ساعت مچی مردانه",
    price: 1250000,
    description: "ساعت مچی مردانه با بدنه استیل و طراحی کلاسیک.",
    image: "https://placehold.co/400x400?text=Mens+Watch",
    category: "mens",
  },
  {
    slug: "mens-classic-watch",
    name: "ساعت کلاسیک مردانه",
    price: 1890000,
    description: "ساعت کلاسیک مردانه با صفحه چرمی و موتور ژاپنی.",
    image: "https://placehold.co/400x400?text=Mens+Classic",
    category: "mens",
  },
  {
    slug: "mens-sport-watch",
    name: "ساعت اسپرت مردانه",
    price: 1450000,
    description: "ساعت اسپرت مردانه ضد آب با کرنومتر.",
    image: "https://placehold.co/400x400?text=Mens+Sport",
    category: "mens",
  },
  {
    slug: "mens-leather-watch",
    name: "ساعت چرمی مردانه",
    price: 1670000,
    description: "ساعت مردانه با بند چرم طبیعی و صفحه آنالوگ.",
    image: "https://placehold.co/400x400?text=Mens+Leather",
    category: "mens",
  },

  // ---------- پسرانه ----------
  {
    slug: "boys-watch",
    name: "ساعت مچی پسرانه",
    price: 690000,
    description: "ساعت مچی پسرانه، سبک و مقاوم در برابر آب.",
    image: "https://placehold.co/400x400?text=Boys+Watch",
    category: "boys",
  },
  {
    slug: "boys-digital-watch",
    name: "ساعت دیجیتال پسرانه",
    price: 590000,
    description: "ساعت دیجیتال پسرانه با چراغ پس‌زمینه و تایمر.",
    image: "https://placehold.co/400x400?text=Boys+Digital",
    category: "boys",
  },

  // ---------- زنانه ----------
  {
    slug: "womens-watch",
    name: "ساعت مچی زنانه",
    price: 1150000,
    description: "ساعت مچی زنانه با طراحی ظریف و بند استیل.",
    image: "https://placehold.co/400x400?text=Womens+Watch",
    category: "womens",
  },
  {
    slug: "womens-classic-watch",
    name: "ساعت کلاسیک زنانه",
    price: 1390000,
    description: "ساعت کلاسیک زنانه با صفحه مروارید و بند چرم.",
    image: "https://placehold.co/400x400?text=Womens+Classic",
    category: "womens",
  },
  {
    slug: "womens-rose-gold-watch",
    name: "ساعت رزگلد زنانه",
    price: 1690000,
    description: "ساعت زنانه با بدنه رزگلد و نگین‌های کریستال.",
    image: "https://placehold.co/400x400?text=Womens+RoseGold",
    category: "womens",
  },
  {
    slug: "womens-minimal-watch",
    name: "ساعت مینیمال زنانه",
    price: 990000,
    description: "ساعت زنانه با طراحی ساده و بند چرمی نازک.",
    image: "https://placehold.co/400x400?text=Womens+Minimal",
    category: "womens",
  },

  // ---------- دخترانه ----------
  {
    slug: "girls-watch",
    name: "ساعت مچی دخترانه",
    price: 590000,
    description: "ساعت مچی دخترانه با رنگ‌بندی شاد و بند سیلیکونی.",
    image: "https://placehold.co/400x400?text=Girls+Watch",
    category: "girls",
  },
  {
    slug: "girls-cartoon-watch",
    name: "ساعت کارتونی دخترانه",
    price: 450000,
    description: "ساعت دخترانه با طرح کارتونی و بند رنگی.",
    image: "https://placehold.co/400x400?text=Girls+Cartoon",
    category: "girls",
  },

  // ---------- برند ها ----------
  {
    slug: "rolex",
    name: "رولکس",
    price: 25000000,
    description: "ساعت رولکس اورجینال با بدنه استیل ضد زنگ.",
    image: "https://placehold.co/400x400?text=Rolex",
    category: "brand",
  },
  {
    slug: "g-shock",
    name: "جی شاک",
    price: 2200000,
    description: "ساعت جی شاک مقاوم در برابر ضربه و آب.",
    image: "https://placehold.co/400x400?text=G-Shock",
    category: "brand",
  },
];

export function getProductBySlug(slug: string) {
  return dummyProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]) {
  return dummyProducts.filter((p) => p.category === category);
}
