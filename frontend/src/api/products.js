const BASE_URL = "http://localhost:5000/api";

export const fetchProducts = async (search = "", category = "") => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await fetch(`${BASE_URL}/products?${params}`);
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};
