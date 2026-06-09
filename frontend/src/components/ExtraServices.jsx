import React from "react";
import extraServiceBg1 from "../assets/images/extraServices-bg-img1.png";
import extraServiceBg2 from "../assets/images/extraServices-bg-img2.png";
import extraServiceBg3 from "../assets/images/extraServices-bg-img3.png";
import extraServiceBg4 from "../assets/images/extraServices-bg-img4.png";

const services = [
  {
    id: 1,
    title: "Source from Industry Hubs",
    image: extraServiceBg1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Customize Your Products",
    image: extraServiceBg2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 8h14M5 8a2 2 0 1 1 0-4h14a2 2 0 1 1 0 4M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Fast, reliable shipping by ocean or air",
    image: extraServiceBg3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Product monitoring and inspection",
    image: extraServiceBg4,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

const ExtraServices = () => (
  <section className="max-w-7xl mx-auto px-4 py-8">
    <h2 className="text-xl font-semibold text-black mb-4">
      Our extra services
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="rounded-lg border border-gray-200 bg-white overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="relative">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-36 object-"
            />
            <div className="absolute -bottom-4 right-4 h-9 w-9 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-gray-700">
              {service.icon}
            </div>
          </div>
          <div className="px-3 pt-6 pb-4">
            <p className="text-sm font-medium text-gray-800 leading-snug">
              {service.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ExtraServices;
