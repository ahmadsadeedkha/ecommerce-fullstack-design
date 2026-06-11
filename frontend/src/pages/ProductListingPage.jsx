import { useState } from "react";
import CategoryBar from "../components/CategoryBar";
import Sidebar from "../components/Sidebar";
import { ProductCardList, ProductCardGrid } from "../components/ProductCard";
import {
  ProductTopBar,
  ActiveFilters,
  Pagination,
} from "../components/ProductControls";
import { PRODUCTS } from "../assets/data";

const ProductListingPage = () => {
  // ── Filter state ──────────────────────────────────────────────────────────
  const [selectedBrands, setSelectedBrands] = useState([
    "Samsung",
    "Apple",
    "Pocco",
  ]);
  const [selectedFeatures, setSelectedFeatures] = useState(["Metallic"]);
  const [selectedRatings, setSelectedRatings] = useState(["4star", "3star"]);
  const [condition, setCondition] = useState("Any");

  // ── UI state ──────────────────────────────────────────────────────────────
  const [view, setView] = useState("list");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [sortBy, setSortBy] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);

  // ── Toggle helpers ────────────────────────────────────────────────────────
  const toggle = (setter) => (value) =>
    setter((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value],
    );

  // ── Active filter tags (for the chips row) ────────────────────────────────
  const activeFilters = [
    ...selectedBrands,
    ...selectedFeatures,
    ...selectedRatings.map((r) => (r === "4star" ? "4 star" : "3 star")),
  ];

  const handleRemoveFilter = (tag) => {
    if (selectedBrands.includes(tag)) toggle(setSelectedBrands)(tag);
    else if (selectedFeatures.includes(tag)) toggle(setSelectedFeatures)(tag);
    else toggle(setSelectedRatings)(tag === "4 star" ? "4star" : "3star");
  };

  const handleClearAll = () => {
    setSelectedBrands([]);
    setSelectedFeatures([]);
    setSelectedRatings([]);
  };

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

      <div className="max-w-7xl mx-auto px-4 pb-10 flex gap-6">
        {/* Sidebar */}
        <Sidebar
          selectedBrands={selectedBrands}
          onToggleBrand={toggle(setSelectedBrands)}
          selectedFeatures={selectedFeatures}
          onToggleFeature={toggle(setSelectedFeatures)}
          selectedRatings={selectedRatings}
          onToggleRating={toggle(setSelectedRatings)}
          condition={condition}
          onConditionChange={setCondition}
        />

        {/* Main */}
        <main className="flex-1 min-w-0">
          <ProductTopBar
            totalItems={12911}
            category="Mobile accessory"
            view={view}
            onViewChange={setView}
            verifiedOnly={verifiedOnly}
            onVerifiedChange={() => setVerifiedOnly(!verifiedOnly)}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <ActiveFilters
            filters={activeFilters}
            onRemove={handleRemoveFilter}
            onClearAll={handleClearAll}
          />

          {/* Product list or grid */}
          {view === "list" ? (
            <div className="flex flex-col gap-3">
              {PRODUCTS.slice(0, 6).map((p) => (
                <ProductCardList key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {PRODUCTS.map((p) => (
                <ProductCardGrid key={p.id} product={p} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={3}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
};
export default ProductListingPage;