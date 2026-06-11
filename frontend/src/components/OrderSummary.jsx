import { useState } from "react";

export default function OrderSummary({ subtotal, discount = 60, tax = 14 }) {
  const [coupon, setCoupon] = useState("");
  const total = subtotal - discount + tax;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-4 sticky top-4">
      {/* Coupon */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Have a coupon?</p>
        <div className="flex bg-white border border-gray-300 rounded">
          <input
            type="text"
            placeholder="Add coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full min-w-0 px-3 py-1.5 text-sm"
          />
          <div className="border-l border-gray-200" />
          <button className="px-3 py-1.5  text-blue-500 hover:bg-blue-300 text-sm font-medium transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Totals */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount:</span>
          <span className="text-red-500">- ${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax:</span>
          <span className="text-emerald-500">+ ${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center border-t border-gray-100 pt-3">
        <span className="text-base font-bold text-gray-800">Total:</span>
        <span className="text-xl font-bold text-gray-900">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Checkout */}
      <button className="w-full py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors">
        Checkout
      </button>

      {/* Payment icons */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {["VISA", "MC", "PP", "VISA", "⬡Pay"].map((icon, i) => (
          <span
            key={i}
            className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5"
          >
            {icon}
          </span>
        ))}
      </div>
    </div>
  );
}
