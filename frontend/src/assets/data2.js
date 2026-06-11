export const PRODUCT = {
  name: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
  inStock: true,
  rating: 9.3,
  reviews: 32,
  sold: 154,
  pricingTiers: [
    { label: "50-100 pcs", price: "$98.00" },
    { label: "100-700 pcs", price: "$90.00" },
    { label: "700+ pcs", price: "$78.00" },
  ],
  price: "Negotiable",
  type: "Classic shoes",
  material: "Plastic material",
  design: "Modern nice",
  customization: "Customized logo and design custom packages",
  protection: "Refund Policy",
  warranty: "2 years full warranty",
  images: [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=100&h=100&fit=crop",
  ],
  specs: [
    { label: "Model", value: "#8786867" },
    { label: "Style", value: "Classic style" },
    { label: "Certificate", value: "ISO-898921212" },
    { label: "Size", value: "34mm x 450mm x 19mm" },
    { label: "Memory", value: "36GB RAM" },
  ],
  features: [
    "Some great feature name here",
    "Lorem ipsum dolor sit amet, consectetur",
    "Duis aute irure dolor in reprehenderit",
    "Some great feature name here",
  ],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,

Quis nostrud exercitation ullamco laboris nisi ut aliquip quis nostrud exercitation ullamco laboris nisi ut aliquip. Duis aute irure dolor in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
};

export const SUPPLIER = {
  name: "Guanjoi Trading LLC",
  country: "Germany, Berlin",
  verified: true,
  worldwide: true,
};

export const RELATED_SUGGESTIONS = [
  { id: 1, name: "Men Blazers Sets Elegant Formal", priceRange: "$7.00 - $99.50", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4057?w=80&h=80&fit=crop" },
  { id: 2, name: "Men Shirt Sleeve Polo Contrast", priceRange: "$7.00 - $99.50", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=80&h=80&fit=crop" },
  { id: 3, name: "Apple Watch Series Space Gray", priceRange: "$7.00 - $99.50", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop" },
  { id: 4, name: "Basketball Crew Socks Long Stuff", priceRange: "$7.00 - $99.50", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop" },
  { id: 5, name: "New Summer Men's casual T-shirts", priceRange: "$7.00 - $99.50", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&h=80&fit=crop" },
];

export const RELATED_PRODUCTS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: "Xiaomi Redmi 8 Original",
  priceRange: "$32.00 - $40.00",
  image: [
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
  ][i],
}));
