import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.svg";
import profileLogo from "../assets/icons/profile-logo.svg";
import messageLogo from "../assets/icons/message-logo.svg";
import ordersLogo from "../assets/icons/orders-logo.svg";
import cartLogo from "../assets/icons/cart-logo.svg";

const Header = () => {
  return (
    <header className="bg-white border-b-2 border-gray-400 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center gap-6 px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Brand logo" className="w-10 h-10" />
          <span className="text-blue-300 font-bold text-xl">Sadeed</span>
        </div>

        <form
          className="flex-1 hidden md:flex items-center border-3 border-blue-500 rounded-md overflow-hidden"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="flex-1 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <select className="px-3 py-2 text-sm bg-white border-l border-blue-500">
            <option>All category</option>
          </select>
          <button
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium hover:opacity-95 border-l border-blue-500"
            type="submit"
          >
            Search
          </button>
        </form>

        <nav className="ml-auto flex items-center gap-4 text-sm text-gray-600">
          <Link
            className="hidden sm:flex flex-col items-center gap-1"
            href="#"
            to="/profile"
          >
            <img src={profileLogo} alt="Profile" className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <Link
            className="hidden sm:flex flex-col items-center gap-1"
            to="/products"
          >
            <img src={messageLogo} alt="Message" className="w-5 h-5" />
            <span>Products</span>
          </Link>
          <Link
            className="hidden sm:flex flex-col items-center gap-1"
            to="/orders"
          >
            <img src={ordersLogo} alt="Orders" className="w-5 h-5" />
            <span>Orders</span>
          </Link>
          <Link className="flex flex-col items-center gap-1" to="/cart">
            <img src={cartLogo} alt="My cart" className="w-5 h-5" />
            <span>My cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
