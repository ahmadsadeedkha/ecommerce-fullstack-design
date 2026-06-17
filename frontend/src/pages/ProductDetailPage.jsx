import { useState } from "react";
import { Package, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryBar from "../components/CategoryBar";
import ProductGallery from "../components/ProductGallery";
import SupplierCard from "../components/SupplierCard";
import ProductTabs from "../components/ProductTabs";
import YouMayLike from "../components/YouMayLike";
import RelatedProducts from "../components/RelatedProducts";
import PromoBanner from "../components/PromoBanner";
import {
  PRODUCT,
  SUPPLIER,
  RELATED_SUGGESTIONS,
  RELATED_PRODUCTS,
} from "../assets/data2";

// ─── Star Rating ──────────────────────────────────────────────────────────────
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

// ─── Pricing Tier Card ────────────────────────────────────────────────────────
function PricingTier({ tier, highlighted }) {
  return (
    <div
      className={`flex-1 border rounded-lg px-4 py-3 text-center ${
        highlighted
          ? "border-orange-300 bg-orange-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <p className="text-base font-bold text-gray-900">{tier.price}</p>
      <p className="text-xs text-gray-400 mt-0.5">{tier.label}</p>
    </div>
  );
}

// ─── Info Row ─────────────────────────────────────────────────────────────────
function InfoRow({ label, value }) {
  return (
    <tr className="text-sm">
      <td className="py-1.5 pr-4 text-gray-400 whitespace-nowrap w-32">
        {label}:
      </td>
      <td className="py-1.5 text-gray-700">{value}</td>
    </tr>
  );
}

// ─── Mobile Gallery (full-width with arrows) ──────────────────────────────────
function MobileGallery({ images }) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full bg-gray-100 aspect-square">
      <img
        src={images[index]}
        alt="Product"
        className="w-full h-full object-contain"
      />
      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 bottom-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
      >
        <ChevronLeft className="w-4 h-4 text-gray-600" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 bottom-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
      >
        <ChevronRight className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}

// ─── Mobile Supplier Row ──────────────────────────────────────────────────────
function MobileSupplierRow({ supplier }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 px-4 py-3 mt-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          R
        </div>
        <div>
          <p className="text-xs text-gray-400">Supplier</p>
          <p className="text-sm font-semibold text-gray-800">{supplier.name}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
  );
}

// ─── Mobile Supplier Badges ───────────────────────────────────────────────────
function MobileSupplierBadges({ supplier }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-white border border-gray-100 rounded-xl mt-2 text-xs text-gray-500">
      <span>🇩🇪 {supplier.country?.split(",")[0]}</span>
      <span className="flex items-center gap-1">✓ Verified</span>
      <span className="flex items-center gap-1">🌐 Shipping</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ══ MOBILE LAYOUT ══════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* Mobile header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/cart")}>
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 6.39A1 1 0 007 21h10a1 1 0 00.99-1.14L17 13M7 13H5.4"
                />
              </svg>
            </button>
            <button>
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Full-width gallery */}
        <MobileGallery images={PRODUCT.images} />

        {/* Product info card */}
        <div className="bg-white px-4 pt-4 pb-3 mt-2 mx-3 rounded-xl border border-gray-100">
          {/* Rating row */}
          <div className="flex items-center gap-3 mb-2 text-xs text-gray-500">
            <StarRating rating={PRODUCT.rating} />
            <span className="flex items-center gap-1">
              💬 {PRODUCT.reviews} reviews
            </span>
            <span className="flex items-center gap-1">
              <Package className="w-3 h-3" /> {PRODUCT.sold} sold
            </span>
          </div>

          {/* Title */}
          <h1 className="text-base font-bold text-gray-800 leading-snug mb-1">
            {PRODUCT.name}
          </h1>

          {/* Price */}
          <p className="text-lg font-bold text-red-500 mb-3">
            {PRODUCT.pricingTiers[0].price}{" "}
            <span className="text-xs font-normal text-gray-400">
              ({PRODUCT.pricingTiers[0].label})
            </span>
          </p>

          {/* CTA row */}
          <div className="flex items-center gap-2 mb-4">
            <button className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors">
              Send inquiry
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center"
            >
              <Heart
                className={`w-5 h-5 ${liked ? "fill-red-400 text-red-400" : "text-gray-400"}`}
              />
            </button>
          </div>

          {/* Attributes */}
          <div className="flex flex-col gap-1.5 text-sm mb-3">
            {[
              { label: "Condition", value: "Brand new" },
              { label: "Material", value: PRODUCT.material },
              { label: "Category", value: "Electronics, gadgets" },
              { label: "Item num", value: "23421" },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3">
                <span className="text-gray-400 w-24 flex-shrink-0">
                  {label}
                </span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>

          {/* Short description with Read more */}
          <p
            className={`text-xs text-gray-500 leading-relaxed ${expanded ? "" : "line-clamp-3"}`}
          >
            {PRODUCT.description}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-500 font-medium mt-1"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        </div>

        {/* Supplier row */}
        <div className="mx-3">
          <MobileSupplierRow supplier={SUPPLIER} />
          <MobileSupplierBadges supplier={SUPPLIER} />
        </div>

        {/* Similar products — reuses RelatedProducts inside a horizontal scroll wrapper */}
        <div className="bg-white mt-3 py-4 overflow-x-auto">
          <h2 className="text-base font-semibold text-gray-800 mb-3 px-4">
            Similar products
          </h2>
          <div className="flex gap-3 px-4 pb-2 w-max">
            <RelatedProducts products={RELATED_PRODUCTS} mobile />
          </div>
        </div>

        {/* Promo banner */}
        <div className="mx-3 mt-3 mb-6">
          <PromoBanner />
        </div>
      </div>

      {/* ══ DESKTOP LAYOUT ═════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        <CategoryBar />

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
          <nav className="text-xs text-gray-400 flex items-center gap-1">
            {["Home", "Clothings", "Men's wear", "Summer clothing"].map(
              (crumb, i, arr) => (
                <span key={crumb} className="flex items-center gap-1">
                  <span
                    className={
                      i < arr.length - 1
                        ? "hover:text-blue-500 cursor-pointer"
                        : "text-gray-600"
                    }
                  >
                    {crumb}
                  </span>
                  {i < arr.length - 1 && <span>›</span>}
                </span>
              ),
            )}
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-10">
          {/* Top section */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-4">
            <div className="flex gap-6">
              <div className="w-56 flex-shrink-0">
                <ProductGallery images={PRODUCT.images} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-blue-500">✓</span>
                  <span className="text-xs text-blue-500 font-medium">
                    In stock
                  </span>
                </div>
                <h1 className="text-lg font-bold text-gray-800 leading-snug mb-2">
                  {PRODUCT.name}
                </h1>
                <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                  <StarRating rating={PRODUCT.rating} />
                  <span className="font-medium text-gray-700">
                    {PRODUCT.rating}
                  </span>
                  <span>💬 {PRODUCT.reviews} reviews</span>
                  <span className="flex items-center gap-1">
                    <Package className="w-3.5 h-3.5" /> {PRODUCT.sold} sold
                  </span>
                </div>
                <div className="flex gap-3 mb-5">
                  {PRODUCT.pricingTiers.map((tier, i) => (
                    <PricingTier key={i} tier={tier} highlighted={i === 1} />
                  ))}
                </div>
                <table className="mb-2">
                  <tbody>
                    <InfoRow label="Price" value={PRODUCT.price} />
                    <InfoRow label="Type" value={PRODUCT.type} />
                    <InfoRow label="Material" value={PRODUCT.material} />
                    <InfoRow label="Design" value={PRODUCT.design} />
                    <InfoRow
                      label="Customization"
                      value={PRODUCT.customization}
                    />
                    <InfoRow label="Protection" value={PRODUCT.protection} />
                    <InfoRow label="Warranty" value={PRODUCT.warranty} />
                  </tbody>
                </table>
              </div>

              <div className="w-48 flex-shrink-0">
                <SupplierCard supplier={SUPPLIER} />
              </div>
            </div>
          </div>

          {/* Tabs + You may like */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6">
              <ProductTabs product={PRODUCT} />
            </div>
            <div className="w-52 flex-shrink-0">
              <YouMayLike items={RELATED_SUGGESTIONS} />
            </div>
          </div>

          {/* Related products */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mt-4">
            <RelatedProducts products={RELATED_PRODUCTS} />
          </div>

          {/* Promo banner */}
          <PromoBanner />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
