import React from "react";

import uaeFlag from "../assets/icons/UAE-flag.svg";
import australiaFlag from "../assets/icons/Australia-flag.svg";
import usFlag from "../assets/icons/US-flag.svg";
import russiaFlag from "../assets/icons/Russia-flag.svg";
import italyFlag from "../assets/icons/Italy-flag.svg";
import denmarkFlag from "../assets/icons/Denmark-flag.svg";
import franceFlag from "../assets/icons/France-flag.svg";
import chinaFlag from "../assets/icons/China-flag.svg";
import britainFlag from "../assets/icons/Britain-flag.svg";

const suppliers = [
  {
    id: 1,
    country: "Arabic Emirates",
    domain: "shopname.ae",
    img: uaeFlag,
  },
  {
    id: 2,
    country: "Australia",
    domain: "shopname.ae",
    img: australiaFlag,
  },
  {
    id: 3,
    country: "United States",
    domain: "shopname.ae",
    img: usFlag,
  },
  {
    id: 4,
    country: "Russia",
    domain: "shopname.ru",
    img: russiaFlag,
  },
  {
    id: 5,
    country: "Italy",
    domain: "shopname.it",
    img: italyFlag,
  },
  {
    id: 6,
    country: "Denmark",
    domain: "denmark.com.dk",
    img: denmarkFlag,
  },
  {
    id: 7,
    country: "France",
    domain: "shopname.com.fr",
    img: franceFlag,
  },
  {
    id: 8,
    country: "Arabic Emirates",
    domain: "shopname.ae",
    img: uaeFlag,
  },
  {
    id: 9,
    country: "China",
    domain: "shopname.ae",
    img: chinaFlag,
  },
  {
    id: 10,
    country: "Great Britain",
    domain: "shopname.co.uk",
    img: britainFlag,
  },
];

const SuppliersByRegion = () => (
  <section className="max-w-7xl mx-auto px-4 py-8">
    <h2 className="text-xl font-semibold text-black mb-4">
      Suppliers by region
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-5">
      {suppliers.map((supplier) => (
        <div
          key={supplier.id}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <img
            src={supplier.img}
            alt={supplier.country}
            className="w-12 h-8 object-contain"
          />
          <div>
            <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
              {supplier.country}
            </p>
            <p className="text-xs text-gray-400">{supplier.domain}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default SuppliersByRegion;
