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
  const [selectedBrands, setSelectedBrands] = useState([
    "Samsung",
    "Apple",
    "Pocco",
  ]);
  const [selectedFeatures, setSelectedFeatures] = useState(["Metallic"]);
  const [selectedRatings, setSelectedRatings] = useState(["4star", "3star"]);
  const [condition, setCondition] = useState("Any");
  const [view, setView] = useState("list");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [sortBy, setSortBy] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggle = (setter) => (value) =>
    setter((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value],
    );

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

      {/* Breadcrumb — desktop only */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 pt-4 pb-2">
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
        {/* Sidebar — desktop only */}
        <div className="hidden md:block">
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
        </div>

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
            activeFilterCount={activeFilters.length}
            onMobileFilterOpen={() => setMobileFilterOpen(true)}
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
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

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          {/* Drawer */}
          <div className="relative ml-auto w-4/5 max-w-sm bg-white h-full overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="font-semibold text-gray-800">Filters</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="px-4">
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
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
