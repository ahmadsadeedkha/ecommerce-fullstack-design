import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CategoryBar from "./components/CategoryBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
