import { ChevronDown } from "lucide-react";

export default function CartItem({ item, onRemove, onSaveForLater, onQtyChange }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-50 border border-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-800 mb-0.5">{item.name}</h3>
        <p className="text-xs text-gray-400 mb-0.5">
          Size: {item.size}, Color: {item.color}, Material: {item.material}
        </p>
        <p className="text-xs text-gray-400 mb-2">Seller: {item.seller}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRemove(item.id)}
            className="text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 rounded px-2 py-0.5 transition-colors"
          >
            Remove
          </button>
          <button
            onClick={() => onSaveForLater(item.id)}
            className="text-xs text-blue-500 hover:text-blue-700 border border-blue-200 hover:border-blue-400 rounded px-2 py-0.5 transition-colors"
          >
            Save for later
          </button>
        </div>
      </div>

      {/* Price + Qty */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="text-sm font-bold text-gray-900">
          ${item.price.toFixed(2)}
        </span>
        <div className="relative">
          <select
            value={item.qty}
            onChange={(e) => onQtyChange(item.id, Number(e.target.value))}
            className="appearance-none border border-gray-200 rounded px-3 py-1 pr-7 text-sm text-gray-600 focus:outline-none focus:border-blue-400 bg-white cursor-pointer"
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                Qty: {n}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
