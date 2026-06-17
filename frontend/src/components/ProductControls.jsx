import {
  Grid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { SORT_OPTIONS } from "../assets/data";

// ─── Active Filter Tag ────────────────────────────────────────────────────────
function FilterTag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-xs text-gray-600">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-red-500 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────
export function ProductTopBar({
  totalItems,
  category,
  view,
  onViewChange,
  verifiedOnly,
  onVerifiedChange,
  sortBy,
  onSortChange,
  activeFilterCount = 0,
  onMobileFilterOpen,
}) {
  return (
    <>
      {/* ── Desktop top bar ── */}
      <div className="hidden md:flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-800">
            {totalItems.toLocaleString()} items
          </span>{" "}
          in <span className="font-semibold text-gray-800">{category}</span>
        </p>

        <div className="flex items-center gap-3">
          {/* Verified Only */}
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={onVerifiedChange}
              className="w-4 h-4 rounded accent-blue-500"
            />
            <span className="text-sm text-gray-600">Verified only</span>
          </label>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none border border-gray-200 rounded px-3 py-1.5 pr-7 text-sm text-gray-600 focus:outline-none focus:border-blue-400 bg-white cursor-pointer"
            >
              {(
                SORT_OPTIONS || [
                  "Featured",
                  "Price: Low to High",
                  "Price: High to Low",
                  "Newest",
                ]
              ).map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex border border-gray-200 rounded overflow-hidden">
            <button
              onClick={() => onViewChange("grid")}
              className={`p-1.5 ${view === "grid" ? "bg-blue-500 text-white" : "text-gray-400 hover:bg-gray-50"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewChange("list")}
              className={`p-1.5 ${view === "list" ? "bg-blue-500 text-white" : "text-gray-400 hover:bg-gray-50"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile top bar ── */}
      <div className="flex md:hidden items-center gap-2 mb-3">
        {/* Sort button */}
        <div className="relative flex-1">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none w-full border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm text-gray-600 focus:outline-none bg-white cursor-pointer"
          >
            {(
              SORT_OPTIONS || [
                "Featured",
                "Price: Low to High",
                "Price: High to Low",
                "Newest",
              ]
            ).map((opt) => (
              <option key={opt}>
                {opt === "Featured" ? `Sort: ${opt}` : opt}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Filter button */}
        <button
          onClick={onMobileFilterOpen}
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white whitespace-nowrap"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* View toggle */}
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange("grid")}
            className={`p-2 ${view === "grid" ? "bg-blue-500 text-white" : "text-gray-400"}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`p-2 ${view === "list" ? "bg-blue-500 text-white" : "text-gray-400"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Active Filters Row ───────────────────────────────────────────────────────
export function ActiveFilters({ filters, onRemove, onClearAll }) {
  if (filters.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {filters.map((tag) => (
        <FilterTag key={tag} label={tag} onRemove={() => onRemove(tag)} />
      ))}
      <button
        onClick={onClearAll}
        className="text-xs text-blue-500 hover:underline font-medium ml-1"
      >
        Clear all filter
      </button>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-end gap-2 mt-6">
      <label className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 mr-3">
        Show
        <div className="relative">
          <select className="appearance-none border border-gray-200 rounded px-2.5 py-1 pr-6 text-sm focus:outline-none bg-white">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <ChevronDown className="w-3 h-3 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </label>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded text-sm font-medium border transition-colors ${
            currentPage === page
              ? "bg-blue-500 text-white border-blue-500"
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
