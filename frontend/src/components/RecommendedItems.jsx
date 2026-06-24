import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="rounded-lg border border-gray-200 bg-white p-3 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-center h-44 bg-white rounded-md overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="mt-3">
        <p className="text-sm font-semibold text-gray-900">${product.price}</p>
        <p className="mt-0.5 text-sm text-gray-500 leading-snug line-clamp-2">
          {product.name}
        </p>
      </div>
    </div>
  );
};

const RecommendedItems = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Recommended items
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedItems;
