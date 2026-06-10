export const PRODUCTS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name:
    i === 0
      ? "Canon Camera EOS 2000, Black 10x zoom"
      : "GoPro HERO6 4K Action Camera - Black",
  price: 99.5,
  originalPrice: 1128.0,
  rating: i % 3 === 0 ? 3.5 : 7.5,
  orders: 154,
  shipping: "Free Shipping",
  description:
    i === 0
      ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      : "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
  image: [
    "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
  ][i],
}));

export const CATEGORIES = [
  "Mobile accessory",
  "Electronics",
  "Smartphones",
  "Modern tech",
];

export const BRANDS = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];

export const FEATURES = [
  "Metallic",
  "Plastic cover",
  "8GB Ram",
  "Super power",
  "Large Memory",
];

export const CONDITIONS = ["Any", "Refurbished", "Brand new", "Old items"];

export const SORT_OPTIONS = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
];
