import { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── Shared Star Rating ───────────────────────────────────────────────────────
function StarRating({ rating, max = 10 }) {
  const stars = Math.round((rating / max) * 5);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= stars ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Wishlist Heart Button ────────────────────────────────────────────────────
function WishlistButton({ className = "" }) {
  const [liked, setLiked] = useState(false);

  // Stop the click from bubbling up to the card's navigate handler
  const handleClick = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-1.5 rounded-full hover:bg-red-50 transition-colors ${className}`}
    >
      <Heart
        className={`w-4 h-4 ${liked ? "fill-red-400 text-red-400" : "text-gray-300"}`}
      />
    </button>
  );
}

// ─── List View Card ───────────────────────────────────────────────────────────
export function ProductCardList({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex-shrink-0 w-36 h-36 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-800 leading-snug mb-1">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">{product.rating}</span>
          <span className="text-xs text-gray-400">
            • {product.orders} orders
          </span>
          <span className="text-xs text-emerald-500 font-medium">
            • {product.shipping}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="mt-3 text-xs text-blue-500 hover:text-blue-700 font-medium"
        >
          View details
        </button>
      </div>

      <WishlistButton className="self-start" />
    </div>
  );
}

// ─── Grid View Card ───────────────────────────────────────────────────────────
export function ProductCardGrid({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
    >
      <div className="relative bg-gray-50 h-44 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-full w-full"
        />
        <WishlistButton className="absolute top-2 right-2 bg-white shadow-sm" />
      </div>

      <div className="p-3">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-base font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">{product.rating}</span>
        </div>
        <h3 className="text-xs text-gray-600 leading-snug">{product.name}</h3>
      </div>
    </div>
  );
}
