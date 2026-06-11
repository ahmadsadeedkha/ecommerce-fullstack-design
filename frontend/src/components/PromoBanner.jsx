import React from "react";

const PromoBanner = () => {
  return (
    <div className="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-5 flex items-center justify-between">
      <div>
        <h3 className="text-white font-bold text-lg leading-tight">
          Super discount on more than 100 USD
        </h3>
        <p className="text-blue-100 text-sm mt-0.5">
          Have you ever finally just write dummy info
        </p>
      </div>
      <button className="flex-shrink-0 bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
        Shop now
      </button>
    </div>
  );
};

export default PromoBanner;
