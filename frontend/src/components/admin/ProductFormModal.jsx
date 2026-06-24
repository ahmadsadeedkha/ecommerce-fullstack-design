import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Footwear",
  "Accessories",
  "Home & Kitchen",
  "Sports",
  "Books",
  "Beauty",
  "Toys",
  "Other",
];

const EMPTY_FORM = {
  name: "",
  price: "",
  originalPrice: "",
  category: "",
  description: "",
  image: "",
  countInStock: "",
};

export default function ProductFormModal({ product, onClose, onSaved }) {
  const { token } = useAuth();
  const isEditing = Boolean(product);

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price ?? "",
        originalPrice: product.originalPrice ?? "",
        category: product.category || "",
        description: product.description || "",
        image: product.image || "",
        countInStock: product.countInStock ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
    setServerError("");
  }, [product]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) < 0)
      e.price = "Enter a valid price";
    if (!form.category) e.category = "Pick a category";
    if (!form.image.trim()) e.image = "Image URL is required";
    if (
      form.countInStock === "" ||
      isNaN(form.countInStock) ||
      Number(form.countInStock) < 0
    )
      e.countInStock = "Enter stock quantity (0 or more)";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);
    setServerError("");

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      originalPrice: form.originalPrice
        ? Number(form.originalPrice)
        : undefined,
      category: form.category,
      description: form.description.trim(),
      image: form.image.trim(),
      countInStock: Number(form.countInStock),
    };

    try {
      const url = isEditing
        ? `${import.meta.env.VITE_API_URL}/api/products/${product._id}`
        : `${import.meta.env.VITE_API_URL}/api/products`;

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      onSaved(data);
      onClose();
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full border rounded-lg px-3 py-2 text-sm outline-none transition focus:ring-2 ${
      errors[field]
        ? "border-red-400 focus:ring-red-200"
        : "border-gray-200 focus:ring-orange-200 focus:border-orange-400"
    }`;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            {isEditing ? "Edit product" : "Add product"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-4 flex-1">
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {serverError}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Product name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Earbuds Pro"
              className={inputClass("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Price + Original Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Price (₨)
              </label>
              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="2499"
                className={inputClass("price")}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Original price{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                name="originalPrice"
                type="number"
                min="0"
                value={form.originalPrice}
                onChange={handleChange}
                placeholder="3499"
                className={inputClass("originalPrice")}
              />
            </div>
          </div>

          {/* Category + Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass("category")}
              >
                <option value="">Select…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Stock qty
              </label>
              <input
                name="countInStock"
                type="number"
                min="0"
                value={form.countInStock}
                onChange={handleChange}
                placeholder="50"
                className={inputClass("countInStock")}
              />
              {errors.countInStock && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.countInStock}
                </p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Image URL
            </label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://…"
              className={inputClass("image")}
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
            {form.image && !errors.image && (
              <img
                src={form.image}
                alt="preview"
                className="mt-2 h-16 w-16 object-cover rounded-lg border border-gray-100"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Description{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Short product description…"
              className={`${inputClass("description")} resize-none`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving…" : isEditing ? "Save changes" : "Add product"}
          </button>
        </div>
      </div>
    </div>
  );
}
