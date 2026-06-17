export default function RelatedProducts({ products, mobile = false }) {
  if (mobile) {
    // Mobile: flat list of items, parent handles scroll container
    return (
      <>
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-32 cursor-pointer">
            <div className="rounded-lg overflow-hidden bg-gray-50 border border-gray-100 aspect-square mb-1.5 hover:shadow-md transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm font-bold text-gray-900">
              ${product.priceRange?.split("-")[0].trim() || "10.30"}
            </p>
            <p className="text-xs text-gray-500 leading-snug line-clamp-2">
              {product.name}
            </p>
          </div>
        ))}
      </>
    );
  }

  // Desktop: 6-column grid
  return (
    <section>
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        Related products
      </h2>
      <div className="grid grid-cols-6 gap-4">
        {products.map((product) => (
          <div key={product.id} className="cursor-pointer group">
            <div className="rounded-lg overflow-hidden bg-gray-50 border border-gray-100 aspect-square mb-2 group-hover:shadow-md transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-xs text-gray-700 leading-snug mb-0.5">
              {product.name}
            </p>
            <p className="text-xs text-gray-400">{product.priceRange}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
