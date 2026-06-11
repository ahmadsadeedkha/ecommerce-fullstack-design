import { ShoppingCart } from "lucide-react";

export default function SavedForLater({ items, onMoveToCart }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-6 bg-white rounded-xl p-4">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Saved for later</h2>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="flex items-center justify-center ">
              <img
                src={item.image}
                alt={item.name}
                className="object-contain h-full w-full"
              />
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-sm font-bold text-gray-900 mb-0.5">
                ${item.price.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 leading-snug mb-3 line-clamp-2">
                {item.name}
              </p>
              <button
                onClick={() => onMoveToCart(item.id)}
                className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-700 font-medium border border-gray-300 rounded-sm p-2 transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Move to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
