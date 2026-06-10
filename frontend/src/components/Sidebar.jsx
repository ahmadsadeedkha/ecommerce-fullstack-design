import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CATEGORIES, BRANDS, FEATURES, CONDITIONS } from "../assets/data";

// ─── Collapsible Section Wrapper ──────────────────────────────────────────────
function SidebarSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-2"
      >
        {title}
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

// ─── Star Row (used in Ratings section) ──────────────────────────────────────
function StarRow({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
export default function Sidebar({
  selectedBrands,
  onToggleBrand,
  selectedFeatures,
  onToggleFeature,
  selectedRatings,
  onToggleRating,
  condition,
  onConditionChange,
}) {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  return (
    <aside className="w-52 flex-shrink-0">
      {/* Category */}
      <SidebarSection title="Category">
        <ul className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <li
              key={cat}
              className={`text-sm cursor-pointer ${
                cat === "Mobile accessory"
                  ? "text-blue-500 font-medium"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
        <button className="mt-2 text-xs text-blue-500 hover:underline">
          See all
        </button>
      </SidebarSection>

      {/* Brands */}
      <SidebarSection title="Brands">
        <ul className="space-y-2">
          {BRANDS.map((brand) => (
            <li key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onChange={() => onToggleBrand(brand)}
                className="w-3.5 h-3.5 rounded border-gray-300 accent-blue-500 cursor-pointer"
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm text-gray-600 cursor-pointer"
              >
                {brand}
              </label>
            </li>
          ))}
        </ul>
        <button className="mt-2 text-xs text-blue-500 hover:underline">
          See all
        </button>
      </SidebarSection>

      {/* Features */}
      <SidebarSection title="Features">
        <ul className="space-y-2">
          {FEATURES.map((feat) => (
            <li key={feat} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`feat-${feat}`}
                checked={selectedFeatures.includes(feat)}
                onChange={() => onToggleFeature(feat)}
                className="w-3.5 h-3.5 rounded border-gray-300 accent-blue-500 cursor-pointer"
              />
              <label
                htmlFor={`feat-${feat}`}
                className="text-sm text-gray-600 cursor-pointer"
              >
                {feat}
              </label>
            </li>
          ))}
        </ul>
        <button className="mt-2 text-xs text-blue-500 hover:underline">
          See all
        </button>
      </SidebarSection>

      {/* Price Range */}
      <SidebarSection title="Price range">
        <input
          type="range"
          min="0"
          max="999999"
          className="w-full accent-blue-500 mb-3"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-1/2 border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 focus:outline-none focus:border-blue-400"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-1/2 border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 focus:outline-none focus:border-blue-400"
          />
        </div>
        <button className="mt-2 w-full py-1.5 rounded border border-blue-500 text-blue-500 text-xs font-medium hover:bg-blue-50 transition-colors">
          Apply
        </button>
      </SidebarSection>

      {/* Condition */}
      <SidebarSection title="Condition">
        <ul className="space-y-2">
          {CONDITIONS.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <input
                type="radio"
                name="condition"
                id={`cond-${c}`}
                checked={condition === c}
                onChange={() => onConditionChange(c)}
                className="w-3.5 h-3.5 accent-blue-500 cursor-pointer"
              />
              <label
                htmlFor={`cond-${c}`}
                className="text-sm text-gray-600 cursor-pointer"
              >
                {c}
              </label>
            </li>
          ))}
        </ul>
      </SidebarSection>

      {/* Ratings */}
      <SidebarSection title="Ratings">
        <ul className="space-y-2">
          {[5, 4, 3, 2].map((stars) => {
            const key = `${stars}star`;
            return (
              <li key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`rating-${stars}`}
                  checked={selectedRatings.includes(key)}
                  onChange={() => onToggleRating(key)}
                  className="w-3.5 h-3.5 rounded accent-blue-500 cursor-pointer"
                />
                <label
                  htmlFor={`rating-${stars}`}
                  className="cursor-pointer"
                >
                  <StarRow count={stars} />
                </label>
              </li>
            );
          })}
        </ul>
      </SidebarSection>
    </aside>
  );
}
