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
    <div className="max-w-full px-4 sm:px-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-12">
        <nav className="flex items-center gap-6 text-sm text-gray-700">
          {/* Hamburger — visible only on small screens, will open a menu */}
          <button className="flex items-center gap-2 md:hidden">
            <img src={hamburger} alt="menu" className="w-4 h-4" />
          </button>

          {/* All category links — hidden on small screens, shown on md+ */}
          <div className="hidden md:flex items-center gap-6">
            {categories.map((c) => (
              <a key={c} href="#" className="hover:text-blue-600">
                {c}
              </a>
            ))}
          </div>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3 sm:gap-4 text-sm text-gray-700">
          <div className="hidden sm:flex items-center gap-2 cursor-pointer">
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
            <span className="hidden sm:inline text-gray-700">Ship to</span>
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
