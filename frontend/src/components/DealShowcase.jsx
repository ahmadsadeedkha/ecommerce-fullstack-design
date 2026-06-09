import React from "react";

const DealShowcase = ({ title, subtitle, timer = [], items = [] }) => {
  return (
    <section className="border border-gray-200 rounded-md overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-6">
        <div className="p-6 lg:col-span-2 lg:border-r border-gray-200 flex flex-col justify-between min-h-[210px] bg-white">
          
            <h3 className="text-xl font-semibold text-black leading-tight max-w-[12rem]">
              {title}
            </h3>
            <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>

            <div className="mt-4 flex gap-2 flex-wrap">
              {timer.map((block) => (
                <div
                  key={block.label}
                  className="w-12 h-12 bg-gray-700 text-white rounded-md flex flex-col items-center justify-center"
                >
                  <span className="text-sm font-semibold leading-none">
                    {block.value}
                  </span>
                  <span className="text-[10px] leading-none mt-1">
                    {block.label}
                  </span>
                </div>
              ))}
            </div>
          
        </div>

        <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.name}
              className="p-4 border-t lg:border-t-0 lg:border-l border-gray-200 min-h-[210px] flex flex-col items-center justify-between text-center"
            >
              <div className="w-full flex flex-col items-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 object-contain"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-lg bg-gray-100" />
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {item.name}
                </h4>
                {item.discount && (
                  <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                    {item.discount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealShowcase;
