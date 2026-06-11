import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Headphones, Truck } from "lucide-react";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import SavedForLater from "../components/SavedForLater";
import PromoBanner from "../components/PromoBanner";
import { CART_ITEMS, SAVED_ITEMS } from "../assets/data3";

// ─── Trust badges ─────────────────────────────────────────────────────────────
const BADGES = [
  { icon: Lock, title: "Secure payment", sub: "Have you ever finally just" },
  {
    icon: Headphones,
    title: "Customer support",
    sub: "Have you ever finally just",
  },
  { icon: Truck, title: "Free delivery", sub: "Have you ever finally just" },
];

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(CART_ITEMS);
  const [savedItems, setSavedItems] = useState(SAVED_ITEMS);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleRemove = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const handleSaveForLater = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    setSavedItems((prev) => [...prev, { ...item, id: Date.now() }]);
  };

  const handleQtyChange = (id, qty) =>
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item)),
    );

  const handleMoveToCart = (id) => {
    const item = savedItems.find((i) => i.id === id);
    if (!item) return;
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
    setCartItems((prev) => [
      ...prev,
      {
        ...item,
        id: Date.now(),
        qty: 1,
        size: "medium",
        color: "blue",
        material: "Plastic",
        seller: "Artel Market",
      },
    ]);
  };

  const handleRemoveAll = () => setCartItems([]);

  // ── Subtotal ─────────────────────────────────────────────────────────────────
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page title */}
        <h1 className="text-lg font-bold text-gray-800 mb-4">
          My cart ({cartItems.length})
        </h1>

        <div className="flex gap-5 items-start">
          {/* ── Left: cart items ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-100 px-5 py-2">
              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-400 py-8 text-center">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    onSaveForLater={handleSaveForLater}
                    onQtyChange={handleQtyChange}
                  />
                ))
              )}
              {/* Bottom actions */}
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-1.5 text-sm text-white bg-blue-500 hover:bg-blue-700 border rounded-lg px-4 py-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to shop
                </button>
                <button
                  onClick={handleRemoveAll}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors border border-blue-600  rounded-lg px-4 py-2"
                >
                  Remove all
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-5 grid grid-cols-3 gap-4">
              {BADGES.map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">
                      {title}
                    </p>
                    <p className="text-xs text-gray-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: order summary ── */}
          <div className="w-64 flex-shrink-0">
            <OrderSummary subtotal={subtotal} discount={60} tax={14} />
          </div>
        </div>
        
        {/* Saved for later */}
        <SavedForLater items={savedItems} onMoveToCart={handleMoveToCart} />

        {/* Promo banner */}
        <div className="mt-8">
          <PromoBanner />
        </div>
      </div>
    </div>
  );
}
