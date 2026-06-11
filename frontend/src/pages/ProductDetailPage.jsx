import { Package } from "lucide-react";
import { useParams } from "react-router-dom";
import CategoryBar from "../components/CategoryBar";
import ProductGallery from "../components/ProductGallery";
import SupplierCard from "../components/SupplierCard";
import ProductTabs from "../components/ProductTabs";
import YouMayLike from "../components/YouMayLike";
import RelatedProducts from "../components/RelatedProducts";
import PromoBanner from "../components/PromoBanner";
import { PRODUCT, SUPPLIER, RELATED_SUGGESTIONS, RELATED_PRODUCTS } from "../assets/data2";

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
const PricingTier = ({ tier, highlighted }) => {
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
      <td className="py-1.5 pr-4 text-gray-400 whitespace-nowrap w-32">{label}:</td>
      <td className="py-1.5 text-gray-700">{value}</td>
    </tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const ProductDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
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
        {/* ── Top section ── */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-4">
          <div className="flex gap-6">
            {/* Gallery */}
            <div className="w-56 flex-shrink-0">
              <ProductGallery images={PRODUCT.images} />
            </div>

            {/* Product info */}
            <div className="flex-1 min-w-0">
              {/* In stock badge */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-blue-500">✓</span>
                <span className="text-xs text-blue-500 font-medium">
                  In stock
                </span>
              </div>

              {/* Title */}
              <h1 className="text-lg font-bold text-gray-800 leading-snug mb-2">
                {PRODUCT.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                <StarRating rating={PRODUCT.rating} />
                <span className="font-medium text-gray-700">
                  {PRODUCT.rating}
                </span>
                <span className="flex items-center gap-1">
                  💬 {PRODUCT.reviews} reviews
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" /> {PRODUCT.sold} sold
                </span>
              </div>

              {/* Pricing tiers */}
              <div className="flex gap-3 mb-5">
                {PRODUCT.pricingTiers.map((tier, i) => (
                  <PricingTier key={i} tier={tier} highlighted={i === 1} />
                ))}
              </div>

              {/* Product attributes */}
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

            {/* Supplier card */}
            <div className="w-48 flex-shrink-0">
              <SupplierCard supplier={SUPPLIER} />
            </div>
          </div>
        </div>

        {/* ── Bottom section: tabs + you may like ── */}
        <div className="flex gap-4">
          {/* Tabs */}
          <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6">
            <ProductTabs product={PRODUCT} />
          </div>

          {/* You may like */}
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
  );
};
export default ProductDetailPage;
