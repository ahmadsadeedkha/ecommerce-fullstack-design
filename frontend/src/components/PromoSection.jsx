import React from "react";

const PromoSection = ({
  title,
  subtitle,
  accent = "bg-blue-50",
  image,
  items = [],
}) => {
  return (
    <section className="border border-gray-200 rounded-md overflow-hidden bg-white">
      {/* Title row */}
      <div className="lg:hidden p-4 pb-2">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="lg:hidden flex overflow-x-auto divide-x divide-gray-200 border-t border-gray-200">
        {items.map((item) => (
          <div
            key={item.name}
            className="shrink-0 w-[38vw] sm:w-44 p-3 flex flex-col items-center text-center"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 object-contain mb-2"
              />
            ) : (
              <div className="h-24 w-24 rounded-lg bg-gray-100 mb-2" />
            )}
            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
            {item.price && (
              <p className="text-xs text-gray-500 mt-0.5">
                From USD <span className="text-blue-500">{item.price}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: original two-column layout */}
      <div className="hidden lg:grid grid-cols-[1.25fr_4.75fr]">
        <div
          className="relative p-3 border-r border-gray-200 min-h-[130px] flex flex-col bg-cover bg-center"
          style={image ? { backgroundImage: `url(${image})` } : undefined}
        >
          <div className="relative">
            <h3 className="text-xl font-semibold text-black leading-tight max-w-[12rem]">
              {title}
            </h3>
            <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>
          </div>
          <button className="relative mt-auto w-fit px-4 py-2 bg-white rounded-md shadow-sm text-gray-800 font-medium">
            Source now
          </button>
        </div>

        <div className="grid grid-cols-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="p-2 border-l border-gray-200 min-h-[130px] flex flex-col justify-between"
            >
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {item.name}
                </h4>
                {item.price && (
                  <p className="text-xs text-gray-500 mt-1 leading-tight">
                    From
                    <br />
                    <span className="text-blue-500">USD {item.price}</span>
                  </p>
                )}
              </div>
              <div className="flex justify-end items-end">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-contain"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-gray-100" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Source now – mobile only, at the bottom */}
      <div className="lg:hidden border-t border-gray-200 px-4 py-3">
        <button className="text-blue-500 font-medium text-sm flex items-center gap-1">
          Source now <span>→</span>
        </button>
      </div>
    </section>
  );
};

export default PromoSection;