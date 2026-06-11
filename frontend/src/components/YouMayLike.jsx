const YouMayLike = ({ items }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">You may like</h3>
      <div className="flex flex-col divide-y divide-gray-100">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded px-1 transition-colors"
          >
            <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-xs text-gray-700 leading-snug line-clamp-2 mb-0.5">
                {item.name}
              </p>
              <p className="text-xs text-gray-400">{item.priceRange}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default YouMayLike;

