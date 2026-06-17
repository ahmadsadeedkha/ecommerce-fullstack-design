import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Headphones, Truck } from "lucide-react";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import SavedForLater from "../components/SavedForLater";
import PromoBanner from "../components/PromoBanner";
import { CART_ITEMS, SAVED_ITEMS } from "../assets/data3";

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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const shipping = 10;
  const tax = 7;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ══ MOBILE LAYOUT ══════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* Mobile header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-base font-bold text-gray-800">Shopping cart</h1>
        </div>

        <div className="px-3 py-4 flex flex-col gap-3">
          {/* Cart items */}
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
            {cartItems.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <MobileCartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onSaveForLater={handleSaveForLater}
                  onQtyChange={handleQtyChange}
                />
              ))
            )}
          </div>

          {/* Inline summary */}
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Items ({cartItems.length}):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100 mt-1">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="mt-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm rounded-xl transition-colors">
              Checkout ({cartItems.length} items)
            </button>
          </div>

          {/* Saved for later */}
          {savedItems.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-2 px-1">
                Saved for later
              </h2>
              <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
                {savedItems.map((item) => (
                  <MobileSavedItem
                    key={item.id}
                    item={item}
                    onMoveToCart={handleMoveToCart}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ DESKTOP LAYOUT ═════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-lg font-bold text-gray-800 mb-4">
            My cart ({cartItems.length})
          </h1>

          <div className="flex gap-5 items-start">
            {/* Left: cart items */}
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
                <div className="flex items-center justify-between mt-3 pb-3">
                  <button
                    onClick={() => navigate("/products")}
                    className="flex items-center gap-1.5 text-sm text-white bg-blue-500 hover:bg-blue-700 rounded-lg px-4 py-2 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to shop
                  </button>
                  <button
                    onClick={handleRemoveAll}
                    className="text-sm text-blue-600 hover:text-blue-800 border border-blue-600 rounded-lg px-4 py-2 transition-colors"
                  >
                    Remove all
                  </button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-5 grid grid-cols-3 gap-4">
                {BADGES.map(({ icon: Icon, title, sub }) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 px-4 py-3"
                  >
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

            {/* Right: order summary */}
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
    </div>
  );
}

// ─── Mobile Cart Item (− qty + stepper, ⋮ menu) ───────────────────────────────
function MobileCartItem({ item, onRemove, onSaveForLater, onQtyChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-start gap-3 px-4 py-4 relative">
      {/* Image */}
      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-800 leading-snug mb-0.5 pr-6">
          {item.name}
        </h3>
        <p className="text-xs text-gray-400 mb-2">
          Size: {item.size}, Color: {item.color}
          <br />
          Seller: {item.seller}
        </p>

        {/* − qty + stepper */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-2 py-1">
            <button
              onClick={() => onQtyChange(item.id, Math.max(1, item.qty - 1))}
              className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-blue-500 text-lg leading-none"
            >
              −
            </button>
            <span className="text-sm font-medium text-gray-800 w-4 text-center">
              {item.qty}
            </span>
            <button
              onClick={() => onQtyChange(item.id, item.qty + 1)}
              className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-blue-500 text-lg leading-none"
            >
              +
            </button>
          </div>
          <span className="text-sm font-bold text-gray-900">
            ${(item.price * item.qty).toFixed(2)}
          </span>
        </div>
      </div>

      {/* ⋮ menu */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none px-1"
        >
          ⋮
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-[130px]">
            <button
              onClick={() => {
                onSaveForLater(item.id);
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-gray-50"
            >
              Save for later
            </button>
            <button
              onClick={() => {
                onRemove(item.id);
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Mobile Saved Item ────────────────────────────────────────────────────────
function MobileSavedItem({ item, onMoveToCart, onRemove }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      {/* Image */}
      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 leading-snug mb-0.5">
          {item.name}
        </p>
        <p className="text-sm font-bold text-gray-900 mb-2">
          ${item.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onMoveToCart(item.id)}
            className="text-xs text-blue-500 border border-blue-400 rounded-lg px-3 py-1 hover:bg-blue-50 transition-colors"
          >
            Move to cart
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="text-xs text-red-400 border border-red-300 rounded-lg px-3 py-1 hover:bg-red-50 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
