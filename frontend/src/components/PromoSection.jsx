import React from "react";

const PromoSection = ({
  title,
  subtitle,
  accent = "bg-blue-50",
  items = [],
}) => {
  return (
    <section className="border border-gray-200 rounded-md overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_4.75fr]">
        <div
          className={`p-2 lg:p-3 lg:border-r border-gray-200 min-h-[130px] flex flex-col ${accent}`}
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 leading-tight max-w-[12rem]">
              {title}
            </h3>
            <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>
          </div>

          <button className="mt-2 w-fit px-4 py-2 bg-white rounded-md shadow-sm text-gray-800 font-medium">
            Source now
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="p-2 border-t lg:border-t-0 lg:border-l border-gray-200 min-h-[130px] flex flex-col justify-between"
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
    </section>
  );
};

export default PromoSection;
