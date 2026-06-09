import React from "react";

const products = [
  {
    id: 1,
    price: "$10.30",
    name: "T-shirts with multiple colors, for men",
    image: "https://placehold.co/200x180?text=T-Shirt",
  },
  {
    id: 2,
    price: "$10.30",
    name: "Jeans shorts for men blue color",
    image: "https://placehold.co/200x180?text=Jacket",
  },
  {
    id: 3,
    price: "$12.50",
    name: "Brown winter coat medium size",
    image: "https://placehold.co/200x180?text=Coat",
  },
  {
    id: 4,
    price: "$34.00",
    name: "Jeans bag for travel for men",
    image: "https://placehold.co/200x180?text=Wallet",
  },
  {
    id: 5,
    price: "$99.00",
    name: "Leather wallet",
    image: "https://placehold.co/200x180?text=Backpack",
  },
  {
    id: 6,
    price: "$9.99",
    name: "Canon camera black, 100x zoom",
    image: "https://placehold.co/200x180?text=Jeans",
  },
  {
    id: 7,
    price: "$8.99",
    name: "Headset for gaming with mic",
    image: "https://placehold.co/200x180?text=Headset",
  },
  {
    id: 8,
    price: "$10.30",
    name: "Smartwatch silver color modern",
    image: "https://placehold.co/200x180?text=Backpack",
  },
  {
    id: 9,
    price: "$10.30",
    name: "Blue wallet for men leather metarfial",
    image: "https://placehold.co/200x180?text=Pot",
  },
  {
    id: 10,
    price: "$80.95",
    name: "Jeans bag for travel for men",
    image: "https://placehold.co/200x180?text=Kettle",
  },
];

const ProductCard = ({ product }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-3 hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex items-center justify-center h-44 bg-white rounded-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-contain"
      />
    </div>
    <div className="mt-3">
      <p className="text-sm font-semibold text-gray-900">{product.price}</p>
      <p className="mt-0.5 text-sm text-gray-500 leading-snug line-clamp-2">
        {product.name}
      </p>
    </div>
  </div>
);
    
const RecommendedItems = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Recommended items
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedItems;
