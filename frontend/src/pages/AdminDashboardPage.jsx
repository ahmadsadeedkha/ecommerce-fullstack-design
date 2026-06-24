import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProductFormModal from "../components/admin/ProductFormModal";
import DeleteConfirmModal from "../components/admin/DeleteConfirmModal";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ── tiny icon components to avoid extra deps ── */
function IconPlus() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
function IconEdit() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2 2 0 012.828 2.828L11.828 15.83a4 4 0 01-1.414.94l-3.414 1.138 1.138-3.414A4 4 0 019 13z"
      />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg
      className="w-4 h-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
      />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
      />
    </svg>
  );
}

/* ── stock badge ── */
function StockBadge({ qty }) {
  if (qty === 0)
    return (
      <span className="px-2 py-0.5 rounded-full text-xs bg-red-50 text-red-600 font-medium">
        Out of stock
      </span>
    );
  if (qty <= 10)
    return (
      <span className="px-2 py-0.5 rounded-full text-xs bg-amber-50 text-amber-600 font-medium">
        Low — {qty}
      </span>
    );
  return (
    <span className="px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700 font-medium">
      {qty} in stock
    </span>
  );
}

/* ── stat card ── */
function StatCard({ label, value, sub, accent }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${accent || "text-gray-900"}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

/* ════════════════════════════════════════════ */
export default function AdminDashboardPage() {
  const { user, logout, token } = useAuth();

  /* data */
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [fetchError, setFetchError] = useState("");

  /* modals */
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null = add mode
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  /* table controls */
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  /* ── fetch ── */
  const fetchProducts = async () => {
    setLoadingProducts(true);
    setFetchError("");
    try {
      const res = await fetch(`${API}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : (data.products ?? []));
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // eslint-disable-line

  /* ── derived stats ── */
  const totalValue = products.reduce(
    (s, p) => s + p.price * (p.countInStock || 0),
    0,
  );
  const outOfStock = products.filter((p) => (p.countInStock || 0) === 0).length;
  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category).filter(Boolean))],
    [products],
  );

  /* ── filtered / sorted / paginated ── */
  const filtered = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q),
      );
    }
    if (categoryFilter !== "All")
      list = list.filter((p) => p.category === categoryFilter);

    list.sort((a, b) => {
      let av = a[sortKey] ?? "";
      let bv = b[sortKey] ?? "";
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [products, search, categoryFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };
  const sortIcon = (key) =>
    sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  /* ── callbacks ── */
  const openAdd = () => {
    setEditTarget(null);
    setShowAddEdit(true);
  };
  const openEdit = (p) => {
    setEditTarget(p);
    setShowAddEdit(true);
  };

  const handleSaved = (savedProduct) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p._id === savedProduct._id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = savedProduct;
        return next;
      }
      return [savedProduct, ...prev];
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API}/api/products/${deleteTarget._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  /* ════ render ════ */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top nav ── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-end">
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-600">
              {user?.name || user?.email}
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-sm transition px-3 py-1.5 rounded-lg bg-red-400 hover:bg-red-600"
            >
              <IconLogout />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Page heading ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Products</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {products.length} total · manage your catalogue
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition self-start sm:self-auto"
          >
            <IconPlus />
            Add product
          </button>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total products" value={products.length} />
          <StatCard
            label="Catalogue value"
            value={`₨${totalValue.toLocaleString()}`}
            sub="price × stock"
          />
          <StatCard
            label="Out of stock"
            value={outOfStock}
            accent={outOfStock > 0 ? "text-red-500" : "text-gray-900"}
          />
          <StatCard
            label="Categories"
            value={categories.length - 1}
            sub="unique"
          />
        </div>

        {/* ── Filters bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <IconSearch />
            </span>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name or category…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition bg-white"
            />
          </div>
          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 bg-white"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* ── Table (desktop) / Cards (mobile) ── */}
        {loadingProducts ? (
          <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
            Loading products…
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <p className="text-red-500 text-sm">{fetchError}</p>
            <button
              onClick={fetchProducts}
              className="text-sm text-orange-500 underline"
            >
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-2">
            <p className="text-gray-400 text-sm">
              No products match your search.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategoryFilter("All");
              }}
              className="text-sm text-orange-500 underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* ── Desktop table ── */}
            <div className="hidden md:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 w-12">
                      #
                    </th>
                    <th className="text-left px-3 py-3 text-xs font-medium text-gray-500">
                      <button
                        onClick={() => handleSort("name")}
                        className="hover:text-gray-900 transition"
                      >
                        Product{sortIcon("name")}
                      </button>
                    </th>
                    <th className="text-left px-3 py-3 text-xs font-medium text-gray-500">
                      <button
                        onClick={() => handleSort("category")}
                        className="hover:text-gray-900 transition"
                      >
                        Category{sortIcon("category")}
                      </button>
                    </th>
                    <th className="text-right px-3 py-3 text-xs font-medium text-gray-500">
                      <button
                        onClick={() => handleSort("price")}
                        className="hover:text-gray-900 transition"
                      >
                        Price{sortIcon("price")}
                      </button>
                    </th>
                    <th className="text-left px-3 py-3 text-xs font-medium text-gray-500">
                      <button
                        onClick={() => handleSort("countInStock")}
                        className="hover:text-gray-900 transition"
                      >
                        Stock{sortIcon("countInStock")}
                      </button>
                    </th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-500 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((product, i) => (
                    <tr
                      key={product._id}
                      className="border-b border-gray-50 hover:bg-orange-50/30 transition group"
                    >
                      <td className="px-5 py-3.5 text-xs text-gray-400">
                        {(page - 1) * PAGE_SIZE + i + 1}
                      </td>
                      <td className="px-3 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                            onError={(e) => {
                              e.target.src = `https://placehold.co/40x40/f97316/white?text=${encodeURIComponent(
                                product.name?.[0] || "?",
                              )}`;
                            }}
                          />
                          <span className="font-medium text-gray-800 line-clamp-1">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3.5">
                        {product.category ? (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                            {product.category}
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3.5 text-right font-medium text-gray-800">
                        ₨{Number(product.price).toLocaleString()}
                        {product.originalPrice && (
                          <span className="block text-xs text-gray-400 line-through font-normal">
                            ₨{Number(product.originalPrice).toLocaleString()}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3.5">
                        <StockBadge qty={product.countInStock ?? 0} />
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEdit(product)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition text-xs"
                          >
                            <IconEdit />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteTarget(product)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition text-xs"
                          >
                            <IconTrash />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile cards ── */}
            <div className="md:hidden space-y-3">
              {paginated.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl border border-gray-100 p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-xl border border-gray-100 flex-shrink-0"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/56x56/f97316/white?text=${encodeURIComponent(
                          product.name?.[0] || "?",
                        )}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm line-clamp-2">
                        {product.name}
                      </p>
                      {product.category && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                          {product.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">
                        ₨{Number(product.price).toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-xs text-gray-400 line-through">
                          ₨{Number(product.originalPrice).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <StockBadge qty={product.countInStock ?? 0} />
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-gray-50">
                    <button
                      onClick={() => openEdit(product)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition"
                    >
                      <IconEdit /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(product)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition"
                    >
                      <IconTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-5">
                <p className="text-xs text-gray-500">
                  Showing {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
                  {filtered.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    ← Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (n) =>
                        n === 1 || n === totalPages || Math.abs(n - page) <= 1,
                    )
                    .reduce((acc, n, idx, arr) => {
                      if (idx > 0 && arr[idx - 1] !== n - 1)
                        acc.push(
                          <span
                            key={`e${n}`}
                            className="px-1 text-gray-300 text-sm"
                          >
                            …
                          </span>,
                        );
                      acc.push(
                        <button
                          key={n}
                          onClick={() => setPage(n)}
                          className={`w-8 h-8 rounded-lg text-sm transition ${
                            page === n
                              ? "bg-orange-500 text-white font-medium"
                              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {n}
                        </button>,
                      );
                      return acc;
                    }, [])}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Modals ── */}
      {showAddEdit && (
        <ProductFormModal
          product={editTarget}
          onClose={() => setShowAddEdit(false)}
          onSaved={handleSaved}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          product={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}
