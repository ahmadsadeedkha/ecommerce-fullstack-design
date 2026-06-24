import React, { useState } from "react";
import { Link } from "react-router-dom";
import hamburger from "../assets/icons/hamburger-menu-icon.svg";
import logo from "../assets/icons/logo.svg";
import profileLogo from "../assets/icons/profile-logo.svg";
import messageLogo from "../assets/icons/message-logo.svg";
import ordersLogo from "../assets/icons/orders-logo.svg";
import cartLogo from "../assets/icons/cart-logo.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white md:border-b-2 border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <button
          className="lg:hidden flex flex-col justify-center gap-[5px] w-6 shrink-0"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <img src={hamburger} alt="menu" className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Brand logo" className="w-10 h-10" />
          <span className="text-blue-400 font-bold text-xl">Sadeed</span>
        </Link>

        <form
          className="flex hidden lg:flex w-full max-w-lg items-center border-2 border-blue-500 rounded-md overflow-hidden"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="flex-1 px-3 py-2 text-sm focus:outline-none"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <select className="px-3 py-2 text-sm bg-white border-l border-blue-500 focus:outline-none cursor-pointer">
            <option>All category</option>
          </select>
          <button
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
            type="submit"
          >
            Search
          </button>
        </form>

        <nav className="ml-auto md:ml-0 flex items-center gap-4 text-xs text-gray-600">
          <Link
            className="hidden lg:flex flex-col items-center gap-1 hover:text-blue-500 transition-colors"
            to="/products"
          >
            <img src={messageLogo} alt="Message" className="w-5 h-5" />
            <span>products</span>
          </Link>
          <Link
            className="hidden lg:flex flex-col items-center gap-1 hover:text-blue-500 transition-colors"
            to="/"
          >
            <img src={ordersLogo} alt="Orders" className="w-5 h-5" />
            <span>Orders</span>
          </Link>
          <Link
            className="flex flex-col items-center gap-1 hover:text-blue-500 transition-colors"
            to="/login"
          >
            <img src={profileLogo} alt="Profile" className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <Link
            className="flex flex-col items-center gap-1 hover:text-blue-500 transition-colors"
            to="/cart"
          >
            <img src={cartLogo} alt="My cart" className="w-5 h-5" />
            <span>My cart</span>
          </Link>
        </nav>
      </div>

      <div className="lg:hidden px-4 pb-3">
        <form
          className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden bg-gray-100"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="pl-3 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </span>
          <input
            className="flex-1 px-3 py-2 text-sm bg-transparent focus:outline-none"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-40" : "max-h-0"}`}
      >
        <nav className="flex flex-col border-t border-gray-100">
          <Link
            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            to="/products"
            onClick={() => setMenuOpen(false)}
          >
            <img src={messageLogo} alt="" className="w-5 h-5" />
            Products
          </Link>
          <Link
            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            to="/orders"
            onClick={() => setMenuOpen(false)}
          >
            <img src={ordersLogo} alt="" className="w-5 h-5" />
            Orders
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
