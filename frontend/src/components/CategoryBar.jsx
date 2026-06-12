import React from "react";
import flag from "../assets/icons/germany-flag.svg";
import hamburger from "../assets/icons/hamburger-menu-icon.svg";

const CategoryBar = () => {
  const categories = [
    "All category",
    "Hot offers",
    "Gift boxes",
    "Projects",
    "Menu item",
    "Help",
  ];

  return (
    <div className="max-w-full mx-auto bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-12">
        <nav className="hidden md:flex items-center gap-6 ml-4 text-sm text-gray-700">
          <a href="#" className="flex items-center gap-2">
            <img src={hamburger} alt="menu" className="w-4 h-4" />
            <span className="font-medium hover:text-blue-600">
              All category
            </span>
          </a>

          {categories.slice(1).map((c) => (
            <a key={c} href="#" className="hover:text-blue-600">
              {c}
            </a>
          ))}
        </nav>
        <nav className="md:hidden flex items-center gap-3 ml-4 text-sm text-blue-600 overflow-x-auto whitespace-nowrap scrollbar-none">
          {categories.map((c) => (
            <a
              key={c}
              href="#"
              className="inline-block shrink-0 rounded bg-gray-100 p-1 hover:text-blue-800"
            >
              {c}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2 cursor-pointer">
            <span>English, USD</span>
            <svg
              className="w-3 h-3 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 8l5 5 5-5H5z" />
            </svg>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-gray-700">Ship to</span>
            <img src={flag} alt="Germany" className="w-5 h-4 object-cover" />
            <svg
              className="w-3 h-3 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 8l5 5 5-5H5z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
