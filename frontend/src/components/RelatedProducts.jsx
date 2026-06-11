const RelatedProducts = ({ products }) => {
  return (
    <section className="mt-8">
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
};
export default RelatedProducts;
