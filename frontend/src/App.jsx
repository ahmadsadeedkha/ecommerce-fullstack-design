import "./App.css";
import Header from "./components/Header";
import CategoryBar from "./components/CategoryBar";
import Home from "./pages/Home";
import ProductListingPage from "./pages/ProductListingPage";
import Footer from "./components/Footer";

function App() {
  const isProductsPage = window.location.pathname.startsWith("/products");

  return (
    <>
      <Header />
      {isProductsPage ? <ProductListingPage /> : <Home />}
      <Footer />
    </>
  );
}

export default App;
