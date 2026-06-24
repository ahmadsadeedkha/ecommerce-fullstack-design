import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import ScrollToTop from "./components/ScrollToTop";

import { AuthProvider } from "./context/AuthContext";

import AdminRoute from "./components/admin/AdminRoute";

import AdminDashboardPage from "./pages/AdminDashboardPage";

import LoginPage from "./pages/LoginPage";

function RoutesWrapper() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={<ProductListingPage key={location.search} />}
        />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />

        <RoutesWrapper />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
